---
title: Lezione sui tipi di dato del 16 Ottobre 2013
date: 2013-10-16 15:34:44

layout: post
category : infob 
tags : ["lezione"] 
---

Ogni qualvolta viene pubblicato un post relativo al corso, mando un tweet [dal mio account Twitter](http://twitter.com/_vzaccaria_). Iscrivetevi e seguite l'account per rimanere aggiornati in tempo reale.

Iniziamo col materiale visto oggi:

## Dichiarazioni di nuovi tipi

Oggi abbiamo visto cosa significa creare un nuovo tipo in aggiunta a quelli forniti dal linguaggio C (`int`, `float`, `char` etc..), attraverso la parola chiave `typedef`. 

Per farvi ripassare un pò di inglese, [date un'occhiata alla descrizione di typedef su wikipedia](http://en.wikipedia.org/wiki/Typedef) (guardate solo la parte relativa al linguaggio C).

## Tipi enumerativi

Ecco il programma visto oggi per la definizione di un tipo enumerativo (`giorno_settimana`):

    #include <stdio.h>

    typedef enum { lun, mar, merc, gio, ven, sab, dom } giorno_settimana;

    int main()
    {
        giorno_settimana g;
        for(g=lun; g<=dom; g++)
        {
            printf(" %d ", g);
        }
    }

Ricordate che `lun` … `dom` sono etichette alle quali viene assegnato un valore numerico (`lun`=0 … `dom`=6). `giorno_settimana` è di fatto un intero con un insieme molto limitato di valori. Possiamo quindi utilizzare il segnaposto `%d` per stampare il suo valore.

## Strutture dati

Possiamo definire una struttura dati come un insieme di variabili (o *campi*) al quale viene dato un nome. In questo caso, utilizziamo la parola chiave `typedef` e `struct` per definire un tipo chiamato `studente` che è caratterizzato dai quattro campi elencati: 

    #include <stdio.h>

    typedef struct 
    {
       int giorno_nascita;
       int mese_nascita;
       int anno_nascita;
       int voto_informatica_b;
    } studente;

Una volta definito il tipo `studente` posso istanziarne un numero arbitrario di variabili; in questo caso istanziamo due variabili `s` e `t`; una volta inizializzati i campi di `s`, procediamo a copiare tutta la struttura in `t` con un singolo assegnamento:

    int main()
    {
        studente s;
        studente t;

        s.giorno_nascita     = 10;
        s.mese_nascita       = 7;
        s.anno_nascita       = 1950;
        s.voto_informatica_b = 18;

        printf(" giorno di nascita: %d\n", s.giorno_nascita);
        
        t = s;

        printf(" voto di informatica: %d\n", t.voto_informatica_b);

    }

## Vettori

Un vettore è una struttura dati particolare in cui i campi sono accessibili attraverso un indice specificato fra parentesi quadre `[]`:

    #include <stdio.h>

    typedef int lista_ricavi_annuali[12];

    int main()
    {
        int somma;
        int i;
        lista_ricavi_annuali l = {1, 2, 5, 2, 1, 1, 3, 3, 3, 0, 0, 0};

        l[0] = 100;
        
        somma = 0;
        for(i=0; i<12; i++)
        {
            somma = somma + l[i];
        }
        printf("somma: %d \n", somma);
    }

Notare che:

* `lista_ricavi_annuali` è il nome di un tipo **vettore**.
* `l` è una variabile di tipo `lista_ricavi_annuali` (ovvero è una **istanza di vettore**) e viene inizializzata con 12 valori (corrispondenti ai mesi dell'anno).
* `l[i]` è l'elemento `i`-esimo del vettore `l`. Puo' essere letto o scritto come una variabile intera — valgono infatti le stesse regole.

Come promesso, [potete trovare a questo indirizzo un'esempio](http://www.vittoriozaccaria.net/pseudocode/#ex/7) di simulazione dell'algoritmo appena visto. 
**Studiate bene cosa avviene alla variabile `somma`!**

## Stringhe

Ecco i semplici esercizi sulle stringhe fatti oggi. Abbiamo iniziato con la definizione di un tipo stringa e la copia della stessa utilizzando `strlen` e `strcpy`:


    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    typedef char stringa[30];

    int main()
    {
        int i;
        stringa s = "Ciao";
        printf("%s \n", s);
        printf("N. caratteri: %d \n", strlen(s));
        strcpy(s, "Nuovo valore");
        printf("%s \n", s);
        printf("N. caratteri: %d \n", strlen(s));       
    }

Infine, abbiamo visto come invertire una stringa (variable `s`) i cui caratteri significativi sono in numero arbitrario[^1]:

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    typedef char stringa[30];

    int main()
    {
        int i;
        int j = 0;
        stringa s = "Ciao";
        stringa inversa;
        for( i=(strlen(s)-1); i >= 0; i--)
        {
            inversa[j] = s[i];
            j++;
        }
        inversa[strlen(s)] = '\0';
        // oppure inversa[j] = '\0';
        printf("%s\n", inversa );
    }

## Materiale aggiuntivo 

A grande richiesta, ecco alcune slides che vanno più nel dettaglio dell'argomento.

* [Strutture di controllo (`if`, `while` etc.)](https://www.dropbox.com/s/d6g3e54gmorh14q/05_strutture_di_controllo.pdf) — leggetele tutte poiché ci sono alcune cose che non abbiamo visto in aula.
* [Array e matrici](https://www.dropbox.com/s/85w20qpzth8vc80/06_array_e_matrici.pdf) — le matrici le vedremo prossimamente, intanto leggete questo.
* [Struct e strutture dati](https://www.dropbox.com/s/wcp3d1tpt4a8ppb/07_Struct.pdf).

## Sondaggio

Sempre anonimo:

<div class="iframe-wrapper"> 
    <iframe id="fs-survey-iframe" class="iframe-content" src="http://fluidsurveys.com/surveys/vittorio-HFF/lezione-del-16-ottobre-2013/" scrolling="no" frameborder="0" >.
    </iframe>
</div>

 [^1]:Nonostante la stringa venga dichiarata con un tipo vettore di 30 caratteri, dobbiamo usare un terminatore `\0` per indicare quanto di questo vettore stiamo consumando. Questo è necessario affinché tutte le funzioni operanti sulle stringhe (come la `printf`) sappiano su quanti caratteri lavorare. 