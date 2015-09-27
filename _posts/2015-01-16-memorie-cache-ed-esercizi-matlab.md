---
title: Memorie cache ed esercizi matlab
date: 2015-01-16 11:17:01

layout: post
category : infob 
tags : ["lezione", "esercitazione"] 
---

# Materiale sulle memorie cache

Slides [disponibili a questo indirizzo](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/s-caches-2.pdf).


# Esercizi aggiuntivi Matlab

I seguenti esercizi sono stati adattati dalle soluzioni ai temi d'esame del prof Emiliano Casalicchio (Uniroma2) disponibili su web.

## Esercizio di comprensione

E’ dato il seguente script Matlab:

```matlab
c=[];
i=1;
a=[1 7 2 1 2 -4];
while i<=length(a) && a(i)>0
  if a(i)>1
        c=[c a(i)];
  end
  i=i+1;
end
```


1. Riscrivere il codice facendo uso del ciclo `for`.

```matlab
c=[];
a=[1 7 2 1 2 -4];
for i=1:length(a)
    if a(i)>1
        c=[c a(i)];
    elseif a(i)<=0;
        break;
    end 
end
```

2. Determinare il contenuto della variabile `c` al temine dell’esecuzione dello script.

> Al termine dell’esecuzione dello script la variabile c sarà un vettore di 3 elementi e conterrà i seguenti valori `c = [ 7, 2, 2 ]`

## Esercizio di comprensione

Si consideri la seguente funzione Matlab:

```matlab
function s = mistery( n1, n2 )
      if n1==n2
        s=n1;
      else
        s = n1 + mistery(n1+1, n2);
      end 
end
```


Supponiamo di invocare la funzione per `n1 = 2` e `n2 = 6`

    r=mistery(2 , 6);

Quale valore sarà memorizzato in `r` dopo l’esecuzione della funzione?

### Soluzione

La funzione calcola la somma dei numeri compresi tra `n1` ed `n2`, estremi inclusi. Al termine dell’esecuzione di `mistery(2,6)`, `r` sarà uguale a 2+3+4+5+6=20.

## Esercizio di programmazione

Si consideri il seguente problema. Supponiamo di avere una collezione di dati, non ordinata, relativa ai calciatori del campionato italiano. Per ogni giocatore sono memorizzate le seguenti informazioni:

* nome
* goal segnati nel campionato attuale (`GA`)
* goal segnati dall’inizio della carriera (`GT`)
* anni di carriera (`A`),
* scudetti vinti dall’inizio della carriera (`S`)
* presenze in nazionale dall’inizio della carriera (N) 
* punteggio (P)

Dove il punteggio è calcolato come segue: 

```matlab
P = GT/A + S + N.
```



Si chiede allo studente di dDescrivere quale è la struttura dati piu' adatta a rappresentare in memoria la collezione su menzionata. Giustificare la risposta.

```matlab
v(i).nome
v(i).GA
v(i).GT
v(i).A
v(i).S
v(i).N
v(i).P
```

Si vuole ora progettare un programma che facendo uso della sola funzione `map` e senza utilizzare cicli, estragga l’elenco dei 10 calciatori che hanno segnato il maggior numero di goal nel campionato attuale ed ordinare tale elenco in base al punteggio P. 

```matlab
1;

% `map`: function description
function [r] = map(f, v)
  for i=1:length(v) 
    r(i)=f(v(i));
  end
end

function [r] = srt(f, v)
  v1 = map(f,v);
  [s, ii] = sort(v1);
  r = v(ii);
end


% `first`: function description
function [r] = first(v, n)
  r = v(1:min(n, size(v)));
end



srt(@(x)(x.P), first(srt(@(x)(x.GA), v), 10))
```