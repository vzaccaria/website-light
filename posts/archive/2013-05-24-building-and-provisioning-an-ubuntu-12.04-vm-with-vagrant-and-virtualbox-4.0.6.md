---
title: Building and provisioning an Ubuntu 12.04 VM with Vagrant and VirtualBox 4.0.6
date: 2013-05-24 18:05:15

layout: post
category : blog 
tags : ["vagrant", "virtualbox", "web"] 
---

I am in the process of deploying a monitoring infrastructure based on Node and Phantomjs (well, actually [Casperjs](http://casperjs.org/), but that's another story). Usually, I've always deployed by configuring manually the target machine but now this is  become a pain due to the sheer number of combinations between needed tools, versions and operating system releases.

I needed something to help me automatically replicate the development environment, by guaranteeing consistency among versions. In short, I wanted to reduce the risk of something going wrong or missing when moving from development to production.

## Enter Vagrant

[Vagrant](http://www.vagrantup.com/) allows to build exactly such environments. It is an awesome tool that simplifies virtual machine creation, provisioning and management. 

My target machine was an Ubuntu 8.04 (pretty old, huh?). Unfortunately, binary packages of Vagrant were not working correctly on such machine. I have thus installed it by using its corresponding Ruby gem:

{% highlight bash %}
gem install vagrant
{% endhighlight %}

which worked fantastically. The machine had already a Virtual Box 4.0.6 working and I didn't want to mess up with existing vm configurations during the upgrade. I thus decided to stick with 4.0.6 and so far so good. 

I thus downloaded the vanilla Ubuntu 12.04 Vagrant Box (`precise32`), initialized it, and started it up:


 
{% highlight bash %}
vagrant box add precise32 http://files.vagrantup.com/precise32.box
vagrant init precise32
vagrant up 
{% endhighlight %}



From now on, I could connect to the virtual machine with a simple `ssh`:


 
{% highlight bash %}
vagrant ssh
{% endhighlight %}

## Provisioning

Since the initial machine was very vanilla, I had to install all the remaining tools and most importantly, automatize the installation. Here comes another fundamental tool for provisioning management: [Chef](http://community.opscode.com/).

With Chef, you can download various recipes that can be used to install software on your machine.
Recipes should be stored by default in the `cookbooks` directory where you start Vagrant and you should link Vagrant with Chef in the `Vagrantfile` (written in Ruby). My configuration was as follows:


{% highlight bash %}
config.vm.provision :chef_solo do |chef|
    chef.add_recipe "nodejs"
    chef.json =     {
                          "nodejs" => {
                          "version" => "0.8.11"
                    }
    }
    chef.add_recipe "subversion"
    chef.add_recipe "casperjs"
{% endhighlight %}

To install the above recipes, I cloned their repositories ([nodejs](http://github.com/mdxp/nodejs-cookbook), [subversion](http://github.com/opscode-cookbooks/subversion) and [casperjs](git://github.com/jenkinslaw/casperjs-cookbook.git))  from Github into the `cookbooks` directory.

In this way, when you bring up your vm with `vagrant up`, Chef takes all the responsibility of installing the to-be-provisioned tools. Keep in mind that some of the recipes have dependencies that should be met by downloading the corresponding cookbooks into the same directory.

The cool thing is that Chef caches provisioning packages, so the next time you invoke `vagrant provision` you dont have to download or build them again!

## Final steps
I was not able to refine the installation with Chef alone. Since I had to install some other `npm` tools (like the awesome [Livescript](http://www.livescript.net/)), I resorted to a shell script to do this work[^1]:


 
{% highlight bash %}
sudo chown -R vagrant.vagrant /usr/local/bin
sudo chown -R vagrant.vagrant /usr/local/lib
npm install -g LiveScript
npm install -g coffee-script
npm install express
npm install moment
npm install optimist
npm install jade
npm install less
npm install ansi-color
{% endhighlight %}

and that's it. From now on, I have a few files to replicate my complete environment, whatever VPS I'll choose in the future (even AWS!).


 [^1]: Note that I had to change the ownership of `/usr/local/bin` and `/usr/local/lib` to make the environment more similar to the `brew` based environment on my Mac (where you can install global node modules without invoking `sudo`).