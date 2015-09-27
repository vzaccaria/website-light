---
title: esercitazione del 12/12 su matlab, funzioni
date: 2013-12-12 08:20:16 
layout: post
category : infob 
tags :  [ "esercizi", "funzioni in matlab" ] 
---


Ecco di seguito il materiale presentato nella esercitazione in data 12/12:


# Esercizio 1

Implemento una funzione di nome conteggio
che prende in ingresso un array `(n)` e un numero `(x)`
e ritorna il numero di volte `(k)` che `x` appare in `n`.

    % prototipo
    function k = conteggio(n,x)
       k = length(find(n==x));
 

# Esercizio 2

Scrivere una funzione che dato in ingresso un intero,
calcola i divisori del numero dato e li ritorna come
un array.

    % prototipo
    function [d k] = divisori(n)
     
      d = [];
      for i=1:n
         if mod(n,i)==0
            d = [d i];
         end
      end

      k = length(d);

**Attenzione**:
se invoco una funzione che ritorna più di un parametro
devo assegnare la funzione ad un array per vedere
tutti i parametri, altrimenti vedo solo il primo.

# Esercizio 3

Data una matrice di numero interi uguali a 0 o 1
di dimensioni date dal'utente,
estrarre la riga i-esima, dove `i` è dato dall'utente.

Verificare inoltre che la riga sia una riga valida
(numero di righe della matrice sia >= di `r`).


    dim = input('Comunicami numero di righe e di colonne in un array ')

    A = floor(rand(dim(1),dim(2))*2)

    i = input('Comunicami un numero di riga valido ')

    if i>=1 && i<=size(A,1)
      disp(['La riga ' num2str(i) ' = ' num2str(A(i,:))])
    else
      disp('numero di riga non valido')
    end

    % sommare le colonne e le righe della matrice array
    % somma delle righe
    sum(A,2)

    % somma delle colonne
    sum(A,1) % oppure semplicemente sum(A)



# ordinamento di un vettore di interi

Riordina l'array in tre parti considerando i numeri inferiori, superiori e uguali ad un dato numero `r`:

    r = input('Comunicami r ')
    v = ceil(rand(1,r)*r)

    for i=1:r
       minori = v(v<v(i));
       maggiori = v(v>v(i));
       uguali = v(v==v(i));
        
       v = [minori uguali maggiori];
        
    end

    v

# risiko

Implementare la regola per il calcolo dei punti
ne risiko quando un giocatore "attacca" e l'altro
deve "difendersi".

La regola è la seguente:

> si lanciano tre dadi a testa a sei facce, si ordinano per ciascun giocatore i dati in modo
decrescente e poi di assegna un punto all'"attaccante"
per ogni dado `i` maggiore del dado `i` del difensore

    ndadi = 3;
    facce = 6;

    % array random di numeri interi
    attaccante = ceil(rand(1,ndadi)*facce)
    difensore = ceil(rand(1,ndadi)*facce)

    attaccante = sort(attaccante,'descend');
    difensore = sort(difensore,'descend');

    punti_attaccante = sum(attaccante > difensore)
    punti_difensore  = ndadi - punti_attaccante 



# Roulette

Si vuole simulare il gioco della roulette con 3 giocatori:

* Il banco possiede 500 fiches
* i giacatori A,B e C possiedono 500 fiches ciascuno
* si gioca massimo 100 volte, e ci si ferma prima
 se il casino è stato sbancato, oppure se non ci sono
 piu' giocatori con fiches che possono giocare
 ad ogni estrazione di un numero si assegnano
 eventuali fiches ai gicatori che hanno vinto

* **strategie di giocata dei vari giocatori**:

    - A: il 50% delle volte gioca pari, il rimanente dispari
 NB: 0 e 00 non sono né pari né dispari

    - A gioca 5 fiches a volta
  
    - B gioca 1 fiches a volta sempre sul 15 (rosso?)
 (giocare il singolo numero paga `36*giocata - giocata`)

    -  C gioca sul numero (diverso da 0 e 00) che è uscito
 il minor numero di volte, se più valori hanno stessa
 minima frequenzam gioca il minore.  per ottenere frequenza di una uscita posso fare `length(find(storico==i))`.

    - C gioca 3 euro a volta


Soluzione:

    bCasino = 500;
    bA = 500;
    bB = 500;
    bC = 500;

    volte = 100;

    storico = [];  % array che contiene i numeri usciti

    i = 1;

    % PER CASA
    % aggiungere una condizione nel while in modo che
    % di giochi solo se il casino non è stato sbancato
    % e se c'è almeno un giocatore con fiches

    while (i<=volte)
        % estraggo il numero
        % da 1 a 36 sono i numeri, 37 = 0, 38 = 00
        numero = ceil(rand(1,1)*38);
        storico(i) = numero;

        if bA>=5
          % giocatore A
          r = rand(1,1);
          % se r>0.5 per convenzione A gioca pari
          if (r>0.5 && numero<37 && mod(numero,2)==0) || (r<0.5 && numero<37 && mod(numero,2)==1)
              % vinco se gioco pari e esce pari oppure se gioco dispari ed esce dispari
              bA = bA + 5;
              bCasino = bCasino - 5;
          else 
              bA = bA - 5;
              bCasino = bCasino + 5;
          end
        end

        % giocatore B
        % PER CASA

        % giocatore C
        % PER CASA

        i = i+1;
    end















