---
title: Dichiarazione di un array
date: 2013-10-21 15:32:55

layout: post
category : infob 
tags : ["lezione"] 
---


# Dichiarazioni di variabili array e di tipi array

In C possiamo definire variabili che sono sequenze di più elementi fondamentali. Tali variabili sono dette **array**.

La seguente descrizione è interattiva[^1] e mostra la dichiarazione di un array di caratteri di nome `foo`[^2] .

<div> 
    <iframe id="fs-infog-iframe" class="iframe-content-infog center" src="http://www.vittoriozaccaria.net/explain/html/vector.html" scrolling="no" frameborder="0" >.
    </iframe>
</div>

L'array conterrà tre caratteri, accessibili con il relativo indice (che, ricordate, parte da 0):

* Primo elemento: `foo[0]`   (è un carattere)
* Secondo elemento: `foo[1]` (è un carattere)
* Terzo elemento:  `foo[2]`  (guarda un pò, è un carattere)

# Perchè definire un nuovo tipo?

Domanda:
> Ma e' mai possibile che ogni volta che devo definire una variabile simile a `foo` (array di 3 `char`) devo scrivere tutta quella spataffiata di cui sopra?

Risposta:
> No, se devi definire tante variabili simili (ovvero, dello stesso tipo), allora puoi definire il tipo una sola volta con un `typedef` e dichiarare le variabili di cui hai bisogno in maniera sintetica:

<div> 
    <iframe id="fs-infog-iframe" class="iframe-content-infog center" src="http://www.vittoriozaccaria.net/explain/html/typedef.html" scrolling="no" frameborder="0" >.
    </iframe>
</div> 


 [^1]: Muovere il mouse sopra i rettangoli arancioni 

 [^2]: I piu' perspicaci avranno notato che `foo` è proprio una stringa di caratteri!
