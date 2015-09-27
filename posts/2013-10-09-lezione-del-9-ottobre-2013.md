---
title: Lezione del 9 ottobre 2013
date: 2013-10-09 13:52:50

layout: post
category : infob 
tags : ["lezione"] 
---

## Esercizi con linguaggio giocattolo

Nella prima parte della lezione abbiamo riguardato le simulazioni di alcuni programmi. Ecco i link alle *scatole dei giochi* con cui divertirvi:

* [Cosa succede alla fine di un ciclo](http://www.vittoriozaccaria.net/pseudocode/#ex/6)

* [Tracciamento delle variabili in cicli innestati](http://www.vittoriozaccaria.net/pseudocode/#ex/5)

## Linguaggio C

I nostro primo programma C (a parte 'hello world') è stata la stampa di un numero intero — tramite `printf` — attraverso *un segnaposto*:

    #include <stdio.h>

    int main()
    {
        int numero = 1;
        printf("il valore di numero e': %d", numero);
        return 0;
    }

Stessa cosa per numeri `float`:

    #include <stdio.h>

    int main()
    {
        float numero = 1.1;
        printf("il valore di numero e': %f", numero);
        return 0;
    }

Ricapitolando, per la `printf`:

| Segnaposto |     Tipo di dato da stampare    |
| ---------- | ------------------------------- |
| `%d`       | Intero o `int`                  |
| `%f`       | numero con la virgola o `float` |

[Ecco un'altra manciata di slide per approfondire gli argomenti.](http://www.vittoriozaccaria.net/deposit/03_introduzione_al_C.pdf)


## Sondaggio

Come sempre anonimo:

<div class="iframe-wrapper"> 
    <iframe id="fs-survey-iframe" class="iframe-content" src="http://fluidsurveys.com/surveys/vittorio-HFF/lezione-del-9-ottobre-2013/" scrolling="no" frameborder="0" >.
    </iframe>
</div>


