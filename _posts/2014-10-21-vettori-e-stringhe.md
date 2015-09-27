---
title: Vettori e stringhe
date: 2014-10-21 16:55:49

layout: post
category : infob 
tags : ["vettori", "stringhe", "while"] 
---

Partiamo con il laboratorio. Il testo e la soluzione dell'esercizio [li trovate in questo pdf](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/laboratorio_21ottobre_con_soluzione.pdf). Complimenti ai vincitori di oggi:

* Innocenti Alessandro (1 punto)
* Gialdini Pietro (1)
* Gaeta Gianpiero (1)
* Galia Pietro (1/2)
* Iberti Andrea (1/2)


# Lezione

Nella prima parte della lezione, abbiamo rivisto il programma che calcola i ricavi totali, ipotizzando che i ricavi siano scritti, in ingresso, da coppie di numeri interi:

    0 20
    1 30
    7 10
    -1

il primo numero codifica il mese (gennaio = 0, febbraio = 1, agosto = 7) mentre il secondo indica il ricavo di 
quel mese. La sequenza di coppie termina con un numero negativo al posto dell'indice del mese. Il codice che legge e somma i ricavi del mese e' il seguente:

<script src="http://ideone.com/e.js/ZBuE5y" type="text/javascript" ></script>

L'esercizio sfrutta il fatto che qualsiasi espressione di variabili intere può essere valutata 'logicamente' ovvero in termini di verità o falsità; in particolare la variabile `negativo` viene utilizzata per stabilire se continuare o meno con il ciclo `while`. 

Per chiarire questo concetto (che vi ha fatto strabuzzare gli occhi), abbiamo realizzato due semplici programmi che testano una variabile intera (con il nome `condizione`); se la variabile `condizione` è `0` allora viene interpretata come falsa e quindi viene eseguito il ramo `else`:

<script src="http://ideone.com/e.js/h5Cpl5" type="text/javascript" ></script>

Nel caso in cui `condizione` è diverso da `0`, viene interpretato come vero:

<script src="http://ideone.com/e.js/ihPKIS" type="text/javascript" ></script>

## Stringhe 

Le stringhe non sono altro che vettori di caratteri ([slides di chiarimento](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/06_stringhe.pdf)); oggi abbiamo iniziato con la definizione di un tipo stringa e la copia della stessa utilizzando `strlen` e `strcpy`:

<script src="http://ideone.com/e.js/iqpZV6" type="text/javascript" ></script>

Infine, abbiamo visto come invertire una stringa (variable `s`) i cui caratteri significativi sono in numero arbitrario[^1]:

<script src="http://ideone.com/e.js/LzS4PL" type="text/javascript" ></script>


 [^1]: Alla fine della lezione di oggi mi ero dimenticato di inserire il terminatore di stringa in `inversa` e quindi non stampava nulla. 