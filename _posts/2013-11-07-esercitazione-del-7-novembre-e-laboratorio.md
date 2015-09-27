---
title: Esercitazione del 7 Novembre e Laboratorio
date: 2013-11-07 11:41:25

layout: post
category : infob 
tags : ["esercizio", "tabelle verità", "strutture dati in C"] 
---

# Materiale laboratorio.

Potete scaricare il materiale relativo all'ultimo laboratorio [da questo indirizzo](http://www.vittoriozaccaria.net/deposit/EsLabAggiunti.pdf).

# Tema d'esame svolto oggi con quadro bonus sulle strutture dati

## tabella della verità

Si consideri la seguente espressione booleana:

    NOT (B OR NOT A) OR (B AND NOT C)

Si compili la seguente tabella della verità (in cui 0 rappresenta il valore logico FALSO, 1 il valore VERO): 

|  A  |  B  |  C  | espressione |
| --- | --- | --- | ----------- |
|   0 |   0 |   0 |           0 |
|   0 |   0 |   1 |           0 |
|   0 |   1 |   0 |           1 |
|   0 |   1 |   1 |           0 |
|   1 |   0 |   0 |           1 |
|   1 |   0 |   1 |           1 |
|   1 |   1 |   0 |           1 |
|   1 |   1 |   1 |           0 |

Si consideri ora la condizione, scritta in linguaggio C, in cui x e y siano due variabili `int`:  

                !( (y>6) || !(x>5) ) || ( (y>6) && !(x<1) )

ottenuta dalla prima formula sostituendo la variabile A con `x>5`, la variabile B con `y>6`, la variabile C con `x<1`.


Si risponda alle seguenti domande:

1. L’espressione e’ vera o falsa quando `x=0` e `y=10`? 

   > Per x=0 e y=10, abbiamo A=falso, B=vero, C=vero per cui, dalla tabella della verità l’espressione risulta falsa

2. Se `x=3`, per quali valori di `y` l’espressione e’ vera? 

   > Se x=3 allora A=falso e C=falso. In questo caso, l’espressione è vera solo se B e’ vera quindi solo per y>6.




## Strutture dati

La descrizione delle modalità d'esame di un corso universitario recita quanto segue.

> "Durante il corso sono previste due prove scritte in itinere non obbligatorie: gli studenti possono partecipare, a loro scelta, a una o a entrambe. Se entrambe le prove sono valide e se la somma dei punteggi conseguiti è ≥ 18, lo studente ha superato l'esame del corso senza dover sostenere altre prove. Ogni prova in itinere assegna un massimo di 17 punti, e la prova in itinere è valida ai fini del superamento dell'esame solo se il voto è  ≥ 8."

    typedef char stringa[30]; 
    typedef char matricola[10];

    typedef struct { 
        stringa cognome, nome;
        matricola m;
    } datiStudente;

    typedef struct { 
        datiStudente  stud;
        int pres1, pres2; 
        int voto1, voto2;
    } datiProveStudente;

    typedef struct { 
        datiProveStudente s[300];
        int nStud; 
    } registroProveInt;

    registroProveInt registro;

1. Assumendo che la variabile `registro` sia stata già precedentemente inizializzata, si scriva un frammento di codice, dichiarando eventualmente opportune variabili aggiuntive, che stampi a schermo la matricola e i punti totali ottenuti nelle prove in itinere dagli studenti che hanno superato l'esame;

      **Soluzione**:

        int i;

        for (i=0; i<registro.nStud; i++) 
        { 
            std = registro.s[i]
            if(std.pres1 && std.pres2 && 
               std.voto1>=8 && std.voto2>=8 &&
               std.voto1 + std.voto2 >=18) 
            {
               printf("matricola %s voto %d", std.stud.m, std.voto1 + std.voto2);
            }
        }

2. Con riferimento alle seguenti ulteriori dichiarazioni di tipi e di variabili:


        typedef struct { 
            matricola m[300];
            int punti [300];
            int nStud; 
        } registroEsiti;

        registroEsiti  pos;

     si scriva una variante del codice precedente che, invece di stampare a video matricole e punteggi, li inserisca nella variabile `pos`.

     Si faccia in modo che, se tali studenti sono in numero `N` < 300, i loro dati siano memorizzati, senza discontinuità, nella parte iniziale di lunghezza `N` dell'array, e che il campo `nStud` di `pos` sia uguale a N.

    **Soluzione**:

        int i;

        pos.nStud = 0;
        for (i=0; i<registro.nStud; i++) 
          if (registro.s[i].pres1 && registro.s[i].pres2 && 
              registro.s[i].voto1>=8 && registro.s[i].voto2>=8 &&
              registro.s[i].voto1 + registro.s[i].voto2 >=18  ) {
             strcpy(pos.m[pos.nStud], registro.s[i].stud.m); /* pos.m[pos.nStud] = registro.s[i].stud.m; */
             pos.punti[pos.nStud] = registro.s[i].voto1 + registro.s[i].voto2;
             pos.nStud++;
          }



## Virgola mobile 

1. Si determini la codifica del valore 8.0 secondo lo Standard IEEE 754-1985 a precisione singola, riportando i calcoli effettuati.

    S = 0
    E = 10000010
    M = .00000000000000000000000

2. Si determini la codifica del valore 0.4 secondo lo stesso standard, sempre riportando i calcoli effettuati.

    S = 0
    E = 01111101
    M = .10011001100110011001101

3. Si consideri il seguente programma C e si indichi l'effetto della sua esecuzione, motivando adeguatamente la risposta.

        #include <stdio.h>
        main() {
          float f;  int i; 
          
          f=0.4;
          for (i=1; i<20; i++) 
            f = f+0.4;
          printf("\nIl numero 0.4*20 ");
          if (f != 8.0) printf("non ");
          printf("e' uguale a %f", 8.0);
        }

    > Il numero 0.4 ⨉ 20 non e' uguale a 8.0





## Matrici 

Il Triangolo di Tartaglia è una disposizione geometrica a forma di triangolo dei coefficienti binomiali. Un esempio di triangolo di Tartaglia di 6 righe è riportato qui sotto:

                1                
              1   1        
            1   2   1           
          1   3   3   1    
        1   4   6   4   1      
      1   5  10  10   5   1 

Possiamo rappresentare in C il triangolo di Tartaglia con una matrice triangolare come mostrato qui sotto

    1   0   0   0   0   0
    1   1   0   0   0   0            
    1   2   1   0   0   0 
    1   3   3   1   0   0
    1   4   6   4   1   0
    1   5   10  10  5   1

Una caratteristica del triangolo di Tartaglia inserito in una matrice `M` come sopra mostrato è che, per ogni riga di indice `r`  **la somma dei valori degli elementi della riga, ciascuno moltiplicato per una successiva potenza di 10, è pari all'r-sima potenza di 11.** 

Ad esempio, la riga in posizione 5 della matrice precedente e' tale che:

    1*10^0+5*10^1+10*10^2+10*10^3+5*10^4+1⋅10^5 = 161051= 11^5.

Date le seguenti definizioni:[^1]

    #define N 10
    int M[N][N];

si scriva il frammento di programma che verifichi che per ogni riga valga la condizione:

    ∑ M[r][c] x 10^c = 11^r
    c

e stampi a schermo un messaggio contenente l’esito della verifica (`si` oppure `no`).[^2]

**Soluzione**:


    #include <stdio.h>
    #include <math.h>

    #define N 10

    void main()
    {
        int M[N][N];
        int i, j, potenza;

        
        /* frammento di codice richiesto dall’esercizio */
        for(i=0;i<N;i++)
        {
            potenza=0;
            for(j=0;j<=i;j++)
                potenza=potenza+(M[i][j]*pow(10,j));
            
        }
        if(potenza != pow(11,i))
        {
            printf("Il triangolo non e' di Tartaglia");
        }
    }
    printf("Il triangolo potrebbe essere di Tartaglia");

 [^1]: N e' quindi la dimensione della matrice. 
 [^2]: Non è necessario costruire o acquisire da tastiera la matrice `M`: si assuma che sia già stata inizializzata precedentemente. 
Per il calcolo delle potenze utilizzare la funzione di libreria `pow(a,b)` che calcola `a^b`