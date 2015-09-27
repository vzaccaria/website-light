---
title: Lezione del 23 Ottobre
date: 2013-10-23 13:45:21

layout: post
category : infob 
tags : ["lezione"] 
---

# Ricapitolazione

Oggi abbiamo più che altro risposto alle vostre domande riguardo ai tipi definiti con `typedef`.

Il costrutto `typedef` serve, in un certo senso, a estendere il linguaggio C, per gestire categorie più complesse di dato.

Quindi, cosi' come potete utilizzare i tipi nativi del C per definire nuove variabili:

    int a;
    float b;
    char c;

una volta definito un nuovo tipo, ad esempio `libro`:

    typedef struct
    {
      int anno_pubbl;
      char titolo[30];
    } libro;

potete dichiararne più variabili:

    libro l1;
    libro l2;
    libro l3;

o addirittura una libreria intera di 100 libri:

    libro libreria[100];

## Array e stringhe

Le stringhe sono degli array di caratteri, con una dimensione massima:

    typedef char stringa[5];

Possiamo inizializzare una stringa (`esempio`) in questo modo:

    stringa esempio = "ciao";

i valori in memoria saranno i seguenti:

    indice nell'array:      0  1  2  3  4
    valore dell'elemento:   c  i  a  o  \0

Possiamo modificare un elemento della stringa in questo modo:

    esempio[0] = 'm';

che risulta nel seguente valore di `esempio`:

    indice nell'array:      0  1  2  3  4
    valore dell'elemento:   m  i  a  o  \0

Possiamo — infine — leggere un carattere dalla stringa in questo modo:

    char d;
    d = esempio[0];

# Calcolo delle vendite di iPad nel 2011 e 2012

Questo programma confronta le vendite totali del 2011 e del 2012 di iPad, partendo dai dati contenuti in `vendite_2012` e `vendite_2011`.

Notate come ho utilizzato lo stesso tipo per `vendite_2011` e `vendite_2012`:

    #include <stdio.h>

    typedef int ipad_venduti_mese[12];

    int main()
    {
        int ipad_venduti_in_anno_2011=0;
        int ipad_venduti_in_anno_2012=0;
        int i;

        ipad_venduti_mese vendite_2012 = { 1,1,1,2,3,5,7,9,1,2,7,1};
        ipad_venduti_mese vendite_2011 = { 2,2,2,3,1,2,3,9,9,9,1,2};

        for(i=0; i<12; i++)
        {
            ipad_venduti_in_anno_2011 = ipad_venduti_in_anno_2011 + 
                                        vendite_2011[i];
        }

        for(i=0; i<12; i++)
        {
            ipad_venduti_in_anno_2012 = ipad_venduti_in_anno_2012 + 
                                        vendite_2012[i];
        }
        if( ipad_venduti_in_anno_2011 > ipad_venduti_in_anno_2012)
        {
            printf("2011 (vendite=%d) meglio del 2012 (vendite=%d)\n", ipad_venduti_in_anno_2011, ipad_venduti_in_anno_2012);
        }
        else
        {
            printf("2011 (vendite=%d) peggio del 2012 (vendite=%d)\n", ipad_venduti_in_anno_2011, ipad_venduti_in_anno_2012);
        }
        return 0;
    }

# Calcolo delle vendite, input inserito dall'utente

Nell'esercizio successivo abbiamo modificato il programma precedente in modo tale da leggere i dati da tastiera:

    #include <stdio.h>

    typedef int ipad_venduti_mese[12];

    int main()
    {
        int ipad_venduti_in_anno_2012=0;
        int i;

        ipad_venduti_mese vendite_2012;

        for(i=0; i<12; i++)
        {
            printf("Caro utente, inserisci le vendite del mese %d: ", i);
            scanf("%d", & vendite_2012[i]);
        }

        for(i=0; i<12; i++)
        {
            ipad_venduti_in_anno_2012 = ipad_venduti_in_anno_2012 + 
                                        vendite_2012[i];
        }
        printf("Le vendite totali sono: %d\n", ipad_venduti_in_anno_2012);
        return 0;
    }

# Calcolo del minimo e massimo

Abbiamo poi modificato l'esercizio precedente, richiedendo i dati relativi ad un particolare mese nel caso in cui l'utente inserisca un valore maggiore di 10. Questo significa che i valori accettabili sono da 0 a 10.

Contemporaneamente, abbiamo determinato i valori massimi e minimi contenuti nell'array appena letto:

    #include <stdio.h>

    typedef int ipad_venduti_mese[12];

    ipad_venduti_mese vendite_2012;

    int vendite_2012[12];


    int main()
    {
        int ipad_venduti_in_anno_2012=0;
        int i;
        int max;
        int min;

        ipad_venduti_mese vendite_2012;

        for(i=0; i<12; i++)
        {
            do {
                    printf("Caro utente, inserisci le vendite del mese %d: ", i);
                    scanf("%d", & vendite_2012[i]);
            } while(vendite_2012[i] > 10);
        }

        max = 0;
        min = 10;
        for(i=0; i<12; i++)
        {
            ipad_venduti_in_anno_2012 = ipad_venduti_in_anno_2012 + 
                                        vendite_2012[i];
            if(vendite_2012[i] > max)
            {
                max = vendite_2012[i];
            }    
            if(vendite_2012[i] < min)
            {
                min = vendite_2012[i];
            }
        }
        printf("Le vendite totali sono: %d\n", ipad_venduti_in_anno_2012);
        printf("il massimo delle vendite è: %d\n", max);
        printf("il minimo delle vendite è: %d\n", min);

        return 0;
    }

# Stringhe

Infine, abbiamo visto come utilizzare le funzioni `strlen` (calcola lunghezza effettiva stringa) e `strcpy` (copia stringa):

    #include "stdio.h"

    typedef char stringa[10];

    int main()
    {
        stringa s1 = "ciao";
        stringa s2 = "foo";
        /*
            c  i  a  o \0  ?  ?  ?  ?  ?
            0  1  2  3  4  5  6  7  8  9 
        */
        printf("La stringa è lunga %d caratteri\n", strlen(s1));

        strcpy(s2, s1);

        printf("La stringa s1 è %s \n", s1);
        printf("La stringa s2 è %s \n", s2);

        return 0;
    }

# Dichiarazioni di tipo complesse

L'ultimo esempio si è concentrato sulla dichiarazione di tipi complessi (e relative variabili), facendo l'esempio di una base di dati universitaria per studenti di primo e secondo livello:

    #include "stdio.h"

    typedef char stringa[30];

    typedef struct 
    {
        int giorno;
        int mese;
        int anno;
    } data;

    typedef struct 
    {
        int codice_insegnamento;
        data data_dell_esame;
        int  voto;
    } esame;

    typedef struct 
    {
        stringa nome;
        stringa matricola;
        data    data_di_nascita;
        esame   esami_sostenuti[19];
    } studente;

    typedef studente database[1000];

Una volta definito il tipo `database` (che è un array di 1000 `studente`), posso dichiarare due variabili per le due tipologie di studenti:

    database studenti_di_primo_livello;
    database studenti_di_secondo_livello;

Supponiamo che voglia ricavare la data del primo esame sostenuto dallo studente in undicesima posizione[^1]; per leggere tale data devo specificare il cammino da effettuare per arrivare fino al campo desiderato:

    studenti_di_primo_livello[10].esami_sostenuti[0].data_dell_esame

Se volessi invece inserire un esame nel database devo prima dichiararlo e inizializzarlo:

    esame e;

    e.codice_insegnamento = 81639;
    e.voto = 29;
    e.data = ...;

per poi copiarlo nella posizione desiderata, ad esempio sesto esame sostenuto dello studente in posizione 21.

    studenti_di_primo_livello[20].esami_sostenuti[5] = e;





 [^1]:Ricordate che gli indici negli array partono da 0 e non da 1. Quindi posizione undicesima = indice 10. 