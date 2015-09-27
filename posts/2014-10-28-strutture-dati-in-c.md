---
title: Strutture dati in C
date: 2014-10-28 18:39:35

layout: post
category : infob 
tags : ["esercizi", "strutture dati in C"] 
---

Partiamo con il laboratorio. Il testo e la soluzione dell'esercizio [li trovate in questo pdf](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/laboratorio_28ottobre_soluzioni.pdf). Complimenti ai vincitori di oggi:

* Alex Longa (1)
* Roberto Lisciandra (1)
* Roberto Longoni (1)

# Tipi enumerativi 

Ecco il programma visto oggi per la definizione di un tipo enumerativo (`giorno_settimana`):

```c
#include <stdio.h>

typedef enum { lun, mar, merc, gio, ven, sab, dom } giorno_settimana;

int main()
{
    giorno_settimana g;
    for(g=lun; g<=dom; g++)
    {
        printf(" %d ", g);
    }
}
```

Ricordate che `lun` … `dom` sono etichette alle quali viene assegnato un valore numerico (`lun`=0 … `dom`=6). `giorno_settimana` è di fatto un intero con un insieme molto limitato di valori. Possiamo quindi utilizzare il segnaposto `%d` per stampare il suo valore.

# Strutture dati

Per una descrizione approfondita delle strutture dati, [è possibile consultare queste slide](https://www.dropbox.com/s/wcp3d1tpt4a8ppb/07_Struct.pdf).

Oggi, abbiamo visto come sia possibile creare una struttura dati che mantenga le informazioni relative ad uno studente. Abbiamo innanzitutto definito un nuovo tipo `studente`, caratterizzato da una __collezione di campi__, ciascuno con il suo tipo, e abbiamo poi visto come sia possibile assegnare un valore a tali campi. Ecco l'esempio il link all'esempio di oggi:

<script src="http://ideone.com/e.js/ohmFAW" type="text/javascript" ></script>

Ricapitolando, se `giorno_di_nascita` è un campo di `studente`, ed `s` è una variabile di tipo `studente`:

```c
    studente s;
```

allora posso impostare il giorno di nascita in `s` utilizzando la notazione puntata:

```c
    s.giorno_di_nascita = 10;
```

La stessa notazione serve quando vogliamo stampare il valore di un determinato campo di `s`:

```c
printf("Nome: %s, Cognome: %s - %d/%d/%d", s.nome, 
        s.cognome, (s.giorno_di_nascita + 1), 
        (s.mese_di_nascita+1), (s.anno_di_nascita+1));
```


# Esercizio di algoritmica 

La soluzione dell'esercizio sul calcolo del minimo numero di ipad venduti durante l'anno è la seguente:

<script src="http://ideone.com/e.js/Zl0RUv" type="text/javascript" ></script>

Da notare che:

* le vendite sono memorizzate in un array `vendite_2012` di 12 elementi; ogni elemento corrisponde ad un particolare mese.

* Partiamo prendendo come punto di riferimento il mese di gennaio (riga 22):

```c
    minimo = vendite_2012[0];
    mese_minimo = 0;
``` 

* e aggiorniamo il valore del minimo ed il mese in cui abbiamo trovato il minimo all'interno del `for`:

```c
    for(m=1; m<12; m++) {
        if( vendite_2012[m] < minimo ) {
            minimo = vendite_2012[m];
            mese_minimo = m;
        }   
    }
```

# Esercizio sui numeri primi

Obiettivo: scrivere un programma per determinare se un numero è primo[^1] o meno. Il numero deve essere richiesto in ingresso ed il risultato deve essere stampato a video.

```c
#include <stdio.h>

int main() {
    // dichiarazione variabili
    int n = 0;   // numero inserito dall'utente
    int i;       // variabile indice
    int primo = 1;  // variabile per indicare se il numero è primo
    
    // leggo il valore dall'ingresso

    scanf("%d",&n); 
    
    // calcolo se il numero è primo

    for (i=2;i<n;i++) {
        if (n%i==0) {
            // il numero non è primo
            primo = 0;
        }
    }

    if (primo==1) { 
        printf("il numero è primo");
    } else { 
        printf("il numero non è primo");
    }
    
    return 0;
}
```

[^1]: Un numero è definito primo se è divisibile solo per 1 e per se stesso. 

# Esercizio sulle strutture dati - Esame del febbraio 2013

Una fattoria gestisce una stalla con 10 mucche, ciascuna identificata da un codice alfanumerico di 8 caratteri. Il gestore della fattoria vuole realizzare un programma in linguaggio C che consenta la contabilizzazione del latte prodotto ogni mese e voi siete stati incaricati di scriverlo in quanto esperti di C. 

Definite in C il tipo `ProduzioneMensile` che rappresenti in modo comprensivo la quantità di latte prodotta ogni giorno del mese da ognuna delle 10 mucche della stalla. Ricordate che la quantità di latte prodotta è espressa in **litri** e che la produzione giornaliera deve essere associata al codice identificativo della mucca. Inoltre potete definire altri tipi per semplificare la definizione di `ProduzioneMensile`.

```c
/* numero di prelevamenti di latte (10 mucche per 30 giorni) */


typedef char codiceIdentificativo[8];

typedef struct { 
    codiceIdentificativo codice_mucca; 
    float   litri_di_latte; 
    int     giorno_del_mese;
} ProduzionePerMuccaPerGiorno;

typedef ProduzionePerMuccaPerGiorno ProduzioneMensile[300];
```

Data la seguente dichiarazione di variabile:
 
    ProduzioneMensile produzione;
    
Si scriva il frammento di programma C che stampi a video la quantità complessiva di latte prodotta nella stalla il 7 Gennaio, assumendo che la variabile produzione sia stata opportunamente inizializzata con le produzioni del mese di Gennaio.

```c
float tot = 0;
for (i  = 0; i < N; i++)
{
    if (produzione[i].giorno_del_mese == 7)
      tot += produzione[i].litri_di_latte;
}

printf(“\n\tProduzione totale %f”, tot);
```

Inserite pure dei commenti in fondo a questa pagina se avete dei dubbi o avete bisogno di chiarimenti. 