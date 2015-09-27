---
title: Esercitazioni del 17 Ottobre 2013
date: 2013-10-18 20:51:59

layout: post
category : infob 
tags : ["esercizio", "fattoriale in C"] 
---

Ecco gli esercizi presentati da Luigi Malagò ieri a esercitazione.

# Esercizio su array

Data una sequenza di numeri inseriti dall'utente, terminata da -1,
 inserirli in un array e visualizzare successivamente solamente i numeri pari in esso contenuti.

**Soluzione:**

    #include <stdio.h>

    int main() {
        // dichiarazione variabili
        int n = 0;    // numero di elementi dell'array
        int el[100];  // array di elementi
        
        int c;        // valore corrente inserito dall'utente
        int indice;   // contatore del ciclo for
        
        // inserimento dei dati da parte dell'utente
        printf("Dato un elenco di interi separati da un invio, fino all'inserimento di -1,\n");

        printf("stampo a video gli elementi pari\n");    
        
        do {
            printf("Inserisci il %d numero ",n+1);
            scanf("%d",&c);

            // se c==-1 non inseriamo il numero nell'array

            if (c!=-1) {
                // inserimento nell'array
                el[n] = c;
                n++;
            }
        } while(c!=-1);
        
        // verifica dei numeri pari all'interno dell'array
        
        printf("Gli elementi pari sono: ");
        
        for (indice = 0; indice<n; indice++) {
            // test se il numero in posizione indice dell'array è pari
            // l'operatore % mi da il resto della divisione intera
            if (el[indice]%2==0) {
                printf("%d ",el[indice]);
            }
        }
        return 0;
    }

# Fattoriale

Scrivere una funzione per il calcolo del fattoriale[^1] di un numero intero positivo mediante successive moltiplicazioni. Il numero deve essere richiesto da tastiera ed il risultato deve essere stampato a video.

**Soluzione:**

    #include <stdio.h>
    int main() {
        // dichiarazione delle variabili
        int n = 0;  // numero di cui vogliamo calcolare il fattoriale
        int f = 1;  // fattoriale di n
        int i;      // indice del ciclo for
        
        printf("dato un intero, calcolo il suo fattoriale\n");
        printf("inserisci n: ");
        
        // inserimento del valore intero da parte dell'utente
        scanf("%d",&n); // NB: la scanf richiede l'indirizzo di memoria della variabile in cui
                        // inserire il valore che l'utente ha indicato, e quindi serve indicare la 
                        // e commerciale &
        
        
        for (i=n;i>=1;i--) {
             f=f*i;
        }
        
        // visualizzazione del risultato
        printf("Il fattoriale di %d è %d",n,f);
        return 0;
    }


# Verifica di un numero primo

Scrivere un programma per determinare se un numero è primo[^2] o meno. Il numero deve essere richiesto da tastiera ed il risultato deve essere stampato a video.

**Soluzione:**

    #include <stdio.h>

    int main() {
        // dichiarazione variabili
        int n = 0;   // numero inserito dall'utente
        int i;       // variabile indice
        int primo = 1;  // variabile per indicare se il numero è primo
        
        printf("dato un numero mi calcola se è primo o meno\n");
        printf("comunica un numero: ");

        // leggo il valore da tastiera

        scanf("%d",&n); 
        
        // calcolo se il numero è primo

        for (i=2;i<n;i++) {
            if (n%i==0) {
                // il numero non è primo
                primo = 0;
            }
        }

        if (primo==1) { 
            printf("il numero è primo");
        } else { 
            printf("il numero non è primo");
        }
        
        return 0;
    }

# Esercizio per casa

Scrivere un programma che stampi la scomposizione in fattori primi di un numero `n` richiesto da tastiera 

Ad esempio:

* 10 è scomponibile in 5 × 2
* 9  è scomponibile in 3 × 3
 

 [^1]:Il fattoriale di `n` e' definito come segue:

        n! = n × (n-1) × (n-2) × ... × 1

     Ad esempio,
        
        5! = 5 × 4 × 3 × 2 × 1 = 120 
        
 [^2]: Un numero è definito primo se è divisibile solo per 1 e per se stesso. 