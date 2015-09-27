---
title: fsmexpress - specify, run, and debug finites state machines with Javascript
date: 2013-04-11 14:25:26

layout: post
category : blog 
tags : ["javascript", "node", "fsm", "coffeescript", "livescript"] 
---

Just wrote a new `npm` package to work with state machines, since I thought that current packages weren't funny enough.
 
`fsmexpress` provides an expressive way to **specify, run** and **debug** finite state machines in Javascript/Livescript/Coffeescript/Whatever:

![Screenshot](http://dl.dropbox.com/u/5867765/Screen%20Shot%202013-04-08%20at%203.45.28%20PM.png)

Main features:

* Express compact state transitions with regular expressions
* Debug your FSM on line with a mini-server (powered by `socketio`). 

**Note**: The fsm runs server-side! This is not compatible with browsers at the moment.

## Installation

To install, use `npm`:

    npm install fsmexpress

## Example

For a complete livescript example, [check this link out](http://dl.dropbox.com/u/5867765/example.ls).

## Usage

Import the prototype in your program (`livescript` code)[^1]:

    fsm = require('fsmexpress').fsm;
    any-of = require('fsmexpress').any-of;

### Create fsm and instantiate states

Create a finite state machine:

    fs = new fsm()

Define states (`livescript` code):

    fs.define-as-states([   'II' 'SI' 'PI' 'OI' 
                            'IS' 'SS' 'PS' 'OS' 
                            'IP' 'SP' 'PP' 'OP' 
                            'IC' 'SC' 'PC' 'OC' 'error' ])
                            
    fs.define-as-initial('II')

### Define transitions
Define a transition (using a regular expression) from all states
beginning with 'I', excluding some states (`IP`, `IC`) on a specific event (`an_event`) and register action `action_to_trigger` (function) when that happens: 

    fs.from('I(.+)')
      .but-not-from(any-of(['IP' 'IC']))
      .on('an_event')
      .next-is('S-')
      .but-before-do(action_to_trigger)

**Note**: the target state `S-` is a state beginning with `S` and ending with the matched text in `(.+)` in the `from` expression. So the above statement will generate only two different state transitions (because `'IP' 'IC'` are not allowed `from` states:

    II -> SI
    IS -> SS
    

You can also define what to do when the starting state is not among the allowed ones (by using the `otherwise-is` function):

    fs.from('(.+)S')
      .but-not-from(any-of(['IS' 'SS' 'PS']))
      .on('another_event')
      .next-is('-P')
      .otherwise-is('error')

In the above case, whenever the starting state is among `['IS' 'SS' 'PS']`, the next state associated with `another_event` is `error`.

### Unfold and optimize 

After the state transitions have been setup, invoke `unfold` to generate actual state transition rules:

    fs.unfold()

Prune states that are not reachable:
    
    fs.optimize()
    
    
### Linking to an event emitter

To register an event emitter:

    fs.register-event-emitter(the_event_emitter)

So, everytime `the_event_emitter` emits a signal the fsm is triggered according to the rules.
Practically, let's assume that we have the following event emitter:

    class tester extends EventEmitter
        
        run_op: ~> 
            @emit 'anEvent'
            setTimeout(@run_tr, 300)
        
        run_tr: ~> 
            @emit 'anEvent2'
            setTimeout(@run_fl, 300)
        
        run_fl: ~> 
            @emit 'anotherEvent'
            setTimeout(@run_op, 300)


            # @emit 'triggerOpen'
            # @emit 'executedOpen'

Let's register it and start the finite state machine:

    tst = new tester()
    
    # Register event emitter and start the fsm
    fs.register-event-emitter(tst)  
    fs.start()   
    
    # Start the event generation:
    tst.run_op() 

State transitions will happen according to the emitted events.

## GUI debug

You can have a visual representation of the FSM that is served through a small web service (screenshot above):

    red = "#9d261d"
    gre = "#46a546"
    blu = "#049cdb"

    # GUI related stuff..
    fs.prepare-emit()
    fs.mark transition: '.+',       with-color: 'lightgrey'
    fs.mark transition: '.+Open',   with-color: "#gre"
    fs.mark transition: '.+Close',  with-dashed-color: "#gre"
    fs.mark transition: 'failed.+', with-color: "indianred"
    fs.mark state:      '.+',       with-color: 'lightgrey'
    fs.mark state:      'error',    with-color: 'indianred'
    fs.mark state:      fs.initial, with-color: "#gre"
    fs.mark state:      fs.final,   with-color: "lightsteelblue"
    console.log fs.data

    fs.serve(6970, 'my fsm')

You can see live state transitions (wherever the fsm is, even remotely, provided that the port can be accessed).



 [^1]: In livescript, dashes "-" are used to create camelized Javascript identifiers. So, `any-of` is translated to `anyOf` by the livescript compiler.
 
