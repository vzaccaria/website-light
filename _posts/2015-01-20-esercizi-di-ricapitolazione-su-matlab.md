---
title: Esercizi di ricapitolazione su Matlab
date: 2015-01-20 18:54:16

layout: post
category : infob 
tags : ["esercizi"] 
---

# Esercizio su matrice

Si scriva in Octave/MATLAB la funzione `analisiMatrice` che:
ricevendo come parametro una matrice `a`, verifica che i suoi valori
NON siano tutti uguali. Se questo è verificato:

- calcola il valore medio `ma` degli elementi di `a` (la somma di tutti gli elementi di `a` divisa per il loro numero);
- calcola e restituisce al chiamante il numero `NM` degli elementi di `a` maggiori di `ma`;
- calcola e restituisce al chiamante il numero `Nm` degli elementi di `a` minori di `ma`;
- calcola e restituisce al chiamante il valore medio `mMag` degli (`NM`) elementi di `a` maggiori di `ma`;
- calcola e restituisce al chiamante il valore medio `mMin` degli (Nm) elementi di `a` minori di `ma`;
- calcola e restituisce al chiamante il valore `val = NM*mMag-Nm*mMin`.

Se invece i valori della matrice sono tutti uguali la funzione, dopo aver fatto questa verifica, non calcola i valori sopra indicati, ma si limita ad assegnare a tutti i parametri in uscita il valore 0.

```matlab
function [NM Nm mMag mMin val] = analisiMatrice(a)
    if (all(all(a == a(1,1))))
     NM=0; Nm=0; mMag=0; mMin=0; val=0;
     return
    end
    [R,C] = size(a);
    ma = mean(mean(a));
    NM = sum(sum(a>ma));
    Nm = sum(sum(a<ma));
    mMag = sum(a(a>ma))/NM;
    mMin = sum(a(a<ma))/Nm;
    val = NM*mMag-Nm*mMin;
```


# Esercizio su database

Si scriva uno script che legga da file l’archivio sulla produttività (utilizzando la funzione predefinita `textread`) e inserisca i dati letti in un array di strutture. 

Tale array deve contenere, per ogni dipendente, una struttura con un campo `nome` per memorizzare il nome del dipendente, un campo `ore` per il numero medio di ore, e un campo `contratti` per il numero di contratti. 

Successivamente lo script deve calcolare, per ogni dipendente, lo stipendio, memorizzandolo in un opportuno campo di nome stipendio aggiunto alla struttura che già contiene gli altri dati. Lo stipendio viene calcolato in base ad un coefficiente di produttività:

1. Se il lavoratore ha lavorato meno di 7 ore, `coeff` è pari a 5
2. Se ha lavorato più di 12 ore, `coeff` è pari a 6
3. Altrimenti `coeff` è pari a 6

Per calcolare lo stipendio complessivo:

1. Lo stipendio è pari a `coeff * ore * 24 *`
2. Bonus di 500 euro per chi ha fatto piu' di 47 contratti
 
Si chiede di stampare a video il numero dei dipendenti che, pur lavorando più di 12 ore al giorno (in media), guadagnano meno della media dei dipendenti.

**Soluzione**:

```matlab
[nomi ore contratti] = textread('prod.dat', '%s %f %f');

% `dipendente`: crea una struttura dati dipendente dagli argomenti
function [dip] = dipendente(nome, ore, contratti)
    dip.nome = nome;
    dip.ore = ore;
    dip.contratti = contratti;
end

% `retribuzione`: calcola la retribuzione per dipendente
function [dip] = retribuzione(dip)
    coeff = 10;
    if dip.ore < 7
        coeff = 5;
    else 
        if dip.ore > 12 
            coeff = 6;
        end
    end

    dip.stipendio = dip.ore * 24 * coeff;

    if dip.contratti >= 48
        dip.stipendio = dip.stipendio + 500;
    end
end

for i=1:length(nomi)
    dipendenti(i) = dipendente(nomi(i), ore(i), contratti(i));
end

dipendenti = arrayfun(@retribuzione, dipendenti)
mediastip = mean([dipendenti.stipendio])

% `filtra`: filtra un array in base ad una condizione
function [ret] = filtra(condizione, array)
    ret = array(find(arrayfun(condizione, array) == 1));
end

filtrati = filtra(@(d)(d.ore > 12 && d.stipendio < mediastip), dipendenti)

function stampa(dip)
    printf("Nome: %s, stipendio: %d, ore %d, contratti %d \n", char(dip.nome), dip.stipendio, dip.ore, dip.contratti);
end

arrayfun(@stampa,filtrati);
```

Scoperto l'inghippo della stringa `nome`. Quando viene letta dal file, viene trasformata in una [stringa-array di celle](https://www.gnu.org/software/octave/doc/interpreter/Cell-Arrays-of-Strings.html). Per convertirla in stringa semplice, si usa la funzione `char()`.



