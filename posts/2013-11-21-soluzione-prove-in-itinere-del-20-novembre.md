---
title: Soluzione prove in itinere del 20 Novembre
date: 2013-11-21 11:18:07

layout: post
category : infob 
tags : ["esame", "strutture in C", "algoritmi in C"] 
---

Ecco le tanto agognate soluzioni del primo tema d'esame:

## Esercizio 1

Sia data la definizione di stringa:

    typedef char stringa[30];

e la definizione di un messaggio tweet di 140 caratteri, contenente al massimo 4 hashtags (quelle stringhe nei tweet che cominciano con `'#'`, ad esempio, `"#poli"`):

    typedef struct {
        char contenuto[140];
        int  numero_hashtags;
        stringa hashtags[4];
    } tweet;

Sia data la seguente struttura di utente twitter:

    typedef struct {
        stringa nome;
        int     data_iscrizione; /* anno di iscrizione a twitter */
        int     numero_messaggi; /* numero effettivo messaggi */
        tweet   messaggi[100];
    } utente;

e di database di utenti:

    typedef struct {
        int numero_utenti;
        utente dati_utente[100];
    } database;

    database twitterdb;

Si chiede di scrivere un programma che stampi a video tutti gli utenti iscritti dal 2012 che hanno usato l'hashtag "#poli" in almeno uno dei propri messaggi. Se, ad esempio, vi sono solo tre utenti nel database:

* @vzaccaria, iscritto dal 2012, messaggi: 
 
    - "E' finito il primo emisemestre! #poli"
    - "E' ora del primo compitino! #poli"
     
* @obama, iscritto dal 2009, messaggi: 

    - "Politecnico is cool! #poli"

* @merkel, iscritta dal 2012, messaggi:

    - "Come to germany!"

Il programma deve stampare: `Utente @vzaccaria ha usato #poli !!`


    int main()
    {
        int u;
        int t;
        int h;
        for(u=0; u<twitterdb.numero_utenti; u++)
        {
            int trovato = 0;
            if(twitterdb.dati_utente[u].data_iscrizione > 2010)
            {
                for( t=0; t< twitterdb.dati_utente[u].numero_messaggi; t++ )
                {
                    for( h=0; h< twitterdb.dati_utente[u].messaggi[t].numero_hashtags; h++)
                    {
                        if(strcmp(twitterdb.dati_utente[u].messaggi[t].hashtags[h], "#poli") == 0)
                            trovato = 1;
                    }
                }
            }
            if(trovato)
            {
                printf("Utente %s ha usato #poli !!\n", twitterdb.dati_utente[u].nome);
            }
        }
    }


## Esercizio 2

Si scriva un programma in linguaggio C per individuare le posizioni dei massimi locali all’interno di in un vettore `v` (contenente numeri in virgola mobile) — un elemento dell’array è un massimo locale **se è maggiore dell’elemento precedente e seguente**.[^1] 

Le posizioni dei massimi locali devono essere salvate in un secondo vettore `pos`. In particolare il programma dovrà:

1. Richiedere all’utente quanti numeri intende inserire (massimo 100).
2. Richiedere  all'utente tali numeri e salvarli nel vettore `v`
3. Scandire `v` e salvare in `pos`, senza lasciare buchi, gli indici dei massimi locali. Le posizioni dei massimi locali sono date dagli indici dell’array corrispondenti ai massimi locali. 



### Esempio:
Si assuma che il vettore v contenga 12 elementi:

    v = 1, 4, 3, 5, 5, 7, 3, 12, 12, 4, 1, 100

i massimi locali sono:

*  all'indice numero 1 (poiche' 4 è maggiore sia di 1 che di 3)
*  all'indice numero 5 (poiche' 7 è maggiore sia di 5 che di 3).

**Soluzione**:

    #include <stdio.h>
    #define N 100
    void main()
    {
        float v[N];
        int pos[N];
        int i, j, n;
        float temp;

        do
        {
            printf("\ninserire n: ");
            scanf("%d", &n);
        } while(n<0 || n > N);

        for(i = 0; i < n; i++)
        {
            printf("\n v[%d] = ", i);
            scanf("%f", &v[i]);
        }

        n = i;
        j = 0;
        for(i = 1; i < n - 1; i++)
        {
            if(v[i] > v[i - 1] && v[i] > v[i + 1])
                {
                    pos[j] = i;
                    j++;
                }
        }

    printf("\n");
    for(i = 0; i < j; i++)
        printf(" %d ", pos[i]);
    }
 


## Esercizio 3

Si definisca il numero minimo di bit per rappresentare in virgola fissa C2 i seguenti numeri e si ricavi la codifica equivalente:

* 2
* .25
* -2
* -2.25


**Soluzione**:


| Numero (decimale) |                    bit minimi                   | Codifica binaria del numero |
|:-----------------:| ----------------------------------------------- | ---------------------------:|
|                 2 | **3** (3 per parte intera, 0 per parte frazionaria) |                         010 |
|              0.25 | **3** (1 per parte intera, 2 per parte frazionaria) |                        0.01 |
|                -2 | **2** (2 per parte intera, 0 per parte frazionaria) |                          10 |
|             -2.25 | **5** (3 per parte intera, 2 per parte frazionaria) |                      101.11 |

*Nota: il punto nella codifica serve a separare la rappresentazione in parte intera e frazionaria*

**Seconda parte**
Si rappresenti il numero 0.2 e si stabilisca se tale rappresentazione è esatta e, nel caso non lo fosse spiegare il perchè:

Se calcoliamo la codifica manualmente:

    0.2 ⨉ 2 = 0.4
    0.4 ⨉ 2 = 0.8
    0.8 ⨉ 2 = 1.6 
    0.6 ⨉ 2 = 1.2 
    0.2 ⨉ 2 = 0.4 <- uguale alla prima moltiplicazione

Notiamo che non arriveremo mai ad una rappresentazione esatta del numero. Esso sara' infatti rappresentato da una sequenza infinita di 

    001100110011001100110011..


Ecco le ancora più agognate soluzioni del secondo tema d'esame:

## Esercizio 1

Sia data la definizione di stringa,

    typedef char stringa[30];

la seguente struttura di utente **twitter**:

    typedef struct {
        stringa nome;
        int     data_iscrizione; /* anno di iscrizione a twitter */
        int     numero_messaggi; /* numero effettivo messaggi */
        tweet   messaggi[100];
    } utente;


e la definizione di un messaggio tweet di 140 caratteri, contenente al massimo 4 utenti menzionati:

    typedef struct {
        char contenuto[140];
        int  numero_menzionati;
        utente menzionati[4]; /* Licenza poetica, 
                                 qui sarebbe dovuto essere: 
                                 ...
                                 utente *menzionati; 
                                 ...
                                 e' lo stesso ai fini del tema d'esame */
    } tweet;


Si consideri infine, il seguente database di utenti:

    typedef struct {
        int numero_utenti;
        utente dati_utente[100];
    } database;

    database twitterdb;

Si chiede di scrivere un programma che stampi a video tutti gli utenti iscritti dal 2008 che hanno menzionato '@obama' in almeno uno dei propri messaggi. Se, ad esempio, vi sono solo tre utenti nel database:

* `@vzaccaria`, iscritto dal 2012, messaggi: 
 
    - "@obama for president!"
    - "@obama elected!"
     
* `@merkel`, iscritta dal 2012, messaggi:

    - "Come to germany!"

Il programma deve stampare: `Utente @vzaccaria ha menzionato @obama !!`

*Soluzione*


    int main()
    {
        int u;
        int t;
        int h;
        for(u=0; u<twitterdb.numero_utenti; u++)
        {
            int trovato = 0;
            if(twitterdb.dati_utente[u].data_iscrizione > 2008)
            {
                for( t=0; t< twitterdb.dati_utente[u].numero_messaggi; t++ )
                {
                    for( h=0; h< twitterdb.dati_utente[u].messaggi[t].numero_menzionati; h++)
                    {
                        if(strcmp(twitterdb.dati_utente[u].messaggi[t].menzionati[h].nome, "@obama") == 0)
                            trovato = 1;
                    }
                }
            }
            if(trovato)
            {
                printf("Utente %s ha menzionato @obama !!\n", twitterdb.dati_utente[u].nome);
            }
        }
    }


## Esercizio 2

Si scriva un programma in linguaggio C per individuare le posizioni di segmenti costanti all’interno di in un vettore `v` (contenente numeri in virgola mobile). 

Un elemento appartiene ad un segmento costante **se è uguale all’elemento precedente o all’elemento seguente**. 

Le posizioni dei segmenti costanti devono essere salvate in un secondo vettore `pos`.

In particolare il programma dovrà:

1.  Richiedere all’utente quanti numeri intende inserire (massimo 100),
2.  Richiedere tali numeri e riempire il vettore `v`
3.  Scandire `v` e salvare in `pos`, senza lasciare buchi, le posizioni dei segmenti costanti. Le posizioni dei segmenti costanti sono date da tutti gli indici degli elementi appartenenti a segmenti costanti.

### Esempio
Si assuma che il vettore v contenga 12 elementi

    v = 1, 4, 3, 5, 5, 7, 3, 12, 12, 4, 1, 100

il vettore `pos` dovra' essere uguale a:

    pos = 3, 4, 7, 8 

ovvero:

* le posizioni 3 e 4 poiche' vi e' una sequenza di due elementi uguali a 5
* le posizioni 7 e 8 poiche' vi e' una sequenza di due elementi uguali a 12

*Soluzione*

    #include <stdio.h>
    #define N 100

    void main()
    {
        float v[N];
        int pos[N];
        int i, j, n;
        float temp;

        do
        {
            printf("\ninserire n: ");
            scanf("%d", &n);
        } while(n<0 || n > N);

        for(i = 0; i < n; i++)
        {
            printf("\n v[%d] = ", i);
            scanf("%f", &v[i]);
        }

        j = 0;
        for(i = 1; i < n - 1; i++)
        {
            if(v[i] == v[i - 1] || v[i] == v[i + 1])
                {
                    pos[j] = i;
                    j++;
                }
        }
        printf("\n le aree costanti appaiono nella posizione: ");
        for(i = 0; i < j; i++)
            printf(" %d ", pos[i]);
    }


### Esercizio 3

Si definisca il minimo numero di bit necessari per rappresentare in complemento a 2 tutti i seguenti valori interi:

| numero | bit minimi |   codifica  |
| :----: | :--------: | ----------: |
|  149   |  9 in C2   | `010010101` |
|  108   |  8 in C2   |  `01101100` |
|   12   |  5 in C2   |     `01100` |
|   42   |  7 in C2   |   `0101010` |
|   92   |  8 in C2   |  `01011100` |


Si eseguano quindi le seguenti operazioni riportando eventuali riporti perduti o overflow:

* Calcolo di (`- 149 – 108`)

    - ricavo `-149`:
        
            010010101 -> nego
            101101010 -> aggiungo 1
            ---------
            101101011 (-149 su 9 bit)

    - ricavo `-108`:

             01101100 -> nego
             10010011 -> aggiungo 1
            ---------
            110010100 (-108 su 9 bit)

    - faccio la somma `-149 + (-108)`; in realta' so gia che e' overflow poiche'
      su 9 bit posso rappresentare al minimo -256, mentre il risultato e' -257:

            101101011
            110010100
            ---------
           1011111111 -> riporto perduto e overflow!


* Calcolo di (`108 + 12`)

        01101100
        00001100
        --------
        01111000 -> no riporto perduto e no overflow.




