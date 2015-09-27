---
title: Caratteri e vettori
date: 2014-10-17 11:27:27

layout: post
category : infob 
tags : ["caratteri", "vettori", "strutture dati"] 
---

Nella prima parte della lezione, abbiamo visto come comporre condizioni logiche complesse a partire dagli operatori relazionali; il primo esempio significativo che abbiamo visto è una modifica del calcolo dell'esito dell'esame di uno studente — notate come abbiamo ridotto il numero di `if` innestati; ora ne utilizziamo solo uno:

<script src="http://ideone.com/e.js/OHZ3r7" type="text/javascript" ></script>

Grazie alle leggi di De Morgan (che specificano l'uguaglianza tra espressioni logiche), abbiamo riscritto il programma di sopra cosi':

<script src="http://ideone.com/e.js/ws7q05" type="text/javascript" ></script>

Da notare che l'esecuzione del programma è uguale a quella di quello precedente, nonostante siano scritti in maniera differente. Questo non è casuale, ma è proprio dovuto alle leggi di De Morgan, che comunque vedremo in dettaglio più avanti.

## Caratteri

Grazie alla codifica dei caratteri secondo la tabella internazionale ASCII, possiamo trattare i caratteri stessi come numeri; nell'esempio visto a lezione, abbiamo scritto un programma che converte i caratteri in maiuscoli:

<script src="http://ideone.com/e.js/3cdMsq" type="text/javascript" ></script>

## Vettori

È possibile creare nuovi tipo in aggiunta a quelli forniti dal linguaggio C (`int`, `float`, `char` etc..), attraverso la parola chiave `typedef`. 

Per farvi ripassare un pò di inglese, [date un'occhiata alla descrizione di typedef su wikipedia](http://en.wikipedia.org/wiki/Typedef) (guardate solo la parte relativa al linguaggio C).

Un vettore (anche definito **array**) è una **struttura dati** particolare in cui i campi sono accessibili attraverso un indice specificato fra parentesi quadre `[]`:

<script src="http://ideone.com/e.js/2pdtrE" type="text/javascript" ></script>

Notare che:

* `ricavi_mensili` è il nome di un tipo **vettore**.
* `ricavi_2013` è una variabile di tipo `ricavi_mensili` (ovvero è una **istanza di vettore**) e viene inizializzata con 12 valori (corrispondenti ai mesi dell'anno).
* `ricavi_2013[i]` è l'elemento `i`-esimo del vettore `ricavi_2013`. Puo' essere letto o scritto come una variabile intera — valgono infatti le stesse regole.

## Materiale aggiuntivo

Ecco alcune slides sugli argomenti visti fino ad oggi ed altro che vedremo successivamente; 

* [Slides sui tipi di dato](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/04_tipi_di_dato.pdf)

* [Slides sulle strutture di controllo](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/05_strutture_di_controllo.pdf), con materiale inedito

* [Slides sugli array](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/06_array_e_matrici.pdf)