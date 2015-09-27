---
title: Memoria Virtuale
date: 2014-12-23 18:21:51

layout: post
category : infob 
tags : ["lezione", "memoria virtuale"] 
---

# Memoria dinamica (RAM)

La [RAM (Random Access Memory)](http://it.wikipedia.org/wiki/RAM) è una sequenza di `M` celle numerate da 0 fino a un valore massimo `M-1`. Il numero che identifica ogni cella è detto [indirizzo](http://it.wikipedia.org/wiki/Indirizzo_di_memoria) e la dimensione della cella dipende dal tipo di  indirizzamento del calcolatore. Nell'indirizzamento al _byte_, la cella è grande un solo byte. Accedere alla cella `N` significa accedere al byte `N`:


```{dot !}
digraph g {

    graph [
    rankdir = "LR"
    ];

    subgraph cluster_0 {
        label = "Memoria";
        "node0" [
            label = "<f0> 0 |<f1>  1| <f3>  2 | <f4> ...| <f5> (M-1)"
            shape = "record"
            ];
    }

    "node1" [
                label = "Ogni cella contiene un byte\n ed è identificata dalla posizione"
                shape = "plaintext"
            ];

    "node1" -> "node0":f3:sw

}
```

Nelle architetture di calcolatore con indirizzamento a _word_, la dimensione di ogni cella è maggiore di un byte ed è chiamata __word__. Per poter quindi accedere al byte, è necessario specificare sia il numero della parola (partendo da 0), che la posizione del byte all'interno della parola (__offset__, partendo da 0):

```{dot ! }
digraph g {

    graph [
    rankdir = "LR"
    ];

    subgraph cluster_0 {
        label = "Memoria";
        "node0" [
            label = " { 0 | 1 | 2 | 3 } |  { 4 | 5 | <f0> 6 | 7 } | ... | { M-4 | M-3 | M-2 | M -1 }"
            shape = "record"
            ];
    }

    "node1" [
                label = "Il byte n.6 è\nnella parola di indice 1, offset 2"
                shape = "plaintext"
            ];

    "node1" -> "node0":f0:nw
}
```

Nel resto della discussione, faremo riferimento al semplice indirizzamento al byte.

## Spazio di indirizzamento

Lo spazio di indirizzamento è il numero massimo  di indirizzi possibili della memoria (ovvero `M`). Esso dipende dalla lunghezza in bit della codifica binaria degli indirizzi al byte introdotti sopra.

Se gli indirizzi quindi sono lunghi `N` bit, lo spazio di indirizzamento ha dimensione di `M = 2^N` celle.    
Le dimensioni della memoria sono generalmente espresse secondo le seguenti unità di misura:

* KB (Kilobyte) = \\(2^{10}\\) byte
 
* MB (Megabyte) = \\(2^{20}\\) byte
 
* GB (Gigabyte) = \\(2^{30}\\) byte

## Allocazione dei programmi

Ogni qualvolta compilate un programma, il compilatore genera il cosidetto _eseguibile_, ovvero l'insieme di istruzioni macchina e dati di inizializzazione che costituiscono il programma stesso. L'eseguibile è una sequenza di byte che, in fase di esecuzione viene caricata in memoria. Esso ha (indicativamente) la seguente struttura:

```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];
    subgraph cluster_0 {
        label = "Eseguibile";
        "node0" [
            label = "\nIstruzioni\n\n|\nDati inizializzati\n\n|\nDati non iniz.\n\n|\nAltro ...\n\n"
            shape = "record"
            ];
    }

}
```

Supponiamo di compilare questo programma C: 

```c
int a=3;

void main() {
    a = a + 1;
} 
```

Il compilatore in genere stabilisce che la variabile `a` debba essere allocata nella zona dei dati inizializzati, ad una distanza `v` (offset) dall'inizio del programma. 

```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];
    subgraph cluster_0 {
        label = "Eseguibile";
        "node0" [
            label = "<f1>\nIstruzioni\n\n|\nDati inizializzati\n| <here> int a=3;\n|\nDati non iniz.\n\n|\nAltro ...\n\n"
            shape = "record"
            ];
    }

    "node0":here -> "node0":f1:nw [ label="'v' è la distanza\nfra la cella contenente 'a'\n e l'inizio del programma"]
}
```

La distanza `v` è di fatto un indirizzo **virtuale** poiché non specifica ancora la posizione fisica in memoria (ovvero l'indirizzo **fisico**) della variabile stessa. Tale indirizzo fisico, infatti, verrà deciso quando il programma andrà in esecuzione.

È il sistema operativo che decide in fase di caricamento ed esecuzione come trasformare gli indirizzi virtuali in fisici. Il meccanismo particolare utilizzato è chiamato *rilocazione dinamica*.

# Rilocazione dinamica basata su registro base

Questa soluzione tecnica adottata dal sistema operativo fa uso di una variabile particolare, ovvero il **Registro Base**, che è univoca per ogni processo in esecuzione. Questa variabile viene sommata all'indirizzo virtuale delle variabili ogniqualvolta il processo relativo vi accede.

```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];

    "node1" [ label= "Registro base"; shape="rectangle" ]

    "node2" [ label= "Indirizzo virtuale 'v'"; shape="rectangle" ]

    "node3" [ label = "+"; shape="circle"]
   
    subgraph cluster_0 {
        label = "Memoria";
        "node0" [
            label = "<f0> 0 |<f1>  1| <f3>  2 | <f4> ...| <f5> (M-1)"
            shape = "record"
            ];
    }

    "node1" -> "node3";
    "node2" -> "node3";
    "node3" -> "node0" [ label="Indirizzo fisico\nin memoria"];
}
```

Quindi, ad esempio, se supponiamo che:

* il sistema operativo assegna al registro base il valore 100
* l'indirizzo virtuale `v` della variabile `a` è 20

allora l'indirizzo fisico (la cella effettiva) utilizzato dal programma per accedere ad `a` ha indirizzo pari a 120.

```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];

    "node1" [ label= "Registro base = 100"; shape="rectangle" ]

    "node2" [ label= "Indirizzo virtuale = 20 "; shape="rectangle" ]

    "node3" [ label = "+"; shape="circle"]
   
    subgraph cluster_0 {
        label = "Memoria";
        "node0" [
            label = "<f0> 0 |<f1> ... | <f3>  120 | <f4> ...| <f5> (M-1)"
            shape = "record"
            ];
    }

    "node1" -> "node3";
    "node2" -> "node3";
    "node3" -> "node0" [ label="Indirizzo fisico\nin memoria"];
}
```

Se volessi far girare due processi simultaneamente, il loro registro base differirebbe in modo che questi non si sovrappongano in memoria.


```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];

    "node1" [ label= "Base di P1"; shape="rectangle" ]

    "node2" [ label= "Base di P2"; shape="rectangle" ]

    subgraph cluster_0 {
        label = "Memoria fisica";
        "node0" [
            label = "... | <f0> \nP1\n\n | ... | <f1> \nP2\n\n | ..."
            shape = "record"
            ];
    }

    "node1" -> "node0":f0:nw;
    "node2" -> "node0":f1:nw;
}
```

Purtroppo, il solo registro base non è sufficiente. Nella memoria fisica infatti risiedono molti processi, alle volte più grandi degli spazi vuoti disponibili (ad esempio fra `P1` e `P2`). Inoltre la memoria fisica può essere insufficiente a contenere le immagini complete di tutti processi. È per risolvere tali problemi che è stata introdotta __la paginazione__.

# Paginazione

La paginazione è un **miglioramento della rilocazione**; essa è insieme di meccanismi della CPU e politiche del sistema operativo che permettono ai programmi di essere sviluppati come se ci fosse un unica memoria (ad indirizzi contigui) allocata solo per loro.

Di fatto permette di sfruttare al meglio gli spazi vuoti della memoria fisica anche non contigui e include implicitamente una rilocazione dinamica seppur in maniera molto particolare.

## Concetti fondamentali: indirizzi fisici e indirizzi virtuali (o logici).

Ricapitolando quanto detto sopra, possiamo distinguere due tipi di indirizzi:

* Gli indirizzi contenuti in un programma eseguibile sono relativi all'inizio del programma e sono chiamati indirizzi virtuali. L'insieme degli indirizzi virtuali è in genere chiamato memoria virtuale.

* La memoria effettivamente presente nel calcolatore è la memoria fisica e i suoi indirizzi sono detti indirizzi fisici.

* La CPU effettua continuamente una trasformazione tra l'indirizzo virtuale e il suo corrispettivo fisico.

## Assunzioni della paginazione

Nella paginazione si rinuncia ad avere una zona contigua della  memoria fisica per ciascun processo.

La memoria virtuale del programma viene suddivisa in porzioni (_pagine virtuali_) di lunghezza fissa (potenza di 2, es: 4Kbytes). La memoria fisica viene divisa in pagine fisiche  della stessa dimensione.
Le pagine virtuali di un programma vengono caricate in altrettante pagine fisiche, non necessariamente contigue:

```{dot !}
digraph g {

    graph [
        rankdir = "LR"
    ];

    subgraph cluster_0 {
        label = "Processo P1";
        "node0" [
            label = "<f0> \nPagina virt. n. 0\n\n | <f1> \nPagina  virt.n. 1\n\n| ... "
            shape = "record"
            ];
    }

    subgraph cluster_1 {
        label = "Memoria fisica";
        "node1" [
            label = "... | <f2> \nPagina fisica n. X\n\n | \n\n...\n\n\n |<f3> \nPagina fisica n. Y\n\n| ... "
            shape = "record"
            ];
    }

    "node0":f0 -> "node1":f3 [ len=3 ]
    "node0":f1 -> "node1":f2

}
```

#### Come fa la CPU ad effettuare continuamente la trasformazione tra l'indirizzo virtuale e il suo corrispettivo fisico?

In collaborazione con il sistema operativo, la CPU provvede a 

1. scomporre un indirizzo virtuale in due parti, sfruttando la codifica binaria del numero stesso. 
2. utilizzare una tabella di conversione per trasformare solo i numeri di pagina 
3. ricomporre il tutto per ottenere l'indirizzo del dato nella memoria fisica.

```{dot !}
digraph g {

    "node0" [
        label = "<f0> numero di pagina virtuale | <f1> offset rispetto all'inizio pagina " labelx="Indirizzo virtuale"
        shape = "record"
        ];

    "node2" [ label="tabella di\nconversione" shape="plaintext"]
    "node3" [ label="copiato\ndirettamente"   shape="plaintext"]

    "node1" [
        label = " <f0> numero di pagina fisica | <f1> offset rispetto all'inizio pagina " labelx="Indirizzo fisico"
        shape = "record"
        ];

    "Indirizzo virtuale" -> "Scomponi codifica"
    "Scomponi codifica" -> "node0":f0
    "Scomponi codifica" -> "node0":f1 

    "node0":f0 -> "node2"
    "node2" -> "node1":f0

    "node0":f1 -> "node3"
    "node3" -> "node1":f1 

    "node1":f0 -> "Ricomponi"
    "node1":f1 -> "Ricomponi"

    "Ricomponi" -> "Indirizzo fisico"
}
```

Nella prossima lezione vedremo alcuni esempi pratici.
 

