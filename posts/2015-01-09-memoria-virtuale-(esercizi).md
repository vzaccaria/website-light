---
title: Memoria virtuale (esercizi)
date: 2015-01-09 12:33:20

layout: post
category : infob 
tags : ["lezione"] 
---

[A questo link le slides di approfondimento sulla memoria virtuale.](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/s-memoria_virtuale-4.pdf)


# Esercizio 1

Un sistema dispone di 256 Kbyte di memoria virtuale indirizzabile, con paginazione caratterizzata dai seguenti parametri: 

* indirizzo fisico di 16 bit e 
* pagine di dimensione di 2 Kbyte. 

Rispondere alle seguenti domande giustificando le risposte:

a. Quale è la dimensione della memoria fisica indirizzabile?

> La memoria fisica indirizzabile è pari a 64 Kbyte (2^16 byte)

b. Quale è la struttura dell’indirizzo virtuale e di quello fisico, e la lunghezza dei campi che li costituiscono?

> * Indirizzo Virtuale:  18 bit     NPV: 7  bit offset: 11  bit
>
> * Indirizzo Fisico:    16 bit     NPF: 5  bit offset: 11  bit


# Esercizio 2 

Un sistema dispone di 64 Kbyte di memoria fisica indirizzabile e di 128 Kbyte di memoria virtuale indirizzabile; inoltre la memoria virtuale è organizzata in pagine di 512 byte. 

Rispondere alle seguenti domande (giustificando i risultati ottenuti con gli opportuni calcoli):

1.  Definire la struttura dell’indirizzo virtuale e di quello fisico indicando la lunghezza dei campi che li costituiscono.

> * 512 byte  = 2^9 byte => offset di 9 bit 
> * 64 Kbyte  = 2^16 byte => indirizzo fisico di 16 bit
> * 128 Kbyte = 2^17 byte => indirizzo virtuale di 17 bit
> * Indirizzo virtuale di 17 bit, NPV 8 bit, offset 9 bit
> * Indirizzo fisico di 16 bit, NPF 7 bit, offset 9 bit

2.  Quante sono le pagine di memoria virtuale?

> Il sistema ha a disposizione 2^8  = 256 pagine di memoria virtuale.

  
## Parte B

Si consideri un sistema con le seguenti caratteristiche: 

* Indirizzo virtuale di 8 bit
* Indirizzo fisico di 7 bit
* Dimensione pagine 16 byte

L’indirizzo virtuale 00101000 può corrispondere all’indirizzo fisico 0010100? Giustificare la risposta.

> L’offset è di 4 bit (16 byte = 2^4), perciò la traduzione non è possibile dal momento che i 4 bit meno significativi non corrispondono.

# Esercizio 3

Si assuma di voler convertire in maniera automatica degli indirizzi fisici in indirizzi virtuali. Assumiamo di avere la tabella di conversione memorizzata in un'array bi-dimensionale C:

    int tabella[4][2] = { 
        { 0, 4 },
        { 1, 2 },
        { 2, 1 },
        { 3, 0 }
    };

dove, per ciascuna riga della tabella, viene specificato l'`npf` e l'`npv` corrispondente. Ad esempio, la prima riga dice che il numero di pagina fisica (npf) 0 deve essere tradotto in un numero di pagina virtuale (npv) pari a 4.

## Domanda 1
Sapendo che l'offset ha dimensione 8 bit, si completi il seguente programma in modo che calcoli e stampi l'offset ed il numero di pagina fisica `npf`
di un indirizzo fisico già inserito dall'utente:

```c
    ...
    int npf; 
    int npv;
    int offset;

    offset = indirizzo_fisico % 256;
    npf    = (indirizzo_fisico - offset)/256;

    printf("Offset:      %x\n", offset);
    printf("npf:         %x\n", npf);
```

## Domanda 2
Sapendo che `tabella` contiene la conversione di numero di pagina fisica in numero di pagina virtuale, calcolare e stampare a video il numero di pagina virtuale `npv` e l'indirizzo virtuale corrispondente a `indirizzo_fisico`:

```c
    for (int i = 0; i < 4; ++i) {
        if(tabella[i][0] == npf) {

            int npv;
            int indirizzo_virtuale;

            npv = tabella[i][1];
            indirizzo_virtuale = (tabella[i][1] * 256) + offset;

            printf("npv: %d\n", npv);
            printf("indirizzo_virtuale: %d\n", indirizzo_virtuale);
            break;
        }
    }
    return 0;
}
```