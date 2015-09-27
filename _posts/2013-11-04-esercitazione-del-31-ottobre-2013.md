---
title: Esercitazione del 31 Ottobre 2013
date: 2013-11-04 08:31:13

layout: post
category : infob 
tags : ["esercizio", "media in C", "stringhe in C", "matrici in C"] 
---

## Calcolo della media di un insieme di float

Dato un array di float comunicati dall'utente, letto da tastiera fino a quando il valore inserito è -1, stampare i valori dell'array che sono maggiori della media

    #include <stdio.h>
    #include <string.h>
    #define MAXEL 30 //costante per il numero massimo di elementi

    int main() {
        float array[MAXEL];
        int n=0;              //numero di elementi del'array
        float corrente;       //valore inserito attualmente
        float somma = 0;      //somma dei valori inseriti
        float media = 0;      //media dei valori
        int i = 0;
        
        do {
            printf("Inserisci il prossimo valore dall'array: ");
            scanf("%f",&corrente);
            if (corrente!=-1) {
                array[n] = corrente;
                somma = somma + corrente;
                n++;
            }
        } while (corrente!=-1 && n<MAXEL);

        if (n>0) {
            media = somma / n;
            for (i=0;i<n;i++) {
                if (array[i]>media) {
                    printf("%.1f ",array[i]);
                }
            }
        } else {
            printf("devi inserire almeno un valore");
        }
    }

## Verifica dell'ordine in un array

Dato un array di float comunicati dall'utente, letto da tastiera fino a quando il valore inserito è -1, verificare se l'array e' ordinato e, in caso contrario, ordinarlo. 


    #include <stdio.h>
    #include <string.h>
    #define MAXEL 30 //costante per il numero massimo di elementi

    int main() {
        float array[MAXEL];
        int n=0;              //numero di elementi del'array
        float corrente;       //valore inserito attualmente
        int ordinato = 1;     //ipotesi che sia ordinato     
        int i;                //indice dell'array
        int j;                //indice dell'array    
        float parcheggio;

        do {
            printf("Inserisci il prossimo valore dall'array: ");
            scanf("%f",&corrente);
            if (corrente!=-1) {
                array[n] = corrente;
                n++;
            }
        } while (corrente!=-1 && n<MAXEL);

        for (i=0;i<n-1 && ordinato==1;i++) {
            if (array[i]>array[i+1]) {
                ordinato = 0;
            }
        }
        
        if (ordinato==1)
            printf("array ordinato\n");
        else {
            printf("array non ordinato\n");
            
            for (i=0;i<n-1;i++) {
                for (j=i+1;j<n;j++) {
                    if (array[i]>array[j]) {
                        // scambio array[i] e array[j]
                        parcheggio = array[i];
                        array[i] = array[j];                
                        array[j] = parcheggio;                
                    }
                }
            }
            
            ordinato = 1;
            for (i=0;i<n-1 && ordinato==1;i++) {
                if (array[i]>array[i+1]) {
                    ordinato = 0;
                }
            }
            
            if (ordinato==1)
                printf("array ordinato\n");
            else
                printf("array non ordinato\n");
        
        }
    }


## Ricerca di una sottostringa in una stringa

Questa soluzione funziona anche nel caso in cui la parola ricercata abbia delle ripetizioni tali per cui 
la soluzione "semplice" vista a lezione non funzionava[^1]. La modifica consiste nel ripristinare il contatore 
della parola ricercata alla occorrenza sucessiva alla prima lettera uguale.
 

    #include <stdio.h>
    #include <string.h>

    int main() {
        
        char sorgente[20], ricercata[20];
        int trovata = 0;
        int i,j;
        
        printf("comunicami la stringa di partenza\n");
        scanf("%s",sorgente);
        printf("comunicami la stringa da cercare\n");
        scanf("%s",ricercata);
        
        j=0;  
        for (i=0;i<=strlen(sorgente) && trovata==0; i++) {
        
            if (j<strlen(ricercata) && sorgente[i]==ricercata[j]) {
                j++;
            } else if (j==strlen(ricercata) && ricercata[j]=='\0') { 
                trovata = 1;
            } else {
                i=i-j;  // NB: resetto il contatore al carattere successivo a quello dove le stringa sorgente e ricercata avevano iniziato ad essere uguali 
                j=0;
            }
        }
        
        if (trovata==1)
            printf("stringa trovata\n");
        else
            printf("stringa non trovata\n");
        
        return 0;
    }


## Verifica della simmetria di una matrice

Inserire i valori di una matrice di dimensioni `r` ⨉ `c`, stamparla e verificare se è
   simmetrica (in caso sia quadrata).


    #include <stdio.h>
    #include <string.h>

    #define MAXEL 30

    int main() {
        float matrice[MAXEL][MAXEL];
        int r,c;     //numero righe e colonne
        int i,j;     //contatori
        int simmetrica = 1;
        
        
        printf("quante righe? ");
        scanf("%d",&r);
        printf("quante colonne? ");
        scanf("%d",&c);
        
        for (i=0;i<r;i++) {
            for (j=0;j<c;j++) {
                printf("comunicami elemento A(%d,%d): ",i+1,j+1);
                scanf("%f",&matrice[i][j]);
            }
        }
        
        for (i=0;i<r;i++) {
            for (j=0;j<c;j++) {        
                printf("%.2f ",matrice[i][j]);
            }
            printf("\n");
        }
       
        if (r==c) {
            for (i=0;i<r-1;i++) {
                for (j=i+1;j<c;j++) {        
                    if (matrice[i][j]!=matrice[j][i]) {
                        simmetrica = 0;
                    }
                }
            }
            if (simmetrica==1) 
                printf("matrice simmetrica");
            else 
                printf("matrice non simmetrica");
            
        } else {
            printf("La matrice non è quadrata\n");
        }
        
        
    }



 [^1]: ad esempio quando sorgente = `pippo`, e ricercata = `po`





