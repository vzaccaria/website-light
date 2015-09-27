---
title: Esercizi su virgola fissa e mobile
date: 2014-11-07 11:23:23

layout: post
category : infob 
tags : ["lezione"] 
---

# Virgola Mobile

Dati i seguenti due numeri in codifica IEEE 754 (virgola mobile, il bit più a sinistra è ovviamente il bit di segno)

    A = 00111111100100000000000000000000

    B = 10111110000100000000000000000000

Calcolare a quanto equivale la divisione A/B (in decimale)

__Soluzione__

I numeri si differenziano solo per esponente e segno. Si puo' calcolare la divisione prendendo in considerazione solo gli esponenti:

    A = - B*2^3

Quindi:

    A/B = -8

Si puo' anche notare che:

    A =      (1+2^(-3))        =   1.125
    B = -1 * (1+2^(-3))*2^(-3) = - 0.140625

# Virgola Mobile (alt.)

Dati i seguenti due numeri in codifica IEEE 754 (virgola mobile, il bit piu' a sinistra e' di segno)

    A = 10111111100100000000000000000000

    B = 10111110100100000000000000000000

Calcolare a quanto equivale la divisione A/B (in decimale)

__Soluzione__

I numeri si differenziano solo per esponente e segno. Si puo' calcolare la divisione prendendo in considerazione solo gli esponenti:

    A = B*2^2

Quindi:

    A/B = 4

Si puo' anche notare che:

    A = -1 * (1+2^(-3))
    B = -1 * (1+2^(-3))*2^(-2)

# Virgola mobile e approssimazione 

Si consideri il seguente programma in linguaggio C:

```c
#define N -17

int main() {
   int a = N/10;
   float b = N/10.0;
   double c = N/10.0;
   double d;

   d = b;
   printf("%d %f\n",a,b+c+d);
}
```

Si assuma che i tipi delle variabili utilizzate sono codificati in binario in questo modo:

* `int`: complemento a due a 32 bit

* `float`: virgola mobile a precisione singola secondo lo standard IEEE 754-1985 (1 bit per il segno, 23 bit per la mantissa, 8 per l’esponente (K = 127))
 
* `double`: virgola mobile a precisione doppia secondo lo standard IEEE 754-1985 (1 bit per il segno, 52 bit per la mantissa, 11 per l’esponente (K = 1023))

Si risponda alle seguenti domande:

*  Qual è il valore in decimale e in binario della variabile `a` alla fine dell'esecuzione dell'ultima istruzione? 

```
a = -17/10 = -1                         (in decimale)
a = 11111111111111111111111111111111    (in binario)
```
 
* Qual è il valore in decimale e in binario della variabile `b` alla fine dell'esecuzione dell'ultima istruzione? 

```
b = -1.7                                         (in decimale)        
b = { S:1, M: .1(0110) periodico, E: 01111111 }  (in binario floating point)
```

* Considerando il risultato ottenuto al punto 2, alla fine dell'esecuzione dell'ultima istruzione le variabili `c` e `d` contengono lo stesso valore binario? 

> Il valore di un numero la cui parte frazionaria e' periodica sarà diverso a seconda che venga calcolato in precisione singola o doppia. Le variabili `c` e `d` saranno quindi differenti.

 
* La risposta al punto precedente cambierebbe se la costante `N` fosse definita pari a 10 anziché a -17?

> Per `N` pari a 10, il valore di `c` e `d` non sara' periodico (e quindi approssimato) ma esatto. In questo caso la risposta cambierebbe.


# Virgola mobile e approssimazione (alt.)

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



Siano date le seguenti definizioni di strutture dati:


    #define MAXDB 80

    typedef struct
    {
      int giorno;
      int mese;
      int anno;
    } data;

    typedef char stringa[20];

    typedef struct
    {
      data      data_di_nascita;
      int       giorno_dell_anno;
      int       codice_crimine;
      stringa   stringa_crimine;
    } arresto;

    arresto database[MAXDB];
    int arresti_per_giorno[365];


ove `database` contiene gli arresti effettuati in un determinato anno mentre `arresti_per_giorno` è una variabile array ausiliaria (i cui elementi sono inizializzati tutti a `0`) utilizzabile per i calcoli intermedi.

Scrivere una porzione di codice C che ricavi il massimo numero di arresti giornalieri dei nati nel 1979 con `codice_crimine` pari a `555`  utilizzando i dati contenuti in `database`. Si definiscano e inizializzino le eventuali altre variabili temporanee necessarie per tale calcolo. Si assuma che il database  **non sia ordinato**.

**Soluzione**

```c
int i;
int max;

for(i=0; i<MAXDB; i++)
  if(database[i].data_di_nascita.anno == 1979 &&
    database[i].codice_crimine == 555)
    arresti_per_giorno[database[i].giorno_dell_anno] += 1;

max = 0;
for(i=0; i<365; i++)
  if(arresti_per_giorno[i] > max)
    max = arresti_per_giorno[i]

printf("Massimo numero di arresti giornalieri: %d", max);
```
