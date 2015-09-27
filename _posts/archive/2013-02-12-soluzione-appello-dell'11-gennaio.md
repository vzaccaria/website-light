---
title: Soluzione appello dell'11 Febbraio
date: 2013-02-12 10:54:25

layout: post
category : infob 
tags : ["lezione", "esami", "esempi"] 
---




### Esercizio 1

Una fattoria gestisce una stalla con 10 mucche, ciascuna identificata da un codice alfanumerico di 8 caratteri. Il gestore della fattoria vuole realizzare un programma in linguaggio C che consenta la contabilizzazione del latte prodotto ogni mese e voi siete stati incaricati di scriverlo in quanto esperti di C. 

Definite in C il tipo `ProduzioneGiornaliera` che rappresenti in modo comprensivo la quantità di latte prodotta ogni giorno del mese da ognuna delle 10 mucche della stalla. Ricordate che la quantità di latte prodotta è espressa in **litri** e che la produzione giornaliera deve essere associata al codice identificativo della mucca. Inoltre potete definire altri tipi per semplificare la definizione di `ProduzioneGiornaliera`.

{% highlight c %}
/* numero di prelevamenti di latte (10 mucche per 30 giorni) */
#define N (10 * 30) 

typedef char stringa[8];

typedef struct { 
    stringa codice_mucca; 
    float   litri_di_latte; 
    int     giorno_del_mese;
} ProduzionePerMucca;

typedef ProduzionePerMucca ProduzioneGiornaliera[N];
{% endhighlight %}

Data la seguente dichiarazione di variabile:
 
    ProduzioneGiornaliera produzione;
    
Si scriva il frammento di programma C che stampi a video la quantità complessiva di latte prodotta nella stalla il 7 Gennaio, assumendo che la variabile produzione sia stata opportunamente inizializzata con le produzioni del mese di Gennaio.

{% highlight c %}
float tot = 0;
for (i  = 0; i < N; i++)
{
    if (produzione[i].giorno_del_mese == 7)
      tot += produzione[i].litri_di_latte;
}

printf(“\n\tProduzione totale %f”, tot);
{% endhighlight %}

### Esercizio 2

Le strade della città di **Grigliopoli** sono organizzate come una griglia (alcune strade attraversano la città da est a ovest e altre da nord a sud). 

Dati due incroci che distano `X` isolati lungo l'asse est-ovest della città e `Y` isolati lungo l'asse nord-sud, siete stati incaricati di calcolare il numero di percorsi a distanza minima che collegano i due incroci. 

Nell’esempio qui sotto, vengono mostrati i 3 percorsi a distanza minima che collegano due incroci `A` e `B` caratterizzati da una distanza lungo l'asse `X` di 2 e lungo l'asse `Y` di 1:

              X
        *   *   *   *               *   *   *   *               *   *   *   *
          A-------+                   A---+                       A 
    Y   *   *   * | *               *   * | *   *               * | *   *   *
                  B                       +---B                   +-------B      
        *   *   *   *               *   *   *   *               *   *   *   *
             (1)                         (2)                         (3)


Il vostro obiettivo e' di implementare **una funzione ricorsiva** `calcola` in Matlab/Octave che ricevuti `X` e `Y` in ingresso restituisce il numero totale di percorsi corrispondenti. Ovvero, nell'esempio di sopra `calcola(2,1)` deve ritornare 3. 

> **Suggerimento**: Quando `X` = 0 o `Y` = 0, c’è soltanto un cammino a distanza minima che collega i due incroci. Altrimenti, esiste più di un cammino minimo dal momento che è possibile sia avvicinarsi alla destinazione lungo l’asse est-ovest (riducendo quindi la distanza `X`) oppure avvicinarsi lungo l’asse nord-sud (riducendo la distanza `Y`)

{% highlight matlab %}
function [ p ] = calcola(x,y)
    if (x == 0 || y == 0)
    p = 1;
    else
    p = calcola(x-1,y) + calcola(x,y-1);
    end
{% endhighlight %}

### Esercizio 3 

Si consideri il seguente programma in linguaggio C:

{% highlight c %}
#define N -17

int main() {
   int a = N/10;
   float b = N/10.0;
   double c = N/10.0;
   double d;

   d = b;
   printf("%d %f\n",a,b+c+d);
}

{% endhighlight %}
Si assuma che i tipi delle variabili utilizzate sono codificati in binario in questo modo:


* `int`: complemento a due a 32 bit

* `float`: virgola mobile a precisione singola secondo lo standard IEEE 754-1985 (1 bit per il segno, 23 bit per la mantissa, 8 per l’esponente (K = 127))
 
* `double`: virgola mobile a precisione doppia secondo lo standard IEEE 754-1985 (1 bit per il segno, 52 bit per la mantissa, 11 per l’esponente (K = 1023))

Si risponda alle seguenti domande:

*  Qual è il valore in decimale e in binario della variabile `a` alla fine dell'esecuzione dell'ultima istruzione? 

        a = -17/10 = -1                         (in decimale)
        a = 11111111111111111111111111111111    (in binario)

 
* Qual è il valore in decimale e in binario della variabile `b` alla fine dell'esecuzione dell'ultima istruzione? 

        b = -1.7                                         (in decimale)        
        b = { S:1, M: .1(0110) periodico, E: 01111111 }  (in binario floating point)
 
* Considerando il risultato ottenuto al punto 2, alla fine dell'esecuzione dell'ultima istruzione le variabili `c` e `d` contengono lo stesso valore binario? 

> Il valore di un numero la cui parte frazionaria e' periodica sarà diverso a seconda che venga calcolato in precisione singola o doppia. Le variabili `c` e `d` saranno quindi differenti.

 
* La risposta al punto precedente cambierebbe se la costante `N` fosse definita pari a 10 anziché a -17?

> Per `N` pari a 10, il valore di `c` e `d` non sara' periodico (e quindi approssimato) ma esatto. In questo caso la risposta cambierebbe.
