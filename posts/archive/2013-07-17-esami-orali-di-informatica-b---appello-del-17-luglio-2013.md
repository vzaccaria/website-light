---
title: Soluzione scritto ed esami orali di Informatica B - Appello del 17 Luglio 2013
date: 2013-07-17 13:53:05

layout: post
category : infob 
tags : ["lezione", "esame", "orali"] 
---



Gli esami orali di Informatica B relativi all'appello del **17 Luglio 2013** si svolgeranno Venerdi' 19 Luglio al Dipartimento di Elettronica, Informazione e Bioingegneria **dalle 14:30 alle 17:00 in aula PT1 (piano terra del DEIB)**.

La soluzione del tema scritto e' la seguente:

### Esercizio 1

Il programma gestionale di un’azienda di trasporti è scritto in C ed utilizza le seguenti strutture dati:

	#define MAX_TRASPORTI 100
	#define MAX_DIPENDENTI 10
	typedef char stringa[100];
	typedef enum{falso, vero} boolean;
	
	typedef struct {
	    stringa destinazione;
	    boolean trasportoSpeciale; 
	    float numeroKm; 
	} Trasporto;
	
	typedef struct{
	    stringa nome;
	    stringa cognome;
	    int kmPerLitro; 
	    int numTrasportiEffettuati;
	    Trasporto listaTrasporti[MAX_TRASPORTI];
	} Camionista;

ove
* `trasportoSpeciale` e' vero se si movimentano prodotti velenosi, o molto pesanti o se le dimensioni del camion sono  superiori a quelle di un articolato standard. 
* `numeroKm` indica il numero di kilometri che e' necessario percorrere per portare il carico a destinazione e tornare indietro.
* `kmPerLitro` indica quanti km in media percorre un camionista con un litro di carburante.

Si assuma inoltre che nel main.c del programma siano state dichiarate le seguenti variabili

	Camionista dipendenti[MAX_DIPENDENTI]; 
	float litriConsumati[MAX_DIPENDENTI];

ove:
* La variabile `dipendenti` registra i dati di 10 camionisti dell’azienda. 
* La variabile `litriConsumati` serve per tenere traccia del numero di litri di carburante consumati da ciascun camionista (il camionista nella posizione i-esima in `dipendenti` corrisponde al consumo di carburante indicato nella stessa posizione i-esima in `litriConsumati`).

Si risponda alle seguenti tre domande: 

1.	si scriva un frammento di codice per scorrere la variabile `dipendenti` e per stimare il numero di litri di carburante consumati da ogni camionista. Tale valore deve quindi essere salvato nella posizione corrispondente del vettore `litriConsumati`. 

	**Spazio soluzione:**
	
		float totKm;
	
		for(i = 0; i < MAX_DIPENDENTI; i++)
		{
		  totKm = 0;
		  for(l = 0; l< dipendenti[i].numTrasportiEffettuati; l++)
		  {
		     totKm = dipendenti[i].listaTrasporti[l].numeroKm + totKm;
		  }
		  litriConsumati[i] = totKm/dipendenti[i].kmPerLitro;
		}

2.	Si dichiari una seconda variabile `dipendentiNormali` e vi si copi, senza lasciare buchi, tutti i dipendenti che non hanno mai fatto un trasporto speciale (identificato dal valore dell’apposito campo della struttura).

	**Spazio soluzione:**
	
		int j=0;
		boolean normale;
		for(i = 0; i < NUM_DIPENDENTI; i++)
		{
		    normale = vero;
		    for(l = 0; l < dipendenti[i].numTrasportiEffettuati && normale == vero; l++)
		    {
		        if(dipendenti[i].listaTrasporti[l].trasportoSpeciale == vero)
		           normale = falso;
		    }
		    if(normale)
		    {    
		        dipendentiNormali[j] = dipendenti[i];
		        j++;
		    }   
		}


3.	Si stampi a schermo il numero dei dipendenti che non hanno mai fatto un trasporto speciale, seguito dal nome e cognome di ciascuno di questi.

	Esempio di stampa:
	
		2 Dipendenti non hanno mai fatto trasporti speciali:
		Mario Rossi
		Paolo Bianchi

	**Spazio soluzione:**
		
		numeroDipNormali = j;
		printf("%d Dipendenti che non hanno mai fatto un trasporto speciale: \n", numeroDipNormali);
		for(i = 0; i < numeroDipNormali; i++)
	    	printf("\n%s %s", dipendentiNormali[i].nome, dipendentiNormali[i].cognome);
	


### Esercizio 2

Si consideri una versione semplificata della battaglia navale in cui le navi possono essere posizionate solo in orizzontale e ogni riga può contenere al massimo una nave. 

Il campo di gioco di un singolo giocatore può essere rappresentato tramite la matrice `CampoGioco` di dimensione 5x5 in cui ogni cella della matrice può assumere solo il valore 0 o 1. Il valore 0 rappresenta la presenza del mare e il valore 1 la presenza di un pezzo di nave. Le navi possono essere lunghe una, due, tre, quattro o cinque celle.
Ad esempio la seguente istanza della matrice `CampoGioco` rappresenta un campo di gioco in cui sono presenti 4 navi: una nave lunga 4 nella prima riga, una nave lunga 1 nella terza riga, una nave lunga 2 nella quarta riga e una nave lunga 4 nella quinta riga:

	0	1	1	1	1
	0	0	0	0	0
	0	0	0	1	0
	1	1	0	0	0
	1	1	1	1	0

Si realizzi uno script Matlab che: 

* chiede all’utente di inserire il contenuto della matrice `CampoGioco`
* per ogni riga che contiene una nave visualizza a video il numero di riga e la lunghezza della nave presente al suo interno
* visualizza a video inoltre le seguenti statistiche: 
	- il numero di navi presenti sul campo di gioco
	- la lunghezza della nave più corta presente sul campo di gioco
	- la lunghezza della nave più lunga presente sul campo di gioco
	- il numero di navi trovate per ogni lunghezza possibile. 
        
**Esempio**
Un esempio di output a video atteso per la matrice d’esempio CampoGioco di cui sopra e' il seguente:

	La riga 1 contiene una nave lunga 4
	La riga 3 contiene una nave lunga 1
	La riga 4 contiene una nave lunga 2
	La riga 5 contiene una nave lunga 4
	
	Sono presenti 4 navi
	Lunghezza nave più corta trovata:  1
	Lunghezza nave più lunga trovata: 4
	Numero di navi lunghe 1: 1
	Numero di navi lunghe 2: 1
	Numero di navi lunghe 3: 0
	Numero di navi lunghe 4: 2
	Numero di navi lunghe 5: 0

**Spazio soluzione:**

	CampoGioco=input('Inserisci il campo di gioco: ');
	 
	lunghezzaNaviRighe=sum(CampoGioco,2);
	 
	righeConNavi=find(lunghezzaNaviRighe~=0);
	 
	for riga=righeConNavi'
	    disp(['La riga ' num2str(riga) ' contiene una nave lunga ' num2str(lunghezzaNaviRighe(riga))]);
	end
	 
	disp(['Sono presenti ' num2str(size(righeConNavi,1)) ' navi']);
	 
	disp(['Lunghezza nave più corta trovata: ' num2str(min(lunghezzaNaviRighe(lunghezzaNaviRighe~=0)))]);
	 
	disp(['Lunghezza nave più lunga trovata: ' num2str(max(lunghezzaNaviRighe))]);
	 
	 
	for lunghNave=1:5
		disp(['Numero di navi lunghe ' num2str(lunghNave) ': ' num2str(sum(lunghezzaNaviRighe==lunghNave))]);
	end


