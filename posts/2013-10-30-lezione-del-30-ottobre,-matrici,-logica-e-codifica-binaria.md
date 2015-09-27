---
title: Lezione del 30 ottobre, matrici, logica e codifica binaria
date: 2013-10-30 12:47:13

layout: post
category : infob 
tags : ["lezione"] 
---


# Matrici 

Oggi abbiamo visto un esempio completo di dichiarazione di matrice (array bidimensionale) consistente in:

* riempimento di una matrice `m` di valori richiesti da tastiera
* calcolo della trasposta `r` 
* stampa a video del risultato

ecco il codice:

    #include <stdio.h>

    #define RIGHE   3
    #define COLONNE 3

    typedef float matrice[RIGHE][COLONNE];


    int main()
    {
        matrice m;
        matrice r;
        int x,y;

        for(x=0; x<RIGHE; x++)
        {
            for(y=0; y<COLONNE; y++)
            {
                printf("Inserisci elemento in riga (%d) e colonna (%d): ", x, y);
                scanf("%f", & m[x][y] );
            }
        }

        for(x=0; x<RIGHE; x++)
        {
            for(y=0; y<COLONNE; y++)
            {
                r[y][x] = m[x][y];
            }
        }

        printf("Risultato: \n");
        for(x=0; x<RIGHE; x++)
        {
            for(y=0; y<COLONNE; y++)
            {
                printf(" %f ", r[x][y]);
            }
            printf("\n");
        }

        printf("Matrice originaria: \n");
        for(x=0; x<RIGHE; x++)
        {
            for(y=0; y<COLONNE; y++)
            {
                printf(" %f ", m[x][y]);
            }
            printf("\n");
        }
        return 0;
    }

# Algebra booleana

Successivamente abbiamo riassunto gli operatori logici visti fino ad ora: ‖

| Operatore logico | simbolo | esempio |
| ---------------- | ------- | ------- |
| AND              | &&      | a && b  |
| OR               | ‖      | a ‖ b   |
| NOT              | !       | !a      |

con la loro semantica:

|  a  |  b  | a && b | a ‖ b |  !a |
| --- | --- | ------ | ----- | --- |
|   0 |   0 |      0 |     0 |   1 |
|   0 |   1 |      0 |     1 |   1 |
|   1 |   0 |      0 |     1 |   0 |
|   1 |   1 |      1 |     1 |   0 |

Le proprietà che caratterizzano gli operatori visti sono le seguenti:

* **Proprietà associativa** (OR — vale anche per AND):

        f(a,b,c) =   a ‖ (b  ‖ c)  = 
                    (a ‖  b) ‖ c  

* **Proprietà commutativa** (OR — vale anche per AND):

        f(a,b) = a ‖ b = b ‖ a

* **Proprietà distributiva**: 

        f(a,b,c) = a && (b ‖ c)  = a && b ‖ a && c

    analogo a ciò che succede nell'algebra numerica:

                   a ⨉ (b + c)   = a ⨉ b + a ⨉ c 

* **Legge dell'elemento 1**:

        !a ‖ a = 1

* **Proprietà (o leggi) di De Morgan**: 

        ! ( a && b )   =    !a ‖  !b
        ! ( a ‖  b )    =   !a && !b

* **Proprietà dell'assorbimento**:

        a ‖ b && a = a


La proprietà dell'assorbimento può essere dimostrata con la seguente tabella della verità:

|  a  |  b  | a ‖ b && a |
| --- | --- | ---------- |
|   0 |   0 |          0 |
|   0 |   1 |          0 |
|   1 |   0 |          1 |
|   1 |   1 |          1 |

## Codifica binaria

Il materiale relativo alla codifica binaria [può essere trovato a questo indirizzo](http://www.vittoriozaccaria.net/deposit/codifica_binaria.pdf).

## Questionario

Anonimo:

<div class="iframe-wrapper"> 
    <iframe id="fs-survey-iframe" class="iframe-content" src="http://fluidsurveys.com/surveys/vittorio-HFF/lezione-del-30-ottobre/" scrolling="no" frameborder="0" >.
    </iframe>
</div>



