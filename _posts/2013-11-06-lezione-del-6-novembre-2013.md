---
title: Lezione del 6 Novembre 2013
date: 2013-11-06 12:02:55

layout: post
category : infob 
tags : ["lezione"] 
---

## Ripasso delle strutture dati complesse

Come promesso, ecco il diagramma mostrato oggi a lezione riguardo alle strutture dati complesse (cliccare l'immagine per scaricare il pdf).

<a href="http://www.vittoriozaccaria.net/deposit/strutture-dati-complesse.pdf"> 
    <img class="center" src="http://www.vittoriozaccaria.net/deposit/strutture-dati-complesse.png"></img>
</a>


### Calcolo della media

Abbiamo utilizzato il seguente programma per il calcolo delle medie di ciascuno studente:

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
        int     numero_esami_effettivamente_sostenuti;
        esame   esami_sostenuti[19];
    } studente;

    typedef studente database[1000];

    database studenti_di_primo_livello;

    int main(int argc, char const *argv[])
    {
        int K, J;
        for(K=0; K<1000; K++)
        {
            int somma = 0;
            int media;
            for(J=0; J<studenti_di_primo_livello[K].numero_esami_effettivamente_sostenuti; J++)
            {
                somma = somma + studenti_di_primo_livello[K].esami_sostenuti[J].voto;
            }
            media = somma / studenti_di_primo_livello[K].numero_esami_effettivamente_sostenuti;
            printf("La media globale dello studente %s è %d\n", studenti_di_primo_livello[K].nome, media);
        }
        return 0;
    }


### Calcolo della media delle medie
Per il calcolo della media delle medie, abbiamo modificato il programma di cui sopra nel seguente:

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
        int     numero_esami_effettivamente_sostenuti;
        esame   esami_sostenuti[19];
    } studente;

    typedef studente database[1000];


    studente studenti_di_primo_livello[1000];

    int main(int argc, char const *argv[])
    {
        int K, J;
        int somma_globale = 0;
        int media_globale;
        for(K=0; K<1000; K++)
        {
            int somma = 0;
            int media;
            for(J=0; J<studenti_di_primo_livello[K].numero_esami_effettivamente_sostenuti; J++)
            {
                somma = somma + studenti_di_primo_livello[K].esami_sostenuti[J].voto;
            }
            media = somma / studenti_di_primo_livello[K].numero_esami_effettivamente_sostenuti;
            somma_globale = somma_globale + media;
        }
        media_globale = somma_globale/1000;
        printf("La media globale degli studenti è %d\n", media_globale);
        return 0;
    }


## Codifica in virgola fissa e mobile

Ecco tutto il materiale sulla codifica, compresa virgola fissa e mobile (cliccare per scaricare il pdf):


<a href="http://www.vittoriozaccaria.net/deposit/1112_111019_08_codifica_binaria.pdf"> 
    <img src="http://www.vittoriozaccaria.net/deposit/ieee-754.png"></img>
</a>








