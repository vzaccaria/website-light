---
title: Esercitazione del 24 Ottobre 2013
date: 2013-10-28 20:23:23

layout: post
category : infob 
tags : ["esercizio", "fibonacci in C", "strutture dati in C"] 
---

In ritardo ormai cronico, ecco gli esercizi fatti da Luigi giovedi' scorso.

# Calcolo della serie di Fibonacci

Scrivere un programma per generazione dei primi n numero della serie di fibonacci (inserito dall'utente):

Matematicamente, il calcolo del numero di *fibonacci* e' definibile come:[^1]

<div>
\[
f(n) = 
\begin{cases} 
f(n-1) + f(n-2) , ~n \geq 2 \\
1 , ~n = 1 \\
0 , ~n = 0
\end{cases}
\]
</div>

ecco la soluzione:

    #include <stdio.h>

    int main() {
        int n = 0;
        int i = 0;         

        /* le seguenti corrispondono a F(n), F(n-1), F(n-2) */
        int fn, fn1, fn2;  

        printf("inserisci un intero n: ");
        scanf("%d",&n);
        
        if (n==0)                
            printf("0 ");
        else   
            if (n==1)             
                printf("0 1");
            else if (n>1) {     
                printf("0 1");
                
                fn2 = 0;          
                fn1 = 1;

                for (i=2;i<=n;i++) {  

                    fn = fn1 + fn2;
                    printf(" %d",fn);
                    fn2 = fn1;
                    fn1 = fn;

                } /* Fine for */
            } /* Fine if n>1 */
        return 0;
    }

# Stringhe palindrome

Data una stringa (richiesta all'utente) verificare se è palindroma (cioè se letta da **sinistra a destra** è uguale ad essere letta da **destra a sinistra**).

Soluzione: 

    #include <stdio.h>

    int main() {
        char stringa[20];   
        int i;               
        int palindroma = 1;  
        
        printf("Comunicami una stringa: ");

        /* La & commerciale non e' necessaria nel caso 
           delle stringhe */

        scanf("%s",stringa);

        printf("La stringa che hai comunicato è: %s\n",stringa);

        
        for (i=0;i<strlen(stringa)/2 && palindroma==1;i++) {
            if (stringa[i]!=stringa[strlen(stringa)-1-i]) {
                palindroma = 0;
            }
        }
        
        if (palindroma) 
            printf("la stringa è palindroma");
        else
            printf("la stringa non è palindroma");
        return 0;
    }

# Calcolo della distanza dei punti su un piano cartesiano

Scrivere un programma per il calcolo della distanza tra due punti nel piano cartesiano.

Le coordiante sono date dall'utente e ciascun punto è memorizzato in un tipo definito dallo sviluppatore chiamato `tPunto`.

Soluzione: 

    #include <stdio.h>
    #include <math.h>

    typedef struct {    
        float ascissa;
        float ordinata;
    } tPunto;

    int main() {
        tPunto x;    
        tPunto y;
        float distanza;
        
        printf("Comunica le coordiante del primo punto, separate da spazio: ");

        scanf("%f %f",&x.ascissa,&x.ordinata);

        printf("Comunica le coordiante del secondo punto, separate da spazio: ");

        scanf("%f %f",&y.ascissa,&y.ordinata);
        
        distanza = sqrt((x.ascissa-y.ascissa)*(x.ascissa-y.ascissa)+
                        (x.ordinata-y.ordinata)*(x.ordinata-y.ordinata));
        
        printf("La distanza tra (%.2f,%.2f) e (%.2f,%.2f) è %.2f",x.ascissa,x.ordinata,y.ascissa, y.ordinata, distanza);
        
        
    }

# Scrivere una stringa al contrario

Leggere una stringa da terminale e ristamparla al contrario.

**Soluzione**:

    #include <stdio.h>

    int main() {
        char stringa[20];    
        int i;              
        
        printf("Comunicami una stringa: ");
        scanf("%s",stringa);                
        
        printf("La stringa che hai comunicato è: %s\n",stringa);
        printf("La stringa al contrario è: ");
        
        i=strlen(stringa)-1;
        while (i>=0) {
            printf("%c",stringa[i]);   // stampo un carattere alla volta e non la stringa intera
            i--;
        }
        return 0;
    }
 
 [^1]: La definizione ricorsiva è una delle più semplici e famose. 