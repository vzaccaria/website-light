---
title: Laboratorio su matlab
date: 2015-01-30 11:20:05

layout: post
category : infob 
tags : ["lezione"] 
---



# Esercizio 1

Definire una funzione `controlla_riga` che accetta in ingresso un array di dimensione 1x9. La funzione restituisce 1 se tutti gli elementi dell'array sono compresi tra 1 e 9, altrimenti restituisce 0 (anche se l'array in ingresso ha dimensione diversa da 1 x 9).

Estendere la funzione precedente con il seguente ulteriore requisito: la funzione restituisce 0 anche se nell'array vi sono elementi duplicati, altrimenti restituisce 1.

__Esempio__: `controlla_riga([3 2 1 4 7 6 5 9 8]) = 1` mentre `controlla_riga([9 2 1 4 7 6 5 9 8]) = 0` (il 9 compare due volte). 

__Suggerimento__: potrebbe essere utile prima ordinare il vettore con l'istruzione `sort(vettore)`.


## Soluzione:

```matlab
function [res] = controlla_riga(riga)
% res = 0 -> proprieta' NON soddisfatta
% res = 1 -> proprieta' soddisfatta
res = 0;


%controllo che la dimensione sia giusta
[r,c]=size(riga);
if (~(r == 1 && c == 9))
    return;
end

ordinato = sort(riga);

if(all(ordinato == 1:9))
    res = 1;
else
    res = 0;
end
```

# Esercizio 2 
Definire una funzione che verifica la correttezza di una soluzione del gioco del sudoku semplificato. Nel sudoku semplificato una soluzione è rappresentata da una matrice 9x9 in cui per ogni riga e colonna della matrice valgono le seguenti proprietà:

* Gli elementi sono numeri interi nell'intervallo [1,9]. 
 
* Non ci sono ripetizioni

NB: Per risolvere il problema utilizzate la funzione definita nell'esercizio precedente.



## Soluzione:

```matlab
function [res] = sudoku_semplificato(M)
% res = 0 -> proprieta' NON soddisfatta
% res = 1 -> proprieta' soddisfatta
res = 0;

%controllo la dimensione
[r,c] = size(M);
if(~(r==9 && c == 9))
    return;
end


for i=1:9
    %controllo la riga (i)
    riga = controlla_riga(M(i,1:9));    
    %controllo la colonna (i)
    colonna = controlla_riga(M(1:9,i)');
    if (riga+colonna < 2)
        return;
    end
end
res = 1;

```


# Esercizio 3

Definire una funzione che verifica la correttezza di una soluzione del gioco del sudoku classico. Una soluzione nel sudoku classico rispetta le proprieta' elencate nell'esercizio precedente piu' la seguente proprietà:

* Dividendo la matrice soluzione 9x9 in 9 sottomatrici 3x3 (non sovrapposte), ciascuna di queste sottomatrici contiene numeri da 1 a 9 senza ripetizioni.


## Soluzione


```matlab
function [res] = sudoku_classico(M)
% res = 0 -> proprieta' NON soddisfatta
% res = 1 -> proprieta' soddisfatta
res = 0;


%controllo la dimensione
[r,c] = size(M);
if(~(r==9 && c == 9))
    return;
end


for i=1:9
    %controllo la riga (i)
    riga = controlla_riga(M(i,1:9));    
    %controllo la colonna (i)
    colonna = controlla_riga(M(1:9,i)');
    if (riga+colonna < 2)
        return;
    end
end


for i = 0:2
    for j = 0:2
        S = M(3*i+1:3*i+3, 3*j+1:3*j+3);
        val = controlla_riga(S(:)');
        if (val == 0)
            return;
        end
    end
end
res = 1;
```



# Esercizio 4

Scrivere una funzione che prende in ingresso una matrice M quadrata e restituisce il determinante di M (naturalmente la funzione Matlab predefinita `det` puo essere utilizzata solo per controllare i risultati). La seguente formula indica come calcolare ricorsivamente il determinante di una matrice:

$$
\\textrm{det}\\, M = \\sum\_{j=1}^{n} (-1)^{i+j}\\,m\_{ij}\\,\\textrm{det}\\, M\_{ij}
$$

dove \\(M_{ij}\\) è la matrice M decurtata della i-esima riga e della j-esima colonna (per qualsiasi riga i). [Per maggiori dettagli](https://it.wikipedia.org/wiki/Teorema_di_Laplace#Esempio_di_calcolo).



## Soluzione:


```matlab
function det = RecLaplaceDet(M)
if (size(M,1) ~= size(M,2))
    error('La matrice deve essere quadrata');
end
i = 1;
det = 0;
n = size(M,1);
if n == 1
    det = M(1,1);
else
    for j = 1:n
        c = [1:j-1,j+1:n];
        det = det + (-1)^(i+j) * M(i,j) * RecLaplaceDet(M(2:end,c));
    end
end
```



# Esercizio 5                        
                                                
Si vuole compilare la pagella dei propri film preferiti.
                                                
a) Scrivere uno script che chieda di inserire i film. Ogni film e' caratterizzato da un anno, un titolo e un voto. Tali dati vanno inseriti in una struttura chiamata `pagella`.
                                                
b) Scrivere il codice che visualizzi il numero totale di film con voto superiore a 6.
                                                
c) Scrivere il codice che visualizzi i titoli e i voti dei film prodotti tra il 2000 e il 2005.
                                                
d) salvare `pagella` in `file.mat`, cancellarla dal workspace, ricaricarla e stampare il titolo del primo film inserito.


NB: per chi utilizzasse IDEONE, inserite i valori direttamente, ad esempio utilizzando un array di Anni, di Titoli e di Voti di film che verranno poi usati all’interno della struttura dati Film


## Soluzione: 

```matlab
% parte A
nome=input('Inserire nome film (''q'' per uscire): ');
ii=0;
%clear pagella;
while nome~='q'
   ii=ii+1;
   pagella(ii).nome = nome;
   pagella(ii).anno = input('Inserire anno: ');
   pagella(ii).voto = input('Inserire voto: ');
   nome=input('Inserire nome film (''q'' per uscire): ');
end

% parte B
voto_positivo = [pagella.voto]>6;
somma = sum(voto_positivo);

disp(['i film con voto >6 sono: ' num2str(somma)]);

% parte c
vettore_logico_film = ([pagella.anno]>=2000) & ([pagella.anno]<=2005)
selezione_film = pagella(vettore_logico_film)
elem = length(selezione_film);
for i= 1:elem
   disp([selezione_film(i).nome ' ' num2str(selezione_film(i).voto)]);
end


% parte d
save es pagella
clear pagella
load es pagella
disp(pagella(1).nome)


```







# Esercizio 6

Creare una matrice di dimensione NxN che nel suo centro contiene un quadrato 2x2 composto da 1. Le cornici piu' esterne sono composte da valori via via crescenti:

```
6 6 6 6 6 6 6 6 6 6 6 6
6 5 5 5 5 5 5 5 5 5 5 6
6 5 4 4 4 4 4 4 4 4 5 6
6 5 4 3 3 3 3 3 3 4 5 6
6 5 4 3 2 2 2 2 3 4 5 6
6 5 4 3 2 1 1 2 3 4 5 6
6 5 4 3 2 1 1 2 3 4 5 6
6 5 4 3 2 2 2 2 3 4 5 6
6 5 4 3 3 3 3 3 3 4 5 6
6 5 4 4 4 4 4 4 4 4 5 6
6 5 5 5 5 5 5 5 5 5 5 6
6 6 6 6 6 6 6 6 6 6 6 6
```

## Soluzione

```matlab
function [M] = stampaCornice(n)
% caso base: matrice centrale di 11 ; 11 
    if(n == 1)
        M = ones(2,2);
    else
        %passo ricorsivo
        M = stampaCornice(n-1)
        % orlo la matrice con due righe, sopra e sotto
        r = ones(1, size(M, 2)) * n
        M = [r; M ; r]
        % completo la cornice n-esima orlando anche con le colonne, dx e sx
        c = ones(size(M, 1), 1) * n
        M = [c M c]
    end
end
```

# Esercizio 7

Dato un numero intero positivo inserito dall’utente, dire se tale numero è primo (stampa a video 1 se primo, 0 altrimenti).

## Soluzione 


```matlab
% soluzione non ricorsiva
function [ris] = numPrimo(x)
    ris=1;
    for y=2:sqrt(x)
        ris = ris*(~(~rem(x,y)));
end


% soluzione ricorsiva
function [ris] = numPrimo(x,y)
    if y>sqrt(x)
        ris = 1
    else
        ris = (~(~rem(x,y)))*numPrimo(x,y+1);
end
```



# Esercizio 8

Vi chiediamo di implementare in MATLAB un algoritmo di ordinamento per un vettore, l’algoritmo di Quicksort. L’algoritmo riceve in ingresso un vettore di interi e lo restituisce ordinato in maniera crescente (allo stesso modo della funzione sort() di MATLAB).

Quicksort è un algoritmo ricorsivo; dato un array `V`, di lunghezza `d` e indicando con `d/2 ` il risultato intero della divisione:

1. Viene estratto l’elemento di mezzo dell’array (il Pivot, ovvero `V[d/2]`);
2. Si divide l’array in due sotto-array, `L` ed `R`. `L`(left) conterrà tutti gli elementi minori del Pivot `V[d/2]`,  `R`(right) conterrà tutti gli elementi maggiori del Pivot `V[d/2]`.
3. Si chiama la funzione `quicksort()` in maniera ricorsiva su `L` ed `R`, ottenendo i vettori `L` ed `R` ordinati.
4. Se l’array ricevuto da `quicksort` ha dimensione 1 (è un solo numero) la funzione restituisce quel numero.
Altrimenti la funzione restituisce la concatenazione di `L`, del Pivot, e di `R`.
Il risultato di questa operazione è l’array ordinato.


Esempio ([ulteriori esempi](https://it.wikipedia.org/wiki/Quicksort)):

```
Passo 1:
V = [1,6,3,2,5]  d = 5;  d/2 = 3; 
pivot = V[d/2] = V[3] = 3;
L = [1,2]; pivot = 3; R = [6,5];
Passo 2 - array di sinistra:
V = [1,2]; d = 2; d/2 = 1; pivot = 1; R = []; L = [2];
restituisco al passo 1: L+pivot+R = [1,2]
Passo 2 - array di destra:
V = [6,5]; d = 2; d/2 = 1; pivot = 6; R = [5]; L = [];
restituisco al passo 1: L+pivot+R = [5,6]
Passo 1 - chiusura della ricorsione:
L = [1,2]; pivot = 3; R = [5,6] -> restituisco V = [1,2,3,5,6]
```



Soluzione più compatta:

```matlab
function [ R ] = QuickSort( A )
pivot_index = length(A);
if pivot_index <= 1 
    R = A;
else 
    pivot = A(pivot_index);
    L = A(A>pivot);
    R = A(A<pivot);
    if size(L) == [1 0]
        L = [];
    end 
    if size(R) == [1 0]
        R = [];
    end
    R = [QuickSort(R) pivot QuickSort(L)];
end
```
## Appendice 

Matrici per testare il sudoku:

```matlab

a= [     6     7     3     5     1     4     9     8     2
            9     2     1     3     6     8     7     5     4
            5     8     4     7     9     2     1     3     6
            8     9     6     2     3     7     4     1     5
            2     1     5     9     4     6     3     7     8
            3     4     7     1     8     5     2     6     9
            4     5     2     8     7     1     6     9     3
            1     6     9     4     5     3     8     2     7
            7     3     8     6     2     9     5     4     1 ];


b = [     6     7     3     5     2     4     9     8     2
            9     2     1     3     6     8     7     5     4
            5     8     4     7     9     2     1     3     6
            8     9     6     2     3     7     4     1     5
            2     1     5     9     1     6     3     7     8
            3     4     7     1     8     5     2     6     9
            4     5     2     8     7     1     6     9     3
            1     6     9     4     5     3     8     1     7
            7     3     8     6     2     9     5     4     1 ];
```
