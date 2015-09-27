---
title: Sistemi operativi
date: 2014-12-19 13:05:33

layout: post
category : infob 
tags : ["lezione", "sistemi operativi", "esercizi su ricorsione"] 
---


# Introduzione ai sistemi operativi

Un sistema operativo è:

> “Insieme di moduli software e funzioni che nascondono alle applicazioni e agli utenti i dettagli dell’architettura hardware del calcolatore”
 
e può essere di tre tipologie:

* Monoutente e monoprogrammato (DOS)
 
* Monoutente e multiprogrammato (multitasking)

* Multiutente (Linux/MacOS)
 

Fra i vari moduli che possiamo annoverare, la gestione dei processi rappresenta forse quello più importante. 

Un processo rappresenta un’**istanza di programma** composta da:

* codice eseguibile (il programma stesso)
* dati del programma
* informazioni relative al suo funzionamento (stato)

Lo stesso programma può quindi essere associato a diversi processi quando diverse copie del medesimo programma  sono mandate in esecuzione; ecco una schermata della lista dei processi di Google Chrome che girano sulla mia macchina:

```
PID    COMMAND      %CPU TIME     #TH  #WQ  #PORT #MREG MEM    RPRVT  PURG   CMPRS  VPRVT  VSIZE  PGRP
24022  Google Chrom 0.0  00:09.25 11   0    118   407   2260K  1988K  0B     44M    169M   3279M  23641
23661  Google Chrom 0.0  00:01.57 10   0    113   216   6640K  6372K  0B     20M    137M   3205M  23641
23660  Google Chrom 0.0  00:00.89 10   0    113   202   1296K  1088K  0B     21M    136M   3197M  23641
23658  Google Chrom 0.0  00:00.60 10   0    112   186   1212K  1004K  0B     14M    129M   3192M  23641
23657  Google Chrom 0.0  00:00.69 10   0    112   188   1264K  1060K  0B     14M    130M   3193M  23641
23656  Google Chrom 0.0  00:00.86 10   0    114   205   1312K  1056K  0B     21M    137M   3206M  23641
23655  Google Chrom 0.0  00:00.66 10   0    112   188   1348K  1144K  0B     14M    130M   3193M  23641
23654  Google Chrom 0.0  00:06.09 14   0    132   280   11M    11M    0B     27M    168M   3232M  23641
23653  Google Chrom 0.0  00:05.90 12   0    114   266   14M    14M    16K    8952K  137M   3198M  23641
23651  Google Chrom 0.0  00:05.69 11   0    113   249   12M    12M    0B     35M    160M   3222M  23641
```

Il file system è quel modulo del sistema operativo che si occupa di organizzare i files in una struttura gerarchica, composta dai file stessi e da cartelle che li contengono.

Ogni file e _directory_ sono caratterizzati dalle seguenti proprietà:

* Nome
* Utente ed gruppo possessori (owner)
* Una lista dei permessi che gli owner o tutti gli altri hanno nel poter manipolare il file stesso. 


```
PERMESSI        OWNER     GROUP     SIZE CREATION     NOME
drwxrwxr-x+ 275 root      admin     9350 Dec 18 11:59 Applications
drwxrwxr-x@  17 root      admin      578 Oct 22  2010 Developer-3.2.4
dr-xr-xr-x    3 root      wheel      102 Jul 22  2013 Developer-Android
drwxr-xr-x+  74 root      wheel     2516 Aug 27 12:32 Library
drwxr-xr-x@   2 root      wheel       68 Aug 25  2013 Network
drwxr-xr-x+   4 root      wheel      136 Aug 21 16:14 System
drwxr-xr-x    9 root      admin      306 Aug 21 16:19 Users
drwxrwxrwt@   4 root      admin      136 Dec 18 08:43 Volumes
drwxr-xr-x@  39 root      wheel     1326 Aug 21 16:15 bin
drwxrwxr-t@   2 root      admin       68 Aug 25  2013 cores
dr-xr-xr-x    3 root      wheel     4468 Dec 18 08:39 dev
lrwxr-xr-x@   1 root      wheel       11 Aug 21 16:06 etc -> private/etc
dr-xr-xr-x    2 root      wheel        1 Dec 18 08:45 home
-rwxr-xr-x@   1 root      wheel  8394000 Jun  4  2014 mach_kernel
dr-xr-xr-x    2 root      wheel        1 Dec 18 08:45 net
drwxr-xr-x@   5 root      admin      170 Sep 29 14:39 opt
-rw-r--r--    1 zaccaria  admin    23232 Dec 15  2010 ppc.txt
drwxr-xr-x@   6 root      wheel      204 Aug 21 16:19 private
drwxr-xr-x@  62 root      wheel     2108 Aug 21 16:16 sbin
lrwxr-xr-x@   1 root      wheel       11 Aug 21 16:07 tmp -> private/tmp
drwxr-xr-x@  12 root      wheel      408 Aug 30 12:24 usr
lrwxr-xr-x@   1 root      wheel       11 Aug 21 16:07 var -> private/var
```


I file system riescono a fornire una visione comune dell'organizzazione dei dati anche attraverso l'uso di _driver di periferica_. Ciò permette di lavorare su varie tipologie di memorizzazione di massa (dischi rigidi e dischi a stato solido) con le stesse modalità.

## Gestione dei processi 

In un sistema multi-programmato, i processi vengono eseguiti assegnando a loro la CPU per una determinata fetta di tempo (_timeslice_). Un particolare processo può essere eseguito solo durante il proprio timeslice, altrimenti rimane in uno stato sospeso. Poiché la lunghezza del timeslice è nell'ordine dei millisecondi (dai 5 ai 100), l'impressione è che i processi stiano girando contemporaneamente.

Con una singola CPU, solo un processo alla volta può consumare la sua fetta di tempo. Gli altri processi rimangono in una coda, la cui posizione è determinata dalla priorità dinamica. Quando tutti i processi hanno finito la propria fetta, si riparte con un altra torta.

```{ascidia !}
     
             Coda di processi                                      
      +--------+--------+------+----+       +-----+      
   +->|   P4   |   P3   |  P2  | P1 |------>| CPU |---+ 
   |  +--------+--------+------+----+       +-----+   |   
   |                                                  |  
   +--------------------------------------------------+  

```
Se un programma fa molte richieste (_IO bound_) allora è piu prioritario (più avanti nella coda) di programmi che fanno solo calcoli (_compute bound_).

```{dot !}

digraph example2 {
  processo -> "IO bound" [ label = "molte\nrichieste" ];
  processo -> "Compute bound" [ label = "molti\ncalcoli"];
}

```

Un processo può essere in uno dei macrostati mostrati in figura, ovvero 

* __in esecuzione__ (sta consumando la sua fetta di tempo)
* __pronto__ (è in coda)
* __attesa__ (si è messo da parte, fuori dalla coda, in attesa di qualche evento esterno)

```{dot !}

digraph example2 {
  esecuzione -> pronto [ label = "finisce\nil timeslice" ];
  pronto -> esecuzione [ label = "scelto dallo\n scheduler"];
  attesa -> pronto [ label = "evento\nverificatosi"];
  esecuzione -> attesa [ label = "in attesa\nevento esterno"];
}

```


# Grigliopoli

Le strade della città di **Grigliopoli** sono organizzate come una griglia (alcune strade attraversano la città da est a ovest e altre da nord a sud). 

Dati due incroci che distano `X` isolati lungo l'asse est-ovest della città e `Y` isolati lungo l'asse nord-sud, siete stati incaricati di calcolare il numero di percorsi a distanza minima che collegano i due incroci. 

Nell’esempio qui sotto, vengono mostrati i 3 percorsi a distanza minima che collegano due incroci `A` e `B` caratterizzati da una distanza lungo l'asse `X` di 2 e lungo l'asse `Y` di 1:

```
          X
    *   *   *   *               *   *   *   *               *   *   *   *
      A-------+                   A---+                       A 
Y   *   *   * | *               *   * | *   *               * | *   *   *
              B                       +---B                   +-------B      
    *   *   *   *               *   *   *   *               *   *   *   *
         (1)                         (2)                         (3)

```

Il vostro obiettivo e' di implementare **una funzione ricorsiva** `calcola` in Matlab/Octave che ricevuti `X` e `Y` in ingresso restituisce il numero totale di percorsi corrispondenti. Ovvero, nell'esempio di sopra `calcola(2,1)` deve ritornare 3. 

> **Suggerimento**: Quando `X` = 0 o `Y` = 0, c’è soltanto un cammino a distanza minima che collega i due incroci. Altrimenti, esiste più di un cammino minimo dal momento che è possibile sia avvicinarsi alla destinazione lungo l’asse est-ovest (riducendo quindi la distanza `X`) oppure avvicinarsi lungo l’asse nord-sud (riducendo la distanza `Y`)

```matlab
function [ p ] = calcola(x,y)
    if (x == 0 || y == 0)
      p = 1;
    else
      p = calcola(x-1,y) + calcola(x,y-1);
    end
```

# Paperone

Siano date le seguenti due definizioni di funzioni:

```matlab
function [qua] = paperone(a, b)
    if b==1 || b==0
        qua = false; 
    else 
        if (mod(a, b) == 0) && a~=b 
            qua = true;
        else 
            qua = paperone(a, b-1);
        end 
    end 
end 
```

```matlab
function [x] = paperino(aaargh)
    x = true;
    if paperone(aaargh,aaargh) ~= 1;
        x=false;
        return
    end
end
```

1. A cosa corrisponde la funzione ricorsiva `paperone`?

    `paperone(a, b)` controlla se:

    * c'è un divisore di `a` 
    * ed è minore di `b` 
    * ed è diverso da `a` e `1`

2. Si dica a cosa corrisponde il caso in cui `paperino(k)` (per `k` intero) ritorna `true`:

    Indica se il numero `k` è un numero non primo.

3. Si indichi l'output del seguente codice:

```matlab    
for d = 1:3:20 
    printf('%d - %d\n', d, paperino(d))
end
```

Output: 

        1 - 0
        4 - 1
        7 - 0
        10 - 1
        13 - 0
        16 - 1
        19 - 0


