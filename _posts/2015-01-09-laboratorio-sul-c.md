---
title: Laboratorio sul C
date: 2014-11-19 13:52:07

layout: post
category : infob 
tags : ["lezione"] 
---


# Esercizio 1

Scrivere un programma che calcoli il perimetro di un poligono (definire
la struttura poligono) descritto da `n` vertici. L’utente inserisce, in
ordine, le coordinate `X` ed `Y` di ogni vertice (l’ultimo vertice viene
connesso con il primo). Il numero dei vertici è deciso a priori (ad esempio, un poligono di 5 vertici). Il programma deve visualizzare il perimetro del poligono ottenuto collegando, in ordine, i punti inseriti.

## Ingressi e uscite

In ingresso il programma acquisisce N coppie di valori `X` e `Y` che
rappresentano i punti del poligono. In uscita deve essere stampato il perimetro del poligono.


## Esempio

Ingresso:

```
0 2

2 2

2 0

0 0
```


Uscita:

```
8
```

## Soluzione

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define N 4

struct Punto
{
    float X, Y;
};
struct Poligono
{
    struct Punto v[N];
};

int main()
{
    struct Poligono p;
    float perimetro = 0.0;
    float distEuclidea, d1, d2;
    int i;
    for (i = 0; i < N; i++)
    {
        printf("acapoInserisci vertice %d: ", i + 1);
        printf("acapo X: ");
        scanf("%f", &p.v[i].X);
        printf(" Y: ");
        scanf("%f", &p.v[i].Y);
    }
    //calcola distanza tra i punti
    for (i = 0; i < N - 1; i++)
    {
        d1 = p.v[i].X - p.v[i + 1].X;
        d2 = p.v[i].Y - p.v[i + 1].Y;
        distEuclidea = sqrt(d1 * d1 + d2 * d2);
        perimetro += distEuclidea;
    }
    //calcola distanza dell'ultimo punto
    //dal primo (chiusura del poligono)
    d1 = p.v[0].X - p.v[N - 1].X;
    d2 = p.v[0].Y - p.v[N - 1].Y;
    distEuclidea = sqrt(d1 * d1 + d2 * d2);
    perimetro += distEuclidea;
    printf("Il perimetro e’: %facapo", perimetro);
    return 0;
}
```


# Esercizio 2 

Scrivere un programma che acquisisce i dati di una matrice quadrata di
dimensione `N`, fissato a priori, che memorizza valori interi. Dopo
l’acquisizione il programma verifica se la matrice è simmetrica rispetto
alla diagonale principale (ogni elemento in posizione `i`,`j` ha uguale
valore rispetto all’elemento in posizione `j`,`i`).

Il programma visualizza la traccia della matrice (la somma degli
elementi sulla diagonale) se la matrice è simmetrica, -1 in caso
contrario, seguito dal carattere a capo ('\\n').

## Ingressi e uscite

In ingresso il programma acquisisce 25 valori interi della matrice.
In uscita, il programma visualizza ia traccia della matrice (la somma degli
elementi sulla diagonale) se la matrice è simmetrica, -1 in caso
contrario, seguito dal carattere a capo ('\\n').

## Esempio 1

Ingresso:

```
0 0 0 0 0

0 1 1 1 1

0 1 1 1 1

0 1 1 0 0

0 1 1 0 1
```


Uscita

```
3
```

## Soluzione

```c
#include <stdio.h>
#define N 5
int main(void)
{
    int flag = 1;
    int matrice[N][N];
    int i, j;
    int traccia = 0;
    for (i = 0; i < N; i++)
        for (j = 0; j < N; j++)
            scanf("%d", &matrice[i][j]);
    for (i = 0; i < N; i++)
        for (j = 0; j < N; j++)
            if (matrice[i][j] != matrice[j][i])
                flag = -1;
    if (flag != -1)
    {
        for (i = 0; i < N; i++)
            traccia = traccia + matrice[i][i];
        printf("%d", traccia);
    }
    else
        printf("%d", flag);
    return 0;
}
```


# Esercizio 3

Scrivere un programma che acquisisce: i dati di un array di numeri
interi di dimensione 20, un numero intero `x` e un numero `y` compreso tra 0
e 20 (terminando senza fare nulla in caso di valore scorretto).
I valori richiesti in ingresso sono separati da uno spazio. Il programma
verifica se nell'array sono presenti almeno `y` multipli di `x` consecutivi
e visualizza 1 se la verifica ha successo, 0 altrimenti, seguito da
'\\n'.
Si ricorda l’esistenza in *C* dell’operazione __modulo__, indicata da “%”.

## Ingressi e uscite
In ingresso il programma acquisisce i 20 valori interi dell'array, il
numero `x` e un numero `y` compreso da 0 e 20 (separati da uno spazio).

In uscita, il programma visualizza il numero 1 seguito dal carattere a capo
('\\n'), nel caso siano presenti almeno `y` multipli consecutivi di `x`
nell'array, 0 in caso contrario, seguito dal carattere a capo ('\\n').

## Esempio:

Ingressi: 

```
1 2 2 0 4 3 5 6 7 1 3 1 1 1 1 1 1 1 1 1

2 4
```

Uscita:

```
1
```


## Soluzione

```c
#include <stdio.h>
#define N 20
int main(void)
{
    int flag = 0;
    int array[N];
    int i;
    int valore, multipli;
    int counter = 0;
    for (i = 0; i < N; i++)
        scanf("%d", &array[i]);
    scanf("%d", &valore);
    scanf("%d", &multipli);
    for (i = 0; i < N; i++)
    {
        if (array[i] % valore == 0)
            counter++;
        else
            counter = 0;
        if (counter == multipli)
            flag = 1;
    }
    printf("%d", flag);
    return 0;
}

```

# Esercizio 4

Scrivere un programma che permetta di inserire le valutazioni dell’esame
di Informatica B. Il programma deve:

1.  leggere da terminale i dati di N studenti (N viene ricevuto come
    primo parametro, massimo 30 studenti) costituiti da `Nome`, `Cognome`
    e `Voto`.

2.  calcolare la media dei voti con e senza i bocciati

3.  stampare a video l’elenco degli studenti con il relativo voto,
    aggiungendo se lo studente è stato bocciato

4.  visualizzare le medie dei voti

## Ingressi e uscite

Ingressi: Il numero di utenti da inserire, Nome Cognome e Voto di ogni studente.

Uscite: 

* Nome Cognome e voto di ogni studente, seguito dalla stringa “BOCCIATO”
nel caso il voto non sia sufficiente.

* La media dei voti di tutti gli studenti.

* La media dei voti degli studenti promossi all’esame.

## Esempio 

**Ingressi**

```
Matteo Luperto 10
Matteo Ferroni 14
Vittorio Zaccaria 32
```

**Uscite**

```
Matteo Luperto 10 BOCCIATO

Matteo Ferroni 14 BOCCIATO

Vittorio Zaccaria 32

Voto medio: 16.667

Voto medio promossi: 32
```


## Soluzione

```c
#include <stdio.h>

#include <stdlib.h>

#define N 4
#define STR_DIM 40

struct studente
{
    char Nome[STR_DIM];
    char Cognome[STR_DIM];
    int Voto;
};

int main()
{
    int i, j, promossi = 0;
    float media = 0.0, media_promossi = 0.0;
    struct studente V[N];
    for (i = 0; i < n; i++)
    {
        printf("Inserisci utente.\n Nome: ");
        scanf("%s", V[i].Nome);

        printf(" Cognome: ");
        scanf("%s", V[i].Cognome);
        do
        {

            printf(" Voto: ");
            scanf("%d", &V[i].Voto);
        }
        while ((V[i].Voto < 0) || (V[i].Voto > 32));
        media += V[i].Voto;
        if (V[i].Voto >= 18)
        {
            media_promossi += V[i].Voto;
            promossi++;
        }

    }
    media /= N;
    media_promossi /= promossi;

    for (i = 0; i < N; i++)
    {
        printf("%st", V[i].Nome);
        printf("%st", V[i].Cognome);
        printf("%d", V[i].Voto);
        if (V[i].Voto < 18)
        {
            printf("tBOCCIATO");
        }
        printf("\n");
    }
    printf("\nVoto medio: %f\n", media);
    printf("\nVoto medio promossi: %f\n", media_promossi);
    return 0;
}
```


# Esercizio 5

Scrivere un programma che acquisisce una stringa di al piu' 200
caratteri, che può contentere anche numeri naturali. Il programma
calcola e visualizza la somma dei valori numerici presenti nella
stringa, seguita da un carattere a-capo ('\\n')

Per esempio, nel caso in cui il programma riceva in ingresso la stringa
"Napoleone Bonaparte e' morto il 5 Maggio del 1821", il programma
visualizza 1826, derivante da 5 + 1821.

*Nota:*

Per inserire una stringa contente degli spazi, non potete utilizzare una
singola `scanf`.

Utilizzate, al suo posto:

```c
scanf ("%[^\n]%\*c", name);
```

che vi permette di inserire, all’interno di una unica stringa di nome
“name”, più di una parola con degli spazi.

## Ingressi e uscite

In ingresso il programma riceve una stringa di al piu' 200 caratteri.
In uscita il programma visualizza un intero, seguito da un carattere a capo '\\n'.

## Esempio:

Ingresso:

```
Napoleone Bonaparte e' morto il 5/5/1821
```

Uscita:

```
1831
```


## Soluzione

```c
#include <stdio.h>
#define N 201
#define OFFSET 48
int main(void)
{
    int flag = 0;
    char stringa[N];
    int i;
    int somma = 0;
    int counter = 1;
    scanf ("%[^\n]%*c", stringa);
    for (i = strnlen(stringa) - 1; i >= 0; i--)
        if ((stringa[i] >= OFFSET) && (stringa[i] <= OFFSET + 9) )
        {
            printf("%d %c e' la codifica ascii del numero \n", stringa[i],
                   stringa[i]);
            somma += (stringa[i] - OFFSET) * counter;
            counter *= 10;
        }
        else
            counter = 1;
    printf("%d\n", somma);
    return 0;
}
```

