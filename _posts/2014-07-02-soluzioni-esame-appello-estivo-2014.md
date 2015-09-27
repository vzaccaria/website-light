---
title: Soluzioni esame appello estivo 2014
date: 2014-07-02 13:13:01

layout: post
category : infob 
tags : ["esame", "soluzione compito", "C", "Matlab"] 
---

# Esercizio 1

Scrivere un programma in linguaggio C con le seguenti caratteristiche:  

Il programma deve acquisire da tastiera due valori interi `nRighe` e `nCol`. I due valori devono essere pari, maggiori di 0 e minori di `N`, dove `N` è una costante che deve essere opportunamente definita con valore 100. L'acquisizione deve essere ripetuta finché l'utente non inserisce valori corretti.

Successivamente, il programma acquisisce da tastiera `nRighe` x `nCol` valori interi e li memorizza in una matrice `m`, di dimensioni massime `N` x `N`, organizzandoli su un numero di righe pari a `nRighe` e un numero di colonne pari a `nCol`.

Infine, considerando la matrice `m` come suddivisa in sotto-matrici 2x2, il programma deve calcolare e stampare a video il numero di sotto-matrici 2x2 con media maggiore di 10. 

**Esempio**

Per esempio, si consideri il caso in cui l'utente inserisce la seguente matrice `m`:

<div>
\begin{equation}
m = 
\left[
\begin{array}{cccccc}
3 & 20 & 4 & 5 & 2 & 7 \\\\ 
6 & 7 & 50 & 60 & 9 & 15 \\\\ 
2 & 4 & 1 & 1 & 20 & 10 \\\\ 
80 & 3 & 1 & 1 & 8 & 12 \\\\ 
\end{array}
\right]
\end{equation}
</div>

Questa matrice ha 4 righe e 6 colonne, ed è di fatto composta da 6 sotto-matrici 2x2

<div>
\begin{equation}
\left[
\begin{array}{ccc}
M_1 & M_2 & M_3 \\\\
M_4 & M_5 & M_6 \\\\
\end{array}
\right]
\end{equation}
</div>

ove, ad esempio, la sotto-matrice M_1 è pari a

<div>
\begin{equation}
M_1 = 
\left[
\begin{array}{cc}
3 & 20  \\\\
6 & 7 \\\\
\end{array}
\right]
\end{equation}
</div>

 ed ha media pari a 9. La seconda matrice (M_2) ha media 29.75, la terza 8.25, la quarta 22.25, la quinta 1 e la sesta 12.5. 

 Per questo particolare esempio, il valore che deve essere stampato a video è quindi 3 poiché solo tre sotto-matrici hanno media maggiore di 10.

**Soluzione**

```c
int main()
{
    int m[N][N], nRighe, nCol, i, j, cont = 0;
    float media;

    /* Acquisizione dei numeri di righe e colonne */
    do{
        printf("Inserire il numero di righe: ");
        scanf("%d", &nRighe);
    } while(nRighe <= 0 || nRighe >= N || (nRighe % 2 != 0));

    do{
        printf("Inserire il numero di colonne: ");
        scanf("%d", &nCol);
    } while(nCol <= 0 || nCol >= N || (nCol % 2 != 0));

    /* Acquisizione della matrice */
    for(i = 0; i < nRighe; i++){
        for(j = 0; j < nCol; j++){
            printf("Inserire l'elemento in posizione (%d, %d): ", i, j);
            scanf("%d", &m[i][j]);
        }
    }

    /* Conteggio delle sottomatrici con media maggiore di 10 */
    for(i = 0; i < nRighe; i = i + 2){
        for(j = 0; j < nCol; j = j + 2){
            media = (m[i][j] + m[i+1][j] + m[i][j+1] + m[i+1][j+1]) / 4.0;
            if(media > 10)
                cont++;
        }
    }

    printf("Ci sono %d sottomatrici con media maggiore di 10.", cont);

    return 0;
}
```



# Esercizio 2

Sia dato un array definito in Matlab e contenente le informazioni riguardanti le precipitazioni registrate da una stazione meteorologica. Ogni elemento dell'array `dati` è una `struct` che contiene un campo numerico `giorno`, un campo numerico `mese`, un campo numerico `anno`, e un campo numerico `mm` che rappresenta la quantità di pioggia (in mm) caduta nella data specificata dai precedenti campi. 

Ad esempio, per memorizzare nell'array `dati` che il 3 giugno 2013 sono stati registrati 15 mm di pioggia si avrà:

```pascal
dati(i) = struct("giorno", 3, "mese", 6, "anno", 2013, "mm", 15);
```

## Domanda 1
Scrivere una funzione Matlab `media` che riceva in ingresso l'array `dati` e un parametro numerico `anno`; la funzione deve restituire in uscita un array di 12 elementi che, sulla base del contenuto dell'array `dati`, fornisca il valore medio dei mm di pioggia in ciascun mese dell'anno solare `anno`.

```pascal
function stat = media (dati,anno) 
     for i = 1:12 
       idx = [dati.anno] == anno & [dati.mese] == i;   
       stat(i) = mean([dati(idx).mm]); 
     end
```

## Domanda 2
Scrivere una funzione Matlab di ordine superiore `mostra` che riceva in  ingresso l'array `dati`, un parametro funzione `f` e un parametro numerico `anno`. Si assuma che `f` abbia la stessa intestazione della funzione `media` alla domanda precedente. 
La funzione `mostra` deve applicare `f` all'array `dati` per calcolare una statistica mese per mese dell'anno solare specificato dal parametro `anno`; inoltre, la funzione `mostra` deve visualizzare i valori di tale statistica mensile mediante un grafico, con il mese in ascissa e il valore della statistica per ciascun mese in ordinata.

```pascal
function mostra (dati,f,anno) 
    stat = f(dati,anno); 
    plot (1:12,stat);
``` 

## Domanda 3
Scrivere un esempio di chiamata della funzione `mostra` implementata al punto precedente, con cui si vuole mostrare il grafico delle precipitazioni medie mensili dell'anno 2012, i cui valori sono contenuti in un array `dati` che deve essere caricato con i valori memorizzati in un file in formato Matlab di nome `dati`.

```pascal
load ‘dati’ dati;
mostra(dati,@media,2012);
```

\newpage 

# Esercizio 3

1.  Si determini la codifica del valore 8.0 secondo lo Standard IEEE 754-1985 a precisione singola, riportando i calcoli effettuati.
2.  Si determini la codifica del valore 0.4 secondo lo stesso standard, sempre riportando i calcoli effettuati.
3.  Si consideri il seguente programma in linguaggio C e si indichi l'effetto della sua esecuzione, motivando adeguatamente la risposta.

```c
#include <stdio.h>

int main() {
    float f;
    int i;
    
    f = 0.4;
    
    for (i = 1; i < 20; i++)
        f = f + 0.4;
    
    printf("\n\nIl numero 0.4 * 20 ");
    if (f != 8.0) printf("non ");
    printf("e' uguale a %f\n\n", 8.0);
    
    return 0;
}
```

**Soluzione**

La rappresentazione di 8 è:

    0 10000010 00000000000000000000000

Si noti che la rappresentazione è esatta, nel senso che non sono state introdotte approssimazioni. La rappresentazione di 0.4 è periodica:

    0 01111101 10011001100110011001100

Si noti che la rappresentazione è approssimata, per via del fatto che la parte frazionaria è periodica. In conclusione, viene visualizzata la scritta 

    Il numero 0.4 * 20 non e' uguale a 8.0

a causa degli errori che si accumulano durante le operazioni di somma, poiché l'addendo è rappresentato in modo approssimato, e la somma viene confrontata col numero 8.0 che invece è rappresentato in modo esatto.  




