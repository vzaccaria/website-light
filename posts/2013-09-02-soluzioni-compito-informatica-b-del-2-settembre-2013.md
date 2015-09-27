---
title: Soluzioni compito Informatica B del 2 Settembre 2013
date: 2013-09-02 14:50:54

layout: post
category : infob 
tags : ["esame", "strutture dati in C", "ricorsione in Matlab"] 
---

L'esame orale si terrà Venerdí 6 Settembre alle ore 14:00 in aula PT1 al DEIB (piano terra).

### Esercizio 1

La compagnia telefonica TT, utilizza le seguenti strutture dati per memorizzare i dati delle chiamate effettuate dai propri 100 clienti **nell'ultimo mese**:

    #define MAX 1000
    typedef char stringa[50];
    typedef struct
    {
        int ora;    // ora di inizio della chiamata telefonica (da 0 a 23)
        int minuti; // minuti di inizio della chiamata telefonica (da 0 a 59)
        int durata; // durata della chiamata telefonica in secondi
    } chiamata;
    
    typedef struct
    {
        stringa CF;      //codice fiscale del cliente
        int n;           //numero chiamate effettuate dal cliente nell'ultimo mese
        chiamata c[MAX]; //chiamate effettuate dal cliente nell'ultimo mese
    } cliente;
    
    // database dei 100 clienti della compagnia
    cliente db[100];

Si ipotizzi che le telefonate abbiano il seguente costo:

- le telefonate iniziate dalle 22:00 alle 07:59 (estremi inclusi) hanno un costo di **0.005 euro al secondo** 

- tutte le altre costano **0.01 euro al secondo**

Si dichiarari un array di 100 `float` di nome `bolletta` e si scriva un frammento di codice C che riempia `bolletta`, in modo tale che la posizione `i`-esima di bolletta contenga il costo complessivo delle chiamate effettuate dal cliente `i`-esimo nell'ultimo mese:

**Spazio soluzione:**

    float bolletta[100];
    int i, j, ora;

    for (i = 0; i < 100; i++)
    {
         bolletta[i] = 0;
         for (j = 0; j < db[i].n; j++)
         {
              ora = db[i].c[j].ora;
              if (ora >= 22 || ora < 8)          
                   bolletta[i] += db[i].c[j].durata * 0.005;
              else
                   bolletta[i] += db[i].c[j].durata * 0.01;
         }
    }



Si dichiarari un array di nome `premium` contenente elementi di tipo `cliente` e riempirlo (senza lasciare spazi vuoti) con i dati dei clienti che hanno speso **più di 100 euro** nel corso dell'ultimo mese. Si noti che i dati dei clienti si trovano nella variabile `db` dichiarata sopra.

**Spazio soluzione:**

    cliente premium[100];
    int i, k=0;

    for (i = 0; i < 100; i++)
         if (bolletta[i] > 100)
            premium[k++] = clienti[i];

### Esercizio 2

Il codice ISBN è una sequenza numerica di 13 cifre usata internazionalmente per la classificazione dei libri. 
L'ultima cifra del codice ISBN svolge una funzione di controllo e viene calcolata con il seguente algoritmo:

* si moltiplica ognuna delle prime 12 cifre per un peso definito in base alla posizione della cifra stessa nella sequenza: la prima cifra si moltiplica per 1, la seconda per 3, la terza per 1, la quarta per 3 e così via

* si sommano i risultati delle 12 moltiplicazioni

* si divide la somma per 10 e si prende il resto della divisione

* si sottrae il resto della divisione da 10: la cifra che si ottiene è la cifra di controllo, ovvero la 13-esima cifra del codice ISBN.


Si risponda ai seguenti quesiti:

1. Implementare in linguaggio Matlab una funzione `controllo` che riceve in ingresso un vettore numerico contenente le prime 12 cifre di un codice ISBN e ritorna la corrispondente 13-esima cifra di controllo.

    Esempio:

        controllo([9 7 8 8 8 4 3 0 2 5 3 4])
        
    ritorna 3 poichè: 
    
        9*1 + 7*3 + 8*1 + 8*3 + 8*1 + 4*3 + 3*1 + 0*3 + 2*1 + 5*3 + 3*1 + 4*3 = 117
        117 mod 10 = 7
        10 - 7 = 3
    
    **Spazio soluzione:**
    
        function c = controllo(a)
             s = sum(a(1:2:12)) + sum(3 * a(2:2:12));
             c = 10 - mod(s,10);

2. Implementare in linguaggio Matlab una funzione `verifica` che riceve in ingresso un vettore numerico contenente le 13 cifre di un codice ISBN e ritorna `true` se la cifra di controllo è corretta, `false` altrimenti.

    Esempio:

        verifica([9 7 8 8 8 4 3 0 2 5 3 4 3]) 

    ritorna `true` dato che, come visto sopra, la cifra di controllo corretta per l’input considerato è 3.

    **Spazio soluzione:**
    
        function r = verifica(a)
             r = a(13) == controllo(a(1:12));


### Esercizio 3

Si consideri la seguente funzione in codice Matlab:

    function r = f(a)
    
        if a == 0
          r = [];
        else
          r = [f(floor(a/2)) mod(a,2)];
        end

1. Qual è il valore ritornato dalla chiamata `f(5)`?

    **Spazio soluzione:**
    
    Valore risultante: `[1 0 1]`

2. Qual è il valore ritornato dalla chiamata `f(10)`?

    **Spazio soluzione:**
    
    Valore risultante: `[1 0 1 0]`


3. Ipotizzando che la funzione `f(a)` venga chiamata con un argomento a intero e positivo, descrivere sinteticamente cosa calcola la funzione

    **Spazio soluzione:**

    La funzione `f(a)` calcola le cifre della codifica binaria del numero `a`.  
        
