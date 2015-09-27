---
title: Escaping callbacks with Livescript and Async
date: 2013-04-28 22:42:32

layout: post
category : blog 
tags : ["Livescript", "async", "callbacks"] 
---

I spent some time evaluating 'async' frameworks for [nodejs](http://nodejs.org/) to create a wrapper around [Rserve](http://cran.r-project.org/web/packages/Rserve/index.html) (a web based interface for R).

I had a look to [IcedCoffeeScript](http://maxtaco.github.io/coffee-script/), [continuation.js](https://github.com/BYVoid/continuation), various kind of [promises](http://en.wikipedia.org/wiki/Futures_and_promises) frameworks, and Livescript+[Async](https://github.com/caolan/async). 

Although these frameworks are all great, I was looking for features that allowed me to write clean and tidy code that was easily extendable.

It turns out that the syntactic sugar provided by Livescript toghether with 'async' was just what I was looking for.

I'll copy and paste the code without any error management. Of course
course, every interaction with the server should be checked out.

### Setup

In this post, we are going to use only 'rserve-client' and 'async':

{% highlight coffeescript %}
r = require('rserve-client')
require! async
{% endhighlight %}

We also need some functions to format messages for Rserve:

{% highlight coffeescript %}
formatRinvoke = (fun, args) ->
    "toJSON(#{fun}(#{fJson jStrfy args}))"

jStrfy = (m) ->
    "\'" + JSON.stringify(m) + "\'"

fJson = (m) ->
    "fromJSON(#{m})"

{% endhighlight %}

### Connect to Rserve
To connect to rserve, we create a bound function and initialize 
the stateful object `@client`[^1] that will be used for all the requests:

{% highlight coffeescript %}
connect = (cb) ~>
    (err, client) <~ r.connect 'localhost', 6311 
    @client = client
    cb(err)
{% endhighlight %}

The bound backcall created with `<~` is converted by Livescript into a javascript callback, essentially splitting the above function in two parts. The code is equivalent to the following (note the indent madness due to callbacks):

{% highlight coffeescript %}
connect = (cb) ~>
    r.connect 'localhost', 6311, (err, client) ~>
         @client = client
         cb(err)
{% endhighlight %}

Note that the backcall should be 'bound', since we are referring to `@client`.

### Evaluate an expression
To evaluate an expression, the connection to 'rserve' must be done through the `@client` object created before:

{% highlight coffeescript %}
eval-exp = (exp, cb) ~~>
    (err, ans) <~ @client.eval exp
    cb(err, ans)
{% endhighlight %}

`eval-exp` is a *curried* function (very peculiar to Livescript). The function can be partially evaluated to create another function. This is helpful when we want to evaluate different expressions, as we are going to see now.

### Invoking native R functions
We can define functions for invoking 'R' by using standard javascript hashes as arguments (that are converted to dataframes with the 'rjson' R-package) and use them to create more complex functions (as plotting into a `pdf` file):

{% highlight coffeescript %}
invoke = (fun, args, cb) ~~>
    (err, ans) <~ @client.eval formatRinvoke(fun,args)
    console.log "#{formatRinvoke(fun,args)} -> #err, #ans"
    cb(err, JSON.parse(ans))
    
plot-pdf = (data, filename, cb) ~~>
    (err, res) <~ async.series [
        eval-exp "pdf(\'#{process.cwd()}/#filename\')"
        invoke "plot", data
        eval-exp "dev.off()" ]
    cb(err,res)
{% endhighlight %}

### Putting all toghether with async
As all the above functions are callback-based, we can use async to combine them in series for a small R-like script:

{% highlight coffeescript %}
library = (name, cb) ~~>
    (err, ans) <~ @client.eval "library('#name')"
    cb(err)
    
err, res <- async.series [
    connect 
    library('rjson') 
    eval-exp('1+1')
    invoke "sin", [1,2,3]
    plot-pdf {x: [1,2,3], y: [4,5,6]}, "prova.pdf"
    ]
    console.log res
{% endhighlight %}

`async.series` combines, in series, the callback-based functions defined above. The final console.log is called when all the functions have been invoked. 

### Conclusions

Overall, I like how Livescript allows to clean up callback-based code with minimal effort. In particular:

1. Curried functions allow to tidy up callback-based function generation; for example `eval-exp('1+1')` seems a normal function invocation but, instead, it generates a callback-based closure that is used by 'async'.
2. The backcall operator `<~` allows to tidy up callback-based functions by providing a seemingly sequential syntax for otherwise hell-ish nested callbacks.



 [^1]: `@client` is equivalent to `this.client`; `this` is the current module