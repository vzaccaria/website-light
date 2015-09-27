---
title: Architettura del processore
date: 2015-01-23 10:23:06

layout: post
category : infob 
tags : ["lezione"] 
---

Ecco a voi il materiale rimanente sull'[architettura interna del processore ed il bus di sistema](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/s-architettura-1.pdf).

### Esercizio su memoria virtuale

Un sistema dispone di 32 Kbyte di memoria fisica indirizzabile; inoltre è dotato di memoria virtuale con paginazione caratterizzata dai seguenti parametri: l’indirizzo virtuale è di 17 bit e le pagine sono di 1 Kbyte.

Qual è la dimensione della memoria virtuale indirizzabile?

> Con 17 bit possiamo indirizzare 2^17^ celle, ovvero 128 Kbyte.

Definire la struttura dell’indirizzo logico e di quello fisico
indicando la lunghezza dei campi che li costituiscono

```
Offset = 10 bit.
NPF = 5bit
PA = 15 bit 
NPV = 7 bit
```

### Esercizio su memoria virtuale

Un sistema con 8 Mbyte di memoria fisica è dotato di memoria virtuale con paginazione, con indirizzo virtuale di 24 bit e pagine di 512 byte.
 
Quante pagine di memoria virtuale sono disponibili nel sistema?

> L’indirizzo della memoria fisica sarà di 23 bit.
> Ogni pagina è grande 2^9^ byte.
> Il numero di pagine della memoria virtuale sarà 2^24^/2^9^ = 2^15^ pagine.

Definire la struttura dell’indirizzo fisico indicando la lunghezza dei campi che li costituiscono.

```
Offset 9 bit 
PA 23 bit
NPF = 14 bit
```
 
### Cache e prestazioni

L’azienda per cui lavorate vi ha dato l’incarico di acquistare il server aziendale. Il direttore vendite della società Fast vi propone i seguenti sistemi con memorie che hanno lo stesso prezzo e la medesima dimensione:

a. Una memoria centrale con memoria cache che ha le seguenti caratteristiche:

    - Hit Rate = 80%
    - Hit Time = 20 ns
    - Miss Penalty = 400 ns
 
b. Una memoria centrale senza memoria cache con un tempo medio di
accesso di 100 ns

Domande:

1. Quale delle due memorie in offerta acquistereste? Giustificare la
risposta.

        TMCache (ns) = 
            0.8*20*10^(-9) + 0.2*400* 10^(-9) = 
            16 *   10^(-9) + 80 *     10^(-9) = 
            96 *   10^(-9) 
            < 100ns

        TMNocache = 100ns

    Il sistema con la cache è meglio.

2. Cambierebbe la vostra risposta se il Miss Penalty fosse pari a 500 ns?

        TMCache (ns) = 
            0.8*20*10^(-9) + 0.2*500* 10^(-9) = 
            16 *   10^(-9) + 100 *    10^(-9) = 
            116*   10^(-9) 
            < 100ns

        TMNocache = 100ns

    Il sistema senza cache sarebbe meglio


## Introduzione a Internet

Il materiale è un pò distribuito. Cercherò di riassumere qui di seguito le fonti che devono necessariamente essere studiate:

* __Internet Protocol__: Introduzione e paragrafo _Function_ [di questo articolo da wikipedia](http://en.wikipedia.org/wiki/Internet_Protocol).

* __HTTP__: Introduzione e paragrafo _Request Methods_ [di questo articolo da wikipedia](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
