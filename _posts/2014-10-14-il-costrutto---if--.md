---
title: Il costrutto - if - del C
date: 2014-10-14 18:18:42

layout: post
category : infob 
tags : ["if-then", "if-then-else"] 
---

Bentornati su questo canale. Innanzitutto, ecco i link al materiale (slides) relative alla parte di C fatta fino ad oggi:

* [Input e output in C](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/03_introduzione_al_C.pdf)
* [Costrutto `if` e operatori relazionali](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/05_strutture_di_controllo.pdf)

# Approfondimenti e links

Oggi abbiamo visto come utilizzare il costrutto `if` per verificare se, dati i voti dei due compitini, lo studente abbia passato o meno l'esame. Ecco il programma:

<script src="http://ideone.com/e.js/VmvH6Q" type="text/javascript" ></script>

Se cliccate sul pulsante più a destra:

![edit](https://dl.dropboxusercontent.com/u/5867765/images/click-icon.png)

potete modificare ed eseguire il programma stesso sul sito che abbiamo visto oggi. *Vi raccomando di provare a rieseguire i programmi a casa almeno una volta prima della prossima lezione*.

# Variazioni

Abbiamo quindi visto che lo stesso programma può essere scritto eliminando il `return 0`. Tutto ciò a patto si utilizzi la versione più estesa dell' `if`, ovvero l'`if-else`; questo ci permette di stampare a video una descrizione dettagliata del perché lo studente non abbia passato l'esame:

<script src="http://ideone.com/e.js/Q7ECzC" type="text/javascript" ></script>

# Operatori relazionali

Riguardo alle possibili condizioni esprimibili in un `if`, abbiamo visto gli operatori classici di confronto dei numeri in C:

| Operatore |                  Relazione testata                   |
|-----------|------------------------------------------------------|
| `<`        | Primo operando minore del secondo operando           |
| `>`        | Primo operando maggiore del secondo operando         |
| `<=`        | Primo operando minore o uguale al secondo operando   |
| `>=`        | Primo operando maggiore o uguale al secondo operando |
| `==`        | Primo operando uguale al secondo operando            |
| `!=`        | Primo operando non uguale al secondo operando        |

# Occhio!

Abbiamo visto che usare l'operatore di assegnamento (`=`) all'interno di una condizione dell'`if` può portare a programmi scorretti, come in questo caso:

<script src="http://ideone.com/e.js/pPHiaa" type="text/javascript" ></script>

L'operatore corretto da usare in questo caso e' **l'operatore relazionale di uguaglianza `==`**:

<script src="http://ideone.com/e.js/SSTOWQ" type="text/javascript" ></script>

Troverete comunque [informazioni nelle slides](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/05_strutture_di_controllo.pdf).

# Concludendo

L'ultima lezione importante di oggi e' la seguente:

##### Il costrutto `if` non è un ciclo.

cioè:

#### Il costrutto `if` non è un ciclo.

si dice anche:

### Il costrutto `if` non è un ciclo.

o più sinteticamente:

## Il costrutto `if` non è un ciclo.

infine:

# Il costrutto `if` non è un ciclo!


