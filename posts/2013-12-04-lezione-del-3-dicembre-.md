---
title: lezione del 3 dicembre 
date: 2013-12-04 11:21:57

layout: post
category : infob 
tags : ["lezione"] 
---

Innanzitutto, eccovi il link al materiale su [Input/Output e strutture di controllo in Matlab.](http://www.vittoriozaccaria.net/deposit/10_matlab_io_script.pdf)

Quindi, eccovi alcuni esempi di costrutti di controllo Matlab simili a quelli visti a lezione:

### If/then/else

    if rem(a, 2) == 0
        disp('a pari')
        b = a/2;
    end

### Switch case

    switch input_num
        case -1
            disp('negative one');
        case 0
            disp('zero');
        case 1,2
            disp('one or two');
        otherwise
             disp('other value');
    end

### Ciclo for

    for n = 2:2:6
        x(n) = 2 * x(n - 1);
    end


### Ciclo while

    n = 1;
    while prod(1:n) < 1e100
        n = n + 1;
    end



Ecco alcuni esempi di valutazione di condizioni booleane in matlab:

### Espressioni booleane

Dato il seguente vettore Matlab

    voti = [ 12 15 8 29 23 24 ]

Si definisca un'espressione logica Matlab corrispondente al seguente predicato ([1])

> Non esiste un voto all'interno di `voti` che sia maggiore di 29

**Soluzione**: il predicato puo' essere calcolato con la seguente condizione:

    sum(voti > 29) == 0

il quale vale `1` nel caso in cui nessun elemento soddisfi la condizione, `0` altrimenti.
Si noti infatti che l'espressione `voti>29` ha il seguente risultato

    [ 0 0 0 0 0 0 ]

e che quindi, non puo' esistere un voto maggiore di 29 se la somma di tutti gli elementi e' `0`.
 

 [1]: http://it.wikipedia.org/wiki/Proposizione_(logica)


### Funzioni: Fattoriale iterativo ##

Le funzioni servono a raggruppare parti di codice che possono servire in diversi punti del programma. Questo programma definisce una funzione `fattoriale` che viene invocata due volte.

    1;

    % Definizione della funzione fattoriale
    function [f] = fattoriale(n)
      f = 1
      for i=1:n
        f = f * i
      end
    end

    % Inizio del programma principale
    x = input('inserisci il valore di x')
    fx = fattoriale(x)

    if fx>220
      y = input('inserisci valore y')
      fy = fattoriale(y)
    end

Si noti che l'espressione iniziale:

    1;

Serve per indicare a Matlab che il testo contiene sia definizioni di funzione che il programma principale stesso.

### Scope di una funzione ##

Nonostante le due funzioni successive usino lo stesso nome per i parametri formali, il parametro `n` appartiene a due *scope* differenti e locali alle due funzioni stesse (`func_a` e `func_b`).

    1;

    function [r] = func_a(n)
      r = n*2;
    end

    function [s] = func_b(n)
      s = func_a(n*3);
    end

    x = func_b(1)

