---
title: Codifica binaria
date: 2014-11-04 19:16:12

layout: post
category : infob 
tags : ["lezione", "codifica binaria"] 
---


# Stringa palindroma

Ecco l'esercizio sul riconoscimento di una stringa palindroma che abbiamo visto all'inizio della lezione:

<script src="http://ideone.com/e.js/Da06fw" type="text/javascript" ></script>

# Codifica binaria

Il materiale sulla teoria della codifica binaria [può essere trovato a questo indirizzo](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/codifica_binaria.pdf).

## Esercizio su complemento a due

Si definisca il minimo numero di bit necessari per rappresentare in complemento a 2 tutti i seguenti valori interi:

| numero | bit minimi | codifica    |
| :----: | :--------: | ----------: |
| 149    | 9 in C2    | 010010101   |
| 108    | 8 in C2    | 01101100    |
| 12     | 5 in C2    | 01100       |
| 42     | 7 in C2    | 0101010     |
| 92     | 8 in C2    | 01011100    |


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


## Esercizio su Virgola fissa

Si definisca il numero minimo di bit per rappresentare in virgola fissa C2 i seguenti numeri e si ricavi la codifica equivalente:

* 2 
* 0.25
* -2
* -2.25


**Soluzione**:


| Numero (decimale) |                    bit minimi                   | Codifica binaria del numero |
|:-----------------:| ----------------------------------------------- | ---------------------------:|
|                 2 | 3 (3 per parte intera, 0 per parte frazionaria) |                         010 |
|              0.25 | 3 (1 per parte intera, 2 per parte frazionaria) |                        0.01 |
|                -2 | 2 (2 per parte intera, 0 per parte frazionaria) |                          10 |
|             -2.25 | 5 (3 per parte intera, 2 per parte frazionaria) |                      101.11 |

Nota che: 

* il punto nella codifica serve a separare la rappresentazione in parte intera e frazionaria
* per numeri puramente frazionari (e.g. 0.25) utilizziamo comunque 1 bit per la parte intera.

## Esercizio su Virgola fissa n. 2

Si rappresenti il numero 0.2 e si stabilisca se tale rappresentazione è esatta e, nel caso non lo fosse spiegare il perchè:

**Spazio soluzione:**

Se calcoliamo la codifica manualmente:

    0.2 ⨉ 2 = 0.4
    0.4 ⨉ 2 = 0.8
    0.8 ⨉ 2 = 1.6 
    0.6 ⨉ 2 = 1.2 
    0.2 ⨉ 2 = 0.4 <- uguale alla prima moltiplicazione

Notiamo che non arriveremo mai ad una rappresentazione esatta del numero. Esso sara' infatti rappresentato da una sequenza infinita di 

    001100110011001100110011..



## Esercizio su Virgola fissa n. 3 


Di seguito, viene convertito il numero -123.21 in virgola fissa complemento a due, con due metodi:

* Metodo tradizionale (visto a lezione).
* Metodo del fattore di scala.

La conversione verra' effettuata usando 8 bit come parte intera (in complemento a 2) e
6 bit come parte decimale.
<!-- more start -->

### Metodo tradizionale:

Conversione tradizionale di -123.21 in virgola fissa con 8 bit parte intera e 6 decimale:

* Converto -123 (valore assoluto e poi opposto in C2):

        123:2 (resto) 1
         61:2 (resto) 1
         30:2 (resto) 0
         15:2 (resto) 1
          7:2 (resto) 1
          3:2 (resto) 1
          1:2 (resto) 1
          0

    * 123 =  1111011 (binario naturale)
    * +123 = 01111011 (complemento a 2 positivo)
    * -123 = **10000101** (risultato dell'inversione di 01111011 e della somma di 1)

* Converto -0.21 (valore assoluto e poi opposto in C2):

         0,21 x 2 = 0,42
         0,42 x 2 = 0,84
         0,84 x 2 = 1,68
         0,68 x 2 = 1,36
         0,36 x 2 = 0,72
         0,72 x 2 = 1,44
         0,44 x 2 = 0,88
         0,88 x 2 = 1,76
         0,76 x 2 = 1,52
         0,52 x 2 = 1,04
         0,04 x 2 = 0,08
         0,08 x 2 = 0,16
         ......

    * 0,21 = ,001101 (valore frazionario approssimato su 6 bit, approssimato)

    * prima di calcolare il valore negativo bisogna estendere il segno di ,001101 (indicato con le parentesi):

    * (0),001101 = 0.21 su 7 bit in C2 (il primo bit e' il peso di -2^0 e rappresenta, di fatto, il suo segno)

    * e calcolare l'opposto come se fosse un numero C2 tradizionale:

    * (1),110010 + (0),000001 = **(1),110011** (valore di -0,21 su 7 bit, approssimato)

* Per fare la somma di -0.21 e -123 bisogna estendere il segno di -0.21 (su 14 bit): (11111111),110011

* La somma finale di -0.21 e -123 (su 14 bit):

```
-0.21 = (11111111), 110011
-123  =  10000101 , 000000
~~~~~~~~~~~~~~~~~~~~~~~~~~
10000100 , 110011
```

* Risultato: **10000100,110011**


### Metodo del fattore di scala

Conversione di -123.21 in virgola fissa con 8 bit parte intera e 6 decimale:

* -123.21 x 64 = - 7885,44

* Converto prima il valore assoluto 7885 in binario e poi lo nego:

        7885:2 (resto) 1
        3942:2 (resto) 0
        1971:2 (resto) 1
        985 :2 (resto) 1
        492 :2 (resto) 0
        246 :2 (resto) 0
        123 :2 (resto) 1
        61  :2 (resto) 1
        30  :2 (resto) 0
        15  :2 (resto) 1
        7   :2 (resto) 1
        3   :2 (resto) 1
        1   :2 (resto) 1
        0

    * 7885 = 01111011001101
    * -7885 = 10000100110010 + 1 = **10000100110011**

* **Conclusione**: approssimazione migliore possibile su 14 bit di -123,21:

  **10000100,110011**

* **Controllo**, quanto vale 10000100,110011:

    * -128+4 = -124
    * 1/2+1/4+1/32+1/64 = 0,796875
    * -124+0,796875 = **-123.203125**
    * Errore di approssimazione: 0.007

* Il risultato e' **identico** a quello trovato col metodo tradizionale.
<!-- more end -->



