---
title: Esercizi riassuntivi sul C
date: 2014-11-18 18:18:20

layout: post
category : infob 
tags : ["esercizi", "strutture dati", "tabelle della verità"] 
---

**Update**: [Esercizi fatti al laboratorio con soluzioni](https://dl.dropboxusercontent.com/u/5867765/slides-informatica-b/EsLab32014InfoB.pdf).

# Duplicati in array

Si supponga di avere due array di interi e le loro dimensioni effettive nelle opportune variabili:

```c
int pippo[10];
int dim_pippo = 4;

int pluto[20];
int dim_pluto = 6;
```

Scrivere un array che determina quali interi sono presenti sia in `pippo` che in `pluto`.

```c
int i;
int j;
for(i=0; i<dim_pippo; i++) {
  int da_cercare_in_pluto = pippo[i];
  for(j=0; j<dim_pluto; j++) {
    if(da_cercare_in_pluto == pluto[j]) {
      printf("Intero %d sia in pippo che in pluto", da_cercare_in_pluto);
    }
  }
}
```

# Tabella verità

Completare la tabella della verita’ per l’espressione 

    NOT (A AND (NOT B) AND C)

Soluzione:

| A | B | C | Valore espressione |
|---|---|---|--------------------|
| 0 | 0 | 0 |                  1 |
| 0 | 0 | 1 |                  1 |
| 0 | 1 | 0 |                  1 |
| 0 | 1 | 1 |                  1 |
| 1 | 0 | 0 |                  1 |
| 1 | 0 | 1 |                  0 |
| 1 | 1 | 0 |                  1 |
| 1 | 1 | 1 |                  1 |


# Compagnia telefonica

La compagnia telefonica TT, utilizza le seguenti strutture dati per memorizzare i dati delle chiamate effettuate dai propri 100 clienti **nell'ultimo mese**:

```c
#define MAX 1000
typedef char stringa[50];
typedef struct
{
    int ora;    // ora di inizio della chiamata telefonica (da 0 a 23)
    int minuti; // minuti di inizio della chiamata telefonica (da 0 a 59)
    int durata; // durata della chiamata telefonica in secondi
} chiamata;

typedef struct
{
    stringa CF;      //codice fiscale del cliente
    int n;           //numero chiamate effettuate dal cliente nell'ultimo mese
    chiamata c[MAX]; //chiamate effettuate dal cliente nell'ultimo mese
} cliente;

// database dei 100 clienti della compagnia
cliente db[100];
```

Si ipotizzi che le telefonate abbiano il seguente costo:

- le telefonate iniziate dalle 22:00 alle 07:59 (estremi inclusi) hanno un costo di **0.005 euro al secondo** 

- tutte le altre costano **0.01 euro al secondo**

Si dichiarari un array di 100 `float` di nome `bolletta` e si scriva un frammento di codice C che riempia `bolletta`, in modo tale che la posizione `i`-esima di bolletta contenga il costo complessivo delle chiamate effettuate dal cliente `i`-esimo nell'ultimo mese:

**Spazio soluzione:**

    float bolletta[100];
    int i, j, ora;

    for (i = 0; i < 100; i++)
    {
         bolletta[i] = 0;
         for (j = 0; j < db[i].n; j++)
         {
              ora = db[i].c[j].ora;
              if (ora >= 22 || ora < 8)          
                   bolletta[i] += db[i].c[j].durata * 0.005;
              else
                   bolletta[i] += db[i].c[j].durata * 0.01;
         }
    }



Si dichiarari un array di nome `premium` contenente elementi di tipo `cliente` e riempirlo (senza lasciare spazi vuoti) con i dati dei clienti che hanno speso **più di 100 euro** nel corso dell'ultimo mese. Si noti che i dati dei clienti si trovano nella variabile `db` dichiarata sopra.

**Spazio soluzione:**

    cliente premium[100];
    int i, k=0;

    for (i = 0; i < 100; i++)
         if (bolletta[i] > 100)
            premium[k++] = clienti[i];

# Twitter

Sia data la definizione di stringa:

    typedef char stringa[30];

e la definizione di un messaggio tweet di 140 caratteri, contenente al massimo 4 hashtags (quelle stringhe nei tweet che cominciano con `'#'`, ad esempio, `"#poli"`):

    typedef struct {
        char contenuto[140];
        int  numero_hashtags;
        stringa hashtags[4];
    } tweet;

Sia data la seguente struttura di utente twitter:

    typedef struct {
        stringa nome;
        int     data_iscrizione; /* anno di iscrizione a twitter */
        int     numero_messaggi; /* numero effettivo messaggi */
        tweet   messaggi[100];
    } utente;

e di database di utenti:

    typedef struct {
        int numero_utenti;
        utente dati_utente[100];
    } database;

    database twitterdb;

Si chiede di scrivere un programma che stampi a video tutti gli utenti iscritti dal 2012 che hanno usato l'hashtag "#poli" in almeno uno dei propri messaggi. Se, ad esempio, vi sono solo tre utenti nel database:

* @vzaccaria, iscritto dal 2012, messaggi: 
 
    - "E' finito il primo emisemestre! #poli"
    - "E' ora del primo compitino! #poli"
     
* @obama, iscritto dal 2009, messaggi: 

    - "Politecnico is cool! #poli"

* @merkel, iscritta dal 2012, messaggi:

    - "Come to germany!"

Il programma deve stampare:

    Utente @vzaccaria ha usato #poli !!

__Soluzione__:

```c
int main()
{
    int u;
    int t;
    int h;
    for(u=0; u<twitterdb.numero_utenti; u++)
    {
        int trovato = 0;
        if(twitterdb.dati_utente[u].data_iscrizione > 2012)
        {
            for( t=0; t< twitterdb.dati_utente[u].numero_messaggi; t++ )
            {
                for( h=0; h< twitterdb.dati_utente[u].messaggi[t].numero_hashtags; h++)
                {
                    if(strcmp(twitterdb.dati_utente[u].messaggi[t].hashtags[h], "#poli") == 0)
                        trovato = 1;
                }
            }
        }
        if(trovato)
        {
            printf("Utente %s ha usato #poli !!\n", twitterdb.dati_utente[u].nome);
        }
    }
}
```

# Altri esercizi

# Parity bit

Definire un programma che riceva in ingresso un array `v` e stampi `true` solo se `v` ha un numero pari di elementi veri, altrimenti stampa `false`.

```c

int v[100];
int n; int i;
int pari = 1;

printf("Inserisci il numero di elementi");
scanf("%d", &n);

for(i=0; i<n; i++) {
    printf("Inserisci elemento numero %d", (i+1));
    scanf("%d", &v[i]);
}

for(i=0; i<n; i++) {
    if(v[i]) {
        pari = !(pari)
    }
}

if(pari) {
    printf("true");
} 
else {
    printf("false");
}
```