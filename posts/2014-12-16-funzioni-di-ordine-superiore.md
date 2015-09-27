---
title: Funzioni di ordine superiore
date: 2014-12-16 18:44:25

layout: post
category : infob 
tags : ["funzioni di ordine superiore", "Torre di hanoi"] 
---

## Torre di Hanoi

Oggi abbiamo visto una soluzione al gioco della torre di Hanoi in Octave; il gioco è definito come segue ([Wikipedia](http://it.wikipedia.org/wiki/Torre_di_Hanoi)): 

> La Torre di Hanoi è un rompicapo matematico composto da tre paletti e un certo numero di dischi di grandezza decrescente, che possono essere infilati in uno qualsiasi dei paletti.
Il gioco inizia con tutti i dischi incolonnati su un paletto in ordine decrescente, in modo da formare un cono. Lo scopo del gioco è portare tutti i dischi sull'ultimo paletto, potendo spostare solo un disco alla volta e potendo mettere un disco solo su un altro disco più grande, mai su uno più piccolo.

![Immagine della tore di Hanoi](http://upload.wikimedia.org/wikipedia/commons/0/07/Tower_of_Hanoi.jpeg)

Il programma che abbiamo scritto permette di stampare le mosse per poter risolvere il problema con un determinato numero di dischi (parametro `n`):

```matlab
1;
% Stampa le mosse per spostare `n` dischi dalla torre numero `A` alla torre `B` attraverso `C`
function hanoi(n,A,B,C)
    if (n>1)
        hanoi(n-1,A,C,B);
    end 

    disp(sprintf('Muovi disco dalla torre %d alla torre %d',[A B]));

    if (n>1)
        hanoi(n-1,C,B,A);
    end
end
```

Di seguito, abbiamo visto una variazione dello stesso algoritmo che ritorna il numero totale delle mosse:

```matlab
1;

% `hanoi`: stampa hanoi
function [mosse] = hanoi(n, da, a, tramite)
  mosse = 0;
  if n>1
    mosse = mosse + hanoi(n-1, da, tramite, a);
  end
  mosse = mosse + 1;
  if n>1
    mosse = mosse + hanoi(n-1, tramite, a, da);
  end
end
```


# Funzioni di ordine superiore

Il seguente codice mostra come creare una funzione di ordine superiore che mappa una funzione passata come parametro ad un vettore in ingresso:

```matlab
% `applica`: applica funzione passata come parametro al 
% vettore v e ritorna v1
function [v1] = applica(v, funzione)
  v1 = [];
  for i = 1:length(v)
    v1 = [v1 funzione(v(i))];
  end
end
```


La funzione puo' essere utilizzata sia con funzioni *con nome* che con funzioni *anonime*:


```matlab
% `incrementa`: 
function [y] = incrementa(x)
  y = x+1;
end

v = [3 4 8]

v1 = applica(v, @incrementa)

v2 = applica(v, @(x)x+1)```



## Riduzione

Il seguente codice mostra come creare una meta-funzione che *accumula* il risultato di un'operazione applicata a tutti gli elementi del vettore in ingresso all'interno di una singola variabile (**accumulatore**).

Le operazioni da applicare sono funzioni della forma:

```matlab
[nuovo_valore_acc] = function nome_funzione(acc, elem) 
```


dove `acc` e' il valore corrente dell'accumulatore e `elem` e' l'elemento corrente del vettore. La funzione `accumula` e' definita come segue:

```matlab
% `accumula`: map-reduce
function [acc] = accumula(v, funzione, vinit)
  acc = vinit;
  for i=1:length(v)
    acc = funzione(acc, v(i));
  end
end
```

Ad esempio, dato il seguente vettore:

    v = [1 2 8];

E' possibile calcolare la somma degli elementi con la seguente invocazione:

    s = accumula(v, @(a,v)a+v, 0)

Il prodotto degli elementi e' invece calcolabile con la seguente funzione anonima:

    m = accumula(v, @(a,v)a*v, 1)


# Esercizio sugli scontrini del supermercato

### Scontrini del supermercato #

Un supermercato ha memorizzato il proprio archivio di scontrini nell'array struttura `scontrini` i cui elementi caratterizzano, ciascuno, una singola spesa ed hanno i seguenti campi:

* `id_cliente`: numero del cliente (**maggiore di zero**).
* `totale`: totale della spesa in EUR.
* `punti_premio`: i punti premio extra associati alle promozioni della spesa

Per ogni spesa viene assegnato al cliente un quantitativo di punti premio pari alla somma di:

* il valore dei `punti_premio` della spesa 
* un punto premio per ogni 10 euro spesi.

#### Domanda ##

Scrivere un programma che, dato l'array struttura `scontrini`, costruisce un array `saldo` contenente le informazioni `(id_cliente, punti_totali)` ove `id_cliente` e' un identificatore univoco del cliente e `punti_totali` e' il totale di punti premio dati al cliente per **tutte le sue spese**.

#### Soluzione

Visivamente, possiamo vedere il problema posto come la creazione di un array di strutture dati `saldo` (uno per ciascuno degli `m` clienti) a partire dall'array `scontrini`, come mostrato qui.


```{dot !}
digraph g {
graph [
rankdir = "LR"
];
node [
fontsize = "12"
shape = "ellipse"
];
edge [
      ];

subgraph cluster_0 {
        label = "Array \nscontrini";
        style=filled;
    color=lightgrey;
        fontsize = "12";
        "node0" [
            label = "<f0> scontrini(1) |<f1> scontrini(2)| <f3> scontrini(3)| <f4> ...| <f5> scontrini(n-1)| <f6> scontrini(n)"
            shape = "record"
            ];
}

"node1" [
             label = "<f1> id_cliente = 1| <f2> punti_premio = 10| <f4> totale = 50";
             shape = "record";
             ];

"node2" [
             label = "<f1> id_cliente = 1| <f2> punti_premio = 10| <f4> totale = 50";
             shape = "record";
             ];

subgraph cluster_1 {
        label = "Array \nsaldo";
        style=filled;
        color=lightgrey;
        fontsize = "12";
        "node3" [
            label = "<f0> saldo(1) |<f1> saldo(2) | <f3> saldo(3) | <f4> ...| <f5> saldo(m-1)| <f6> saldo(m)"
            shape = "record"
            ];
}

"node4" [
             label = "<f1> id_cliente = 1| <f2> punti_totali = 70";
             shape = "record";
             ];

"node0":f0 -> "node1"
"node0":f1 -> "node2"
"node1" -> "node3":f0
"node2" -> "node3":f0
"node3":f0 -> "node4"
}
```

È da notare che il numero degli scontrini (`n`) è in generale diverso dal numero dei clienti `m`. Vi possono infatti essere più scontrini associati allo stesso cliente (come mostrato nella figura sopra).

#### Soluzione ##

Inizializzazione struttura di esempio:

```matlab
% Inizializzazione variabili

scontrini(1).id_cliente   = 1;
scontrini(1).punti_premio = 10;
scontrini(1).totale       = 50;

scontrini(2).id_cliente   = 1;
scontrini(2).punti_premio = 10;
scontrini(2).totale       = 50;

scontrini(3).id_cliente   = 4;
scontrini(3).punti_premio = 10;
scontrini(3).totale       = 50;
```


soluzione problema:

```matlab
clienti        = [scontrini.id_cliente];
n              = 1;
saldo(1).id    = -1;
saldo(1).punti = 0;

for i = 1:length(clienti)

  id_univoci = [saldo.id];

  if ~ any( id_univoci == clienti(i) ) 

    % Trova gli scontrini del cliente i-esimo
    scont_cliente_i = ([scontrini.id_cliente] == clienti(i));

    % Trova le spese del associate agli scontrini 
    spese_cliente_i = find( scont_cliente_i );

    % Recupera i punti
    puntp_cliente_i = [scontrini(spese_cliente_i).punti_premio];
    punts_cliente_i = floor([scontrini(spese_cliente_i).totale]/10);

    % Aggiorna il saldo
    saldo(n).id           = clienti(i);
    saldo(n).punti_totali = sum(puntp_cliente_i) + sum(punts_cliente_i);

    printf('Saldo cliente %d = %d punti\n', saldo(n).id, saldo(n).punti)
    n = n + 1;
  end
end
```
