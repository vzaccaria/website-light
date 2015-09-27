---
title: Laboratorio sul C e tabelle della verità
date: 2014-11-11 21:04:16

layout: post
category : infob 
tags : ["laboratorio", "tabelle della verità"] 
---

# Laboratorio di C - Triangoli

Nel laboratorio di oggi dovevate disegnare una fila di triangoli di altezza prefissata, disegnati in due modi, come negli esempi qui riportati.

**6 triangoli, di altezza pari a 10**

![](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/lab-images/image01.png)

**4 triangoli di altezza pari a 5**

![](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/lab-images/image02.png)

Il programma dovrà ricevere come parametri in ingresso il numero di triangoli e la loro altezza. Un triangolo su due dovrà essere disegnato con una casella vuota su due.

Ecco la soluzione:

```c
#include <stdio.h>

int main(void) {
    int altezza;
    int triangoli;
    int base, spazio, asterischi;


    printf("Inserisci altezza: ");
    scanf("%d", & altezza);

    printf("Inserisci numero di triangoli: ");
    scanf("%d", & triangoli);

    base = 2*(altezza - 1) + 1;
    spazio = altezza - 1;
    asterischi = 1;
    
    int r=0;
    int t=0;
    int a;
    int s;
    while(r<altezza) {
        t = 0;
        int pieno = 1;
        while(t < triangoli) {
            /* Stampa spazio */
            s=0;
            a=0;
            while(s<spazio) {
                printf(".");
                s++;
            }
            while(a<asterischi) {
                if(!pieno) {
                    if(!(a % 2)) {
                        printf("*");
                    }
                    else {
                        printf(".");
                    }
                    pieno = 1;
                }
                else {
                    printf("*");
                    pieno = 0;
                }
                a++;
            }
            s = 0;
            while(s<spazio) {
                printf(".");
                s++;
            }
            printf(".");
            t++;
        }
        printf("\n");
        r = r + 1;
        asterischi += 2;
        spazio = spazio - 1;
    }
    return 0;
}
```

## Tabella della verità

Questo è un altro esercizio riguardante le tabelle della verità, non fatto oggi a lezione.

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



# Matrici e sottomatrici

Scrivere un programma in linguaggio C con le seguenti caratteristiche:  

Il programma deve acquisire da tastiera due valori interi `nRighe` e `nCol`. I due valori devono essere pari, maggiori di 0 e minori di `N`, dove `N` è una costante che deve essere opportunamente definita con valore 100. L'acquisizione deve essere ripetuta finché l'utente non inserisce valori corretti.

Successivamente, il programma acquisisce da tastiera `nRighe` x `nCol` valori interi e li memorizza in una matrice `m`, di dimensioni massime `N` x `N`, organizzandoli su un numero di righe pari a `nRighe` e un numero di colonne pari a `nCol`.

Infine, considerando la matrice `m` come suddivisa in sotto-matrici 2x2, il programma deve calcolare e stampare a video il numero di sotto-matrici 2x2 con media maggiore di 10. 

**Esempio**

Per esempio, si consideri il caso in cui l'utente inserisce la seguente matrice `m`:

$$
m = 
\\left[
\\begin{array}{cccccc}
3 & 20 & 4 & 5 & 2 & 7 \\\\
6 & 7 & 50 & 60 & 9 & 15 \\\\
2 & 4 & 1 & 1 & 20 & 10 \\\\
80 & 3 & 1 & 1 & 8 & 12 \\\\
\\end{array}
\\right]
$$

Questa matrice ha 4 righe e 6 colonne, ed è di fatto composta da 6 sotto-matrici 2x2

$$
\\left[
\\begin{array}{ccc}
M_1 & M_2 & M_3 \\\\
M_4 & M_5 & M_6 \\\\
\\end{array}
\\right]
$$

ove, ad esempio, la sotto-matrice $M_1$ è pari a

$$
M_1 = 
\\left[
\\begin{array}{cc}
3 & 20  \\\\
6 & 7 \\\\
\\end{array}
\\right]
$$

 ed ha media pari a 9. La seconda matrice ($M_2$) ha media 29.75, la terza 8.25, la quarta 22.25, la quinta 1 e la sesta 12.5. 

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


# Massimi locali

Si scriva un programma in linguaggio C per individuare le posizioni dei massimi locali all’interno di in un vettore `v` (contenente numeri in virgola mobile) — un elemento dell’array è un massimo locale **se è maggiore dell’elemento precedente e seguente**.[^1] 

Le posizioni dei massimi locali devono essere salvate in un secondo vettore `pos`. In particolare il programma dovrà:

1. Richiedere all’utente quanti numeri intende inserire (massimo 100).
2. Richiedere  all'utente tali numeri e salvarli nel vettore `v`
3. Scandire `v` e salvare in `pos`, senza lasciare buchi, gli indici dei massimi locali. Le posizioni dei massimi locali sono date dagli indici dell’array corrispondenti ai massimi locali. 



## Esempio di massimo locale
Si assuma che il vettore v contenga 12 elementi:

    v = 1, 4, 3, 5, 5, 7, 3, 12, 12, 4, 1, 100

i massimi locali sono:

*  all'indice numero 1 (poiche' 4 è maggiore sia di 1 che di 3)
*  all'indice numero 5 (poiche' 7 è maggiore sia di 5 che di 3).

**Soluzione**:

```c
#include <stdio.h>
#define N 100
void main()
{
    float v[N];
    int pos[N];
    int i, j, n;
    float temp;

    do
    {
        printf("\ninserire n: ");
        scanf("%d", &n);
    } while(n<0 || n > N);

    for(i = 0; i < n; i++)
    {
        printf("\n v[%d] = ", i);
        scanf("%f", &v[i]);
    }

    n = i;
    j = 0;
    for(i = 1; i < n - 1; i++)
    {
        if(v[i] > v[i - 1] && v[i] > v[i + 1])
            {
                pos[j] = i;
                j++;
            }
    }

printf("\n");
for(i = 0; i < j; i++)
    printf(" %d ", pos[i]);
}
```

