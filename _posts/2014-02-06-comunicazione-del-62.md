---
title: comunicazione del 6/2
date: 2014-02-06 06:43:01 
layout: post
category : infob 
tags : [ "soluzione", "esame", "esercizi", "Matlab"] 
---


Ecco di seguito la soluzione della prova in itinere di oggi. I voti verranno pubblicati al più presto.

## Esercizio 1

Si implementi in MATLAB una funzione che svolga le seguenti operazioni:

* Riceve in ingresso due matrici `A` e `B` di `M`x`N` elementi.
* Produce una terza matrice `C` ottenuta da `A` e `B` secondo la seguente regola:

        C(r,c) = 
            | A(r,c), se B(r,c) minimo valore di tutta la matrice A
            | B(r,c)

Ove (r,c) sono, rispettivamente, la riga e la colonna dell'elemento considerato.

Ad esempio, se:

    A =  [ 9, 2; 3, 4  ] 
    B =  [ 10, 8; 1, 7 ]

allora

    C = [ 10, 8; 3, 7 ]

Poiché solo B(2,1) è minore del minimo di A che è 2. 

Si tenga presente che, nel risolvere l'esercizio, **non è possibile usare cicli `for`**.


__Spazio soluzione:__

    function C = funz(A, B)
        C = B;
        C(min(min(A)) > B)=A(min(min(A)) > B)
    end

## Esercizio 2

Siano date le seguenti due definizioni di funzioni:

    function [qua] = paperone(a, b)
        if b==1 || b==0
            qua = false; 
        else 
            if (mod(a, b) == 0) && a~=b 
                qua = true;
            else 
                qua = paperone(a, b-1);
            end 
        end 
    end 

    function [x] = paperino(aaargh)
        x = true;
        if paperone(aaargh,aaargh) ~= 1;
            x=false;
            return
        end
    end

1. A cosa corrisponde la funzione ricorsiva `paperone`?

    `paperone(a, b)` controlla se:

    * c'è un divisore di `a` 
    * ed è minore di `b` 
    * ed è diverso da `a` e `1`

2. Si dica a cosa corrisponde il caso in cui `paperino(k)` (per `k` intero) ritorna `true`:

    Indica se il numero `k` è un numero non primo.

3. Si indichi l'output del seguente codice:

        for d = 1:3:20 
            printf('%d - %d\n', d, paperino(d))
        end

Output: 

        1 - 0
        4 - 1
        7 - 0
        10 - 1
        13 - 0
        16 - 1
        19 - 0


## Esercizio 3

Un sistema basato su microprocessore, senza nessuna cache, ha un tempo di accesso alla memoria di `100ns`.

Quale delle seguenti configurazioni *con memoria cache* può migliorare le performance del sistema considerato?

| cfg. | hit-time | hit-rate | miss-penalty |
| ---- | -------- | -------- | ------------ |
|    1 | 10ns     | 20%      | 150ns        |
|    2 | 3ns      | 20%      | 140ns        |
|    3 | 12ns     | 40%      | 150ns        |

__Risposta__: 
        
| cfg. | hit-time | hit-rate | miss-penalty |    tempo di accesso   |
| ---- | -------- | -------- | ------------ | --------------------- |
|    1 | 10ns     | 20%      | 150ns        | __122ns__             |
|    2 | 3ns      | 20%      | 140ns        | __112.6ns__           |
|    3 | 12ns     | 40%      | 150ns        | __94.8ns__ (migliore) |

Sapendo che migliorare la miss-penalty di una cache costa 10EUR/ns, quanto dovrò spendere per portare il sistema trovato al punto precedente per ottenere un tempo medio di accesso alla memoria di 80ns?

__Risposta__:

Calcolo diminuzione miss-penalty per arrivare a 80ns di tempo medio:

    Tempo Medio di Accesso = 12 * 0.4 + 0.6 (150 - x) = 80ns
                             94.8     - 0.6 x         = 80ns 
                             x = 24.66ns 
Calcolo costo:

    Costo = 24.66ns * 10EUR/ns = 246.66 EUR


 
