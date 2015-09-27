---
title: Introduzione al C
date: 2014-10-10 11:32:54

layout: post
category : infob 
tags : ["lezione"] 
---

Prima di passare all'argomento della programmazione in C, ecco il link ai primi rimanenti puzzles che abbiamo visto oggi; direi che la parte più importante da ricordarsi è il ciclo `while` e l'uso di cicli che prevedono un contatore al proprio interno:

Links (complessità crescente):

* Artista: [link](http://learn.code.org/s/1/level/40)
* Contadina: [link](http://learn.code.org/s/1/level/52)
* Zombie: [link](http://learn.code.org/s/1/level/60)


# Compilatori e linguaggio macchina

[In queste slide pdf](http://www.vittoriozaccaria.net/deposit/01_introduzione_informatica.pdf) potrete trovare un riassunto di ciò di cui vi ho parlato oggi. In particolare ricordatevi questi concetti:[^1]

* [Compilatore](http://it.wikipedia.org/wiki/Compilatore)
* [Assemblatore](http://it.wikipedia.org/wiki/Assembler)
* [Linguaggio macchina](http://it.wikipedia.org/wiki/Linguaggio_macchina)

# Link al sito dove compilare ed esegure i programmi

Il sito con il compilatore C online che abbiamo usato oggi [è accessibile a questo link](http://www.compileonline.com/compile_c_online.php).

# Introduzione al linguaggio C

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

## Calcolo del resto

Il vostro primo programma serio in linguaggio C è stato il calcolo del resto di una divisione; qui lo vediamo in veste nuova; ovvero richiede i numeri da tastiera con una nuova funzione, chiamata `scanf`:

    #include <stdio.h>

    int main()
    {
        int D, d, q, r;
        printf("Inserisci dividendo: ");
        scanf("%d", & D);
        printf("Inserisci divisore: ");
        scanf("%d", & d);

        q = D / d;
        r = D - q * d;

        printf("Il resto e': %d \n ", r);
        return 0;
    }

Ricordate che:

* `#include <stdio.h>` serve per dichiarare che si utilizzeranno le funzioni di input/output del C (è testardo per cui bisogna dirglielo prima).

* `scanf` è la funzione per leggere stringhe da tastiera. Queste stringhe vengono convertite secondo il formato specificato dal segnaposto.

* Il simbolo `&` serve per specificare la variabile in cui la `scanf` deve scrivere il valore letto da tastiera.
