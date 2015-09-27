---
title: esercitazione del 31/1
date: 2014-01-31 04:40:49 
layout: post
category : infob 
tags : [ 'esercizi', matlab', 'memoria', 'cache', 'virtuale' ] 
---


Ecco di seguito il materiale presentato nella esercitazione in data 30/1:

# Esercizio 1

Implementare una funzione `r = cerchio(x, y, rg)`. La funzione riceve in ingresso due vettori `x` e `y` di uguale dimensione che rappresentano le ascisse e le ordinate di un insieme di punti nel piano cartesiano e un valore `rg` che rappresenta il raggio di una circonferenza centrata sull'origine del piano cartesiano; 

La funzione `cerchio(x, y, rg)` restituisce un vettore logico `r`, di lunghezza pari quella dei vettori `x` e `y`, tale che `r(i)` è pari a 1 se e solo se il punto definito dalle coordinate `x(i)` e `y(i)` si trova all’esterno della circonferenza di raggio `rg`  e centro (0,0).

Suggerimento. __Un punto si trova all’esterno di una circonferenza se la sua distanza dal centro è superiore al raggio della circonferenza.__

Soluzione: 

    function r = cerchio(x, y, rg)
      r = sqrt(x.*x + (y).*(y)) > rg;

Si consideri ora una famiglia di funzioni in linguaggio Matlab che, ricevendo come parametro un numero intero `N`>0, restituiscano due vettori `x` e `y`, di lunghezza `N`, contenenti rispettivamente le ascisse e le ordinate di `N` punti nel piano cartesiano. Un esempio di funzione di questo tipo è il seguente:

    [x,y] = puntiSuAsseX(N)
    for k = 1 : 1 : N
        x(k) = k;
        y(k) = 0;
    end;
    
La chiamata puntiSuAsseX(5) restituisce i due vettori: 

        x = [1 2 3 4 5]  y = [0 0 0 0 0]

Implementare la funzione di ordine superiore `M = conta(N, genera, rg)` che riceve in ingresso: 

* nel parametro `N` un valore numerico intero positivo non nullo, 
* nel parametro `genera` una funzione, per esempio la puntiSuAsseX, 
* nel parametro `rg` un secondo valore numerico intero positivo non nullo.

La funzione `conta` utilizza la funzione nel parametro `genera` per produrre `N` punti nel piano cartesiano e, utilizzando la funzione cerchio sviluppata al punto 1, restituisce, tramite il parametro `M`, il numero dei punti che si trovano all’esterno della circonferenza di raggio `rg` e centro (0,0). 
  
Per esempio, la chiamata `conta(5, puntiSuAsseX, 2)`  restituisce il valore 3, corrispondente ai punti (3,0), (4,0) e (5,0) prodotti dalla chiamata di `puntiSuAsseX(5)` che si trovano all’esterno della circonferenza data. 

Soluzione:

    function M = conta(N, genera, rg)
       [x,y] = genera(N);
       M = sum(cerchio(x, y, rg));


# Esercizio 2

L'esercizio e' composto da due punti; nelle soluzioni non è consentito l’uso della funzione `num2str` di Matlab/Octave:

1. Scrivere una funzione ricorsiva `contaCifre()` che riceve come parametri un numero intero `num` (strettamente positivo) e restituisce il numero di cifre che compongono `num`. 

    Ad esempio:
    
    * `contaCifre(1456)` deve restituire 4
    * `contaCifre(5)` deve restituire 1

    Nota: Non è consentito l’uso della funzione `num2str` di Matlab/Octave.

    **Spazio soluzione:**

        function ris = contaCifre(num)
                       if (num <= 9)
                            ris = 1;
                       else
                            ris = 1+ contaCifre(floor(num/10));
                       end


2. Scrivere la funzione ricorsiva `contaNonMultipli()` che prende in ingresso due interi `num` e `n` (entrambi strettamente positivi) e conta quante cifre è necessario rimuovere in coda a `num` (ossia nella parte destra di `num`) prima di ottenere un multiplo di `n`. 
    
    Ad esempio:
    
    * `contaNonMultipli(12333, 2)` restituisce 3 (perché 12333, 1233, 123 non sono multipli di 2, mentre 12 lo è).
    * `contaNonMultipli(12300, 2)` restituisce 0 (perché 12300 è multiplo di 2).


    **Spazio soluzione:**

        function ris = contaNonMultipli(num , n)
                       if  (num == 0)
                            ris = 0;
                       elseif (mod(num , n) == 0)
                            ris = 0;
                            disp([num2str(num) ' è divisibile per ', num2str(n)]);
                       else
                            ris = 1 + contaNonMultipli(floor(num/10), n);
                       end


# Esercizio 3 

Un sistema dispone di 256 Kbyte di memoria virtuale indirizzabile, con paginazione caratterizzata dai seguenti parametri: 

* indirizzo fisico di 16 bit e 
* pagine di dimensione di 2 Kbyte. 

Rispondere alle seguenti domande giustificando le risposte:

a. Quale è la dimensione della memoria fisica indirizzabile?

> La memoria fisica indirizzabile è pari a 64 Kbyte (2^16 byte)

b. Quale è la struttura dell’indirizzo virtuale e di quello fisico, e la lunghezza dei campi che li costituiscono?

Soluzione

> Indirizzo Virtuale:  18 bit     NPV: 7  bit offset: 11  bit
> 
> Indirizzo Fisico:    16 bit     NPF: 5  bit offset: 11  bit

 
