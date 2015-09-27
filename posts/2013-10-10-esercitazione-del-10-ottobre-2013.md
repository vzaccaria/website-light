---
title: Esercitazione del 10 Ottobre 2013
date: 2013-10-10 13:09:22

layout: post
category : infob 
tags : ["esercizi", "algoritmi in C"] 
---

## Calcolo del resto

Il vostro primo programma serio in linguaggio C è stato il calcolo del resto di una divisione:

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

## Stampa della tabella dei caratteri internazionali

Una variabile carattere (tipo `char`) è memorizzata dal calcolatore come un numero intero, come mostrato in questo esempio:

    #include <stdio.h>

    int main()
    {
        char c;
        for(c = 'A'; c <= 'Z' ; c++)
        {
            printf(" %c (= %d) \n", c, c);
        }
        for(c = 'a'; c <= 'z' ; c++)
        {
            printf(" %c (= %d) \n", c, c);
        }
        return 0;
    }

Ricordate che con `'A'` si intende la codifica numerica dello stesso.

## Conversione di un carattere da minuscolo a maiuscolo

In questo esercizio trasformiamo un carattere letto da tastiera con `getchar` da minuscolo in maiuscolo — se non è già maiuscolo:

    #include <stdio.h>

    int main()
    {
        char c, cmaiuscolo;
        int distanza;
        distanza = 'a' - 'A';

        c = getchar();
        if( c >= 'A' && c <= 'Z' )
        {
            cmaiuscolo = c;
        }
        else
        {
            cmaiuscolo = c - distanza;
        }
        printf(" il maiuscolo e': %c \n ", cmaiuscolo);
        
    }

## Differenza tra uguaglianza e assegnamento

Ricordare la differenza fra i due operatori `=` ed `==`.

| Operatore | Esempio  |                     Significato                     |                                      Valore                                     |
| --------- | -------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| `=`       | `a = b`  | Questa espressione assegna ad `a` il valore di `b`. | Il valore dell'espressione è quello di `b`                                      |
| `==`      | `a == b` | Confronta `a` con `b`.                              | Il valore risultante è `1` se `a` è uguale a `b`, `0 se `a` è differente da `b` |

Il seguente programma usa correttamente l'operatore `==`:

    #include <stdio.h>

    int main()
    {
        int a;
        scanf("%d", & a);
        if( a == 1 )
        {
            printf("Hai inserito una unita' \n");
        }
        else
        {
            printf("Non hai inserito una unita' \n");
        }
    }

Il seguente programma usa l'opeatore `=` in modo sbagliato:

    #include <stdio.h>

    int main()
    {
        int a;
        scanf("%d", & a);
        if( a = 1 )
        {
            printf("Hai inserito una unita' \n");
        }
        else
        {
            printf("Non hai inserito una unita' \n");
        }
    }
