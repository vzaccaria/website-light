---
title: primo laboratorio matlab
date: 2014-12-18 11:02:31

layout: post
category : infob 
tags : ["laboratorio"] 
---

# Esercizio 1
Scrivere uno script matlab  che calcoli la media di N numeri inseriti dall’utente. 


# Soluzione


```matlab
clear all; clc;
dim = input('Inserire numero di valori = ');
vett = zeros(1, dim);
media = 0;
for i = 1:dim
    vett(i) = input('inserisci valore = ');
    media = media + vett(i);
end
media = media / dim;

disp(['Media = ' num2str(media)]);
```

# Esercizio 2


Scrivere un file matlab per produrre le tabelline dei prodotti di tutti i numeri da 1 a N (N = 10). Per ogni numero mostrare le prime M moltiplicazioni. Il risultato dev’essere una matrice di M righe ed N colonne.

* Nota: La tabellina si può calcolare come prodotto matriciale tra un vettore colonna e un vettore riga (Riferimenti a: https://it.wikipedia.org/wiki/Tavola_pitagorica).

Provate a risolvere l’esercizio sia usando un ciclo for, sia non utilizzandolo.


## Soluzione 

```matlab
clear all; clc;
N = 10;
M = input(‘Inscerisci il valore di M: );

mv = 1:M;

T = zeros(M, N);

for i = 1:10
    T(:,i) = i*mv';
end
```


# Esercizio 3
Scrivere una funzione che, data una matrice `A` come input, ritorni in un intero il numero di zeri contenuti in A.


## Soluzione 


```matlab
function [num] = ese1(A)
    v = (A==0);
    num = sum(sum(v));
```


# Esercizio 4


Stampare tutti i divisori di un dato numero N inserito dall'utente
Nota: I divisori devono essere salvati in un array e poi stampati.


## Soluzione 


```matlab
clear all; clc
N=input('Inserire un numero : ') ;
i=1;
div=[];


k = 1;
for i=1:N
    if(fmod(N,i)==0) %fmod in octave, mod in matlab
    div(k)=i;
    k = k + 1;
    end
end
 
disp([' ci sono ',num2str(length(div)),'  divisori, cioè ',num2str(div)])
```

# Esercizio 5


Scrivere una funzione che accetti due matrici `A` e `B` come parametri; si assuma che `A` e `B` abbiano le stesse dimensioni. La funzione deve restituire:

* il numero di elementi per cui in `A` e `B` si ha lo stesso valore.
* il numero di elementi in `B` che sono uguali al doppio del corrispondente elemento di `A`.


## Soluzione 


```matlab
function [doppi,uguali] = ese3(A,B)
    c = A==B;
    uguali = sum(sum(c));
    d = A*2==B;
    doppi = sum(sum(d));
```

# Esercizio 6

Alla pagina http://ideone.com/XkELMh trovate l’implementazione dell’algoritmo di ordinamento ricorsivo “mergesort”, di cui potete trovare la spiegazione e degli esempi del funzionamento a https://it.wikipedia.org/wiki/Merge_sort. 

Il codice presentato contiene però due errori, di cui uno ripetuto 7 volte.
Vi chiediamo di trovare questi errori, correggerli, al fine di ottenere una implementazione corretta dell’algoritmo.


## Soluzione 

```matlab
function list = mergeSort(list)
 
    if numel(list) <= 1
        return
    else
        middle = ceil(numel(list) / 2);
        left = list(1:middle);
        right = list(middle+1:end);
 
        left = mergeSort(left);
        right = mergeSort(right);
 
        if left(end) <= right(1)
            %list = [left; right];
            list = [left right];        
            return
        end
 
        %merge(left,right)
        counter = 1;
        while (numel(left) > 0) && (numel(right) > 0)
            if(left(1) <= right(1))
                list(counter) = left(1);
                left(1) = [];
            else
                list(counter) = right(1);
                right(1) = [];
            end           
            counter = counter + 1;   
        end
 
        if numel(left) > 0
            list(counter:end) = left;
        elseif numel(right) > 0
            list(counter:end) = right;
        end
        %end merge        
    end %if
end %mergeSort


mergeSort([4 3 1 5 6 2 9])
```
