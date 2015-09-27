---
title: lezione del 11/12 su funzioni, ricorsione, stack
date: 2013-12-11 01:08:39 
layout: post
category : infob 
tags : [ "funzioni", "ricorsione", "stack" ] 
---

Ecco i links al materiale sugli argomenti trattati oggi e su ulteriori approfondimenti sul linguaggio Matlab:

* [Funzioni ricorsive e anonime (completo)](http://www.vittoriozaccaria.net/deposit/11_matlab_array_struct_funzioni.pdf).
* [Record di attivazione.](http://www.vittoriozaccaria.net/deposit/funzioni_ricorsive_matlab.pdf)
* [Operazioni sui files](http://www.vittoriozaccaria.net/deposit/13_matlab_files.pdf).


### Torre di Hanoi

Ecco una soluzione della torre di hanoi:

    1;
    % Stampa le mosse per spostare `n` dischi dalla torre numero `A` alla torre `B` attraverso `C`
    function hanoi(n,A,B,C)
        if (n>1)
            hanoi(n-1,A,C,B);
        end 

        disp(sprintf('Muovi disco dalla torre %d alla torre %d',[A B]));

        if (n>1)
            hanoi(n-1,C,B,A);
        end
    end

Di seguito, una variazione che conta il numero delle mosse:

    1;

    % `hanoi`: stampa hanoi
    function [mosse] = hanoi(n, da, a, tramite)

      mosse = 0;
      
      if n>1
        mosse = mosse + hanoi(n-1, da, tramite, a);
      end

      mosse = mosse + 1;

      if n>1
        mosse = mosse + hanoi(n-1, tramite, a, da);
      end
    end

La funzione puo' essere valutata su piu' valori di `n` (es, da 1 a 4):

    p = [];

    for n=1:4
      m = hanoi(n, 1, 2, 3);
      p = [p m];
    end

e plottata a video:

    h = plot(1:4, p)
    print h.png -dpng

Se volete divertirvi con la torre di Hanoi, ecco un [link ad un'applicazione web che la implementa](http://faculty.kfupm.edu.sa/ics/darwish/JS_Hanoi/).


### Operazione di *Map*(Applica) ##

Il seguente codice mostra come creare una *meta*-funzione che mappa una funzione passata come
parametro ad un vettore in ingresso:

    % `applica`: applica funzione passata come parametro al 
    % vettore v e ritorna v1
    function [v1] = applica(v, funzione)
      v1 = [];
      for i = 1:length(v)
        v1 = [v1 funzione(v(i))];
      end
    end

La funzione puo' essere utilizzata sia con funzioni *con nome* che con funzioni *anonime*:


    % `incrementa`: 
    function [y] = incrementa(x)
      y = x+1;
    end

    v = [3 4 8]

    v1 = applica(v, @incrementa)

    v2 = applica(v, @(x)x+1)


### Operazione di *Map-Reduce* ##

Il seguente codice mostra come creare una meta-funzione che *accumula* il risultato di un'operazione applicata a tutti gli elementi del vettore in ingresso all'interno di una singola variabile (**accumulatore**).

Le operazioni da applicare sono funzioni della forma:

    [nuovo_valore_acc] = function nome_funzione(acc, elem) 

dove `acc` e' il valore corrente dell'accumulatore e `elem` e' l'elemento corrente del vettore. La funzione `accumula` e' definita come segue:

    % `accumula`: map-reduce
    function [acc] = accumula(v, funzione, vinit)
      acc = vinit;
      for i=1:length(v)
        acc = funzione(acc, v(i));
      end
    end

Dato il seguente vettore:

    v = [1 2 8];

E' possibile calcolare la somma degli elementi con la seguente invocazione:

    s = accumula(v, @(a,v)a+v, 0)

Il prodotto degli elementi e' invece calcolabile con la seguente funzione anonima:

    m = accumula(v, @(a,v)a*v, 1)


 