---
title: Introduzione alle funzioni in Matlab
date: 2014-12-05 12:03:49

layout: post
category : infob 
tags : ["funzioni", "stack", "workspace locali"] 
---

# Espressioni booleane

Dato il seguente vettore Matlab

    voti = [ 12 15 8 29 23 24 ]

Si definisca un'espressione logica Matlab corrispondente al seguente predicato ([1])

> Non esiste un voto all'interno di `voti` che sia maggiore di 29

**Soluzione**: il predicato può essere calcolato con la seguente condizione:

    sum(voti > 29) == 0

il quale vale `1` nel caso in cui nessun elemento soddisfi la condizione, `0` altrimenti.
Si noti infatti che l'espressione `voti>29` ha il seguente risultato

    [ 0 0 0 0 0 0 ]

e che quindi, non può esistere un voto maggiore di 29 se la somma di tutti gli elementi e' `0`.
 

 [1]: http://it.wikipedia.org/wiki/Proposizione_(logica)

# Funzioni

Abbiamo introdotto le funzioni in Matlab con il calcolo del fattoriale.

## Calcolo del fattoriale

Le funzioni servono a raggruppare parti di codice che possono servire in diversi punti del programma. Questo programma definisce una funzione `fattoriale` che viene invocata due volte.

```matlab
1;

% Definizione della funzione fattoriale
function [f] = fattoriale(n)
f = 1
for i=1:n
f = f * i
end
end

% Inizio del programma principale
x = input('inserisci il valore di x')
fx = fattoriale(x)

if fx>220
y = input('inserisci valore y')
fy = fattoriale(y)
end
```

Si noti che l'espressione iniziale:

    1;

Serve per indicare a Matlab che il testo contiene sia definizioni di funzione che il programma principale stesso.

## Scope di una funzione ##

Nonostante le due funzioni successive usino lo stesso nome per i parametri formali, il parametro `n` appartiene a due *scope* differenti e locali alle due funzioni stesse (`func_a` e `func_b`).

```matlab
1;

function [r] = func_a(n)
  r = n*2;
end

function [s] = func_b(n)
  s = func_a(n*3);
end

x = func_b(1)
```

[A questo indirizzo potete trovare il diagramma disegnato oggi a lezione che descrive i workspace locali coinvolti](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/workSpacesLocali.pdf).

# Esercizi riassuntivi 

Ecco alcuni brevi esercizi fatti dopo l'introduzione delle funzioni.

## Conteggio

Implemento una funzione di nome conteggio
che prende in ingresso un array `(n)` e un numero `(x)`
e ritorna il numero di volte `(k)` che `x` appare in `n`.

```matlab
% prototipo
function k = conteggio(n,x)
   k = length(find(n==x));
```


## Calcolo divisori

Scrivere una funzione che dato in ingresso un intero,
calcola i divisori del numero dato e li ritorna come
un array.

```matlab
% prototipo
function [d] = divisori(n)

d = [];
for i=1:n
 if mod(n,i)==0
    d = [d i];
 end
end

```

La seguente implementazione risolve il problema in maniera più sintetica ma meno efficiente:

```matlab
function [d] = divisori(n)
    v = 1:n
    d = find(mod(n, v) == 0)
end
```