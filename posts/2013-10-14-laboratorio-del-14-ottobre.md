---
title: Laboratorio del 14 Ottobre
date: 2013-10-14 19:47:44

layout: post
category : infob 
tags : ["esercizi", "if-then-else", "while"] 
---




# Semplice prodotto di numeri
Scrivere un programma che chieda all'utente di inserire tre numeri interi e visualizzi il loro prodotto.

**Soluzione**:

    #include <stdlib.h>
    #include <stdio.h>

    int main(){
        int n1, n2, n3;
        int risultato;
        
        printf("Inserire 3 numeri interi\n");
        scanf("%d %d %d", &n1, &n2, &n3);
        risultato = n1 * n2 * n3;
        printf("Il prodotto dei tre numeri e' %d\n", risultato);
        return 0;
    }

# Confronto di numeri con 'if'

Scrivere un programma che legga due numeri da tastiera e stampi:

* "Almeno uno dei due numeri è maggiore di 0" oppure
* "Entrambi i numeri sono minori di 0"

a seconda del valore effettivo.

**Soluzione**:

    #include <stdio.h>
    #include <stdlib.h>

    int main()
    {
         int a,b;
         printf("Inserisci il primo numero: ");
         scanf("%d",&a);
         printf("Inserisci il secondo numero: ");
         scanf("%d",&b);
         if(a>0 || b>0) {
              printf("Almeno uno dei due numeri è maggiore di 0\n");
         }    
         else {
              printf("Tutti e 2 sono minori di zero\n");
         }
         return 0;
    }

Il confronto poteva essere anche effettuato sfruttando una delle *leggi di De Morgan*[^1] — che vedremo più avanti:

     …
     if(a<=0 && b<=0) {
          printf("Tutti e 2 sono minori di zero\n");
     }    
     else {
          printf("Almeno uno dei due numeri è maggiore di 0\n");
     }
     …

Notare che, in questo ultimo caso, i messaggi da stampare sono in ordine invertito.    

# Conversione iterativa di caratteri minuscoli in maiuscoli

Scrivere un programma C che effettui le seguenti operazioni (iterativamente!!):

 1. Leggi carattere da tastiera
 2. Se carattere uguale a 'q', termina
 3. Altrimenti converti il carattere in maiuscolo
 4. Stampa il carattere
 5. Riparti dal punto 1

**Soluzione**:

    #include <stdio.h>

    int main()
    {
        char c;

        while(1) {
            c = getchar();

            if(c == 'q') {
                return 0;
            }

            if(c >= 'a' && c <= 'z') {
                c = c - ('a' - 'A');
            }

            printf("==> %c ", c);
        }
    }

Si noti che `while(1)` è un cosiddetto *ciclo infinito* — la condizione infatti è sempre *vera* (1). 

Una soluzione che non utilizza il ciclo infinito può essere la seguente:

    …
    char c;
    int q_inserito = 0;

    while(!q_inserito)
    {
        c = getchar()

        if(c == 'q') {
            q_inserito = 1;
        }
        else 
        {
                if(c >= 'a' && c <= 'z') 
                {
                    c = c - ('a' - 'A');
                }
                printf("==> %c ", c);        
        }
    }
    …

**Modifica del 18 Ottobre 2013**:

Nell'esercizio precedente, ogni volta che si inserisce un carattere da tastiera — quando richiesto dal programma — si deve schiacciare invio. Questo provoca l'accodamento in sistema di due caratteri:

1. carattere effettivamente premuto
2. carattere di invio

Successivamente, la seguente sequenza di eventi si manifesta:

1. La prima `getchar()` consuma il carattere effettivamente inserito.

2. L'invio non viene consumato e resta in 'coda' per il ciclo successivo, dove viene letto nuovamente dalla `getchar()`

3. Nello stesso ciclo, l'invio viene stampato insieme alla stringa `==>` forzando l'andamento a capo.

È il carattere di invio che provoca il comportamento osservato della stampa.

Una soluzione al problema consiste nel consumare l'invio subito dopo la prima `getchar()`:

    #include <stdio.h>

    int main()
    {
        char c;

        while(1) {
            c = getchar();

            getchar(); // consuma il carattere di invio

            if(c == 'q') {
                return 0;
            }

            if(c >= 'a' && c <= 'z') {
                c = c - ('a' - 'A');
            }

            printf("==> %c \n", c);
        }
    }


 [^1]: la legge di De Morgan appropriata al caso e' la seguente: 

        x or y ≡ not (not (x or y)) ≡ not (not x and not y)

    da qui si capisce (!) perchè — data la condizione `a<=0 && b<=0` — bisogna stampare prima "Tutti e 2 sono minori di zero".