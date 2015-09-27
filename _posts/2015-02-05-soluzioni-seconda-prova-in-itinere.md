---
title: Soluzioni seconda prova in itinere
date: 2015-02-05 17:19:20

layout: post
category : infob
tags : ['prova in itinere'] 
---



In un cinema di Milano la temperatura nella sala è regolata in modo automatico. Un sensore monitora la temperatura rilevando un valore ogni minuto mentre
la caldaia si accende solo quando la temperatura rilevata è inferiore a una certa soglia e si spegne non appena viene raggiunta tale soglia. 

I valori letti vengono troncati a due cifre decimali, inseriti in un array `temp` e salvati in un file dati di Matlab chiamato `log.txt`.

Un esempio di valori contenuti nel file `log.txt` è il seguente:

```
22.00  22.50  23.20  21.45  22.00  22.35  23.00  23.40
```

## Domanda 1
Scrivere in Matlab una funzione `calcolaCosto` che: 

* riceve in ingresso un vettore di temperature `temperature`, un valore soglia `soglia` e un parametro `costoAlMinuto` che indica il costo al minuto del gas consumato dalla caldaia;

* restituisca il costo totale `costoTotale` del gas consumato e un vettore `minutiAccesa` con i minuti nei quali la caldaia è rimasta accesa. Per il costo totale, tenere anche presente che se il totale dei minuti nei quali la caldaia ha funzionato supera i 30 minuti, allora il costo del gas consumato dalla caldaia va diminuito del 20%.

Ad esempio, nel caso la funzione `calcolaCosto` riceva in ingresso il valori di temperatura contenuti nel file `log.txt`, una soglia di temperatura pari a 23.00 e un valore di `costoAlMinuto` pari a 100, ritornerà un costo totale di 500 e `minutiAccesa = [1 2 4 5 6]`.   


### Soluzione:

```matlab
function [costoTotale,minutiAccesa] = calcolaCosto(temp, soglia, costoAlMinuto)
    minutiAccesa = find(temp < soglia);
    if (length(minutiAccesa) > 30)
        costoTotale = length(minutiAccesa) * costoAlMinuto * 0.80;
    else
        costoTotale = length(minutiAccesa) * costoAlMinuto;
    end
end
```

## Domanda 2

Scrivere  uno script che:

* definisca il valore della soglia di temperatura (`soglia`) e il valore del parametro `costoAlMinuto` richiedendoli all'utente. 
* Legga dal file `log.txt` i valori di temperatura contenuti nell’array `temp`;
* disegni il grafico (con titolo del grafico e dei due assi) della temperatura al variare del tempo, evidenziando sul grafico stesso: _a)_ la temperatura soglia con una retta orizzontale nera a doppio spessore; _b)_ i minuti nei quali la caldaia ha funzionato, marcandoli con il simbolo 'X' rosso (senza congiungerli).
* stampi a video il costo totale del gas consumato e i minuti nei quali la caldaia è rimasta accesa.

### Soluzione:

```matlab
load log.mat temp; 
soglia = 25;
costoAlMinuto = 10;
x = 1:size(temp, 2);
figure
hold on
ylabel('temperatura');
xlabel('minuto');
title('Temperatura sala');
plot(x, temp);
y = soglia * ones(size(x));
plot(x, y, 'k', 'LineWidth', 2);
indici = find(temp < soglia);
temp1 = temp(indici);
x1 = x(indici);
plot(x1, temp1, 'Xr');
    
[costoTotale, minutiAcceso] = calcolaCosto(temp, soglia, costoAlMinuto);

disp(['Costo totale del gas consumato: ', num2str(costoTotale), ' Euro.']);
disp('La caldaia ha funzionato nei seguenti minuti: ');
disp(minutiAcceso);
```


# Esercizio 2 (6 punti)

Si considerino i seguenti esempi di matrici costruite da "quadrati concentrici":


```matlab
matr1 = 
     2     2     2     2     2     2
     2     3     3     3     3     2
     2     3     4     4     3     2
     2     3     4     4     3     2
     2     3     3     3     3     2
     2     2     2     2     2     2
```



```matlab
matr2 =
     2     2     2     2     2
     2     5     5     5     2
     2     5     1     5     2
     2     5     5     5     2
     2     2     2     2     2
```


Come si vede dagli esempi, si tratta di matrici quadrate in cui i valori che si trovano sulla n-esima riga, n-esima colonna, e sulle righe e colonne simmetriche a queste sono uguali tra loro.

## Domanda 1

Si sviluppi in Matlab una funzione ricorsiva `quadratiConcentrici` che, data una generica matrice, restituisca 1 se la matrice è costituita da quadrati concentrici, 0 altrimenti. 


Per sviluppare questa funzione si assuma di avere a disposizione la funzione `valoriDiCorniceUguali` che, data una matrice quadrata, restituisce 1 se tutti i valori disposti sulla sua cornice esterna (costituita dalla prima e dall’ultima riga e dalla prima e dall’ultima colonna) sono uguali tra loro, 0 altrimenti. Per esempio: `valoriDiCorniceUguali(matr1)` restituisce 1.

NB: non si chiede di sviluppare valoriDiCorniceUguali. Ci si focalizzi solo sulla funzione ricorsiva.

### Soluzione:


```matlab
function [ris] = quadratiConcentrici(m)
    [r, c] = size(m);
    if r ~= c 
        ris = false;
    else
        if r == 1 || r == 0
            ris = true;
        else
            if valoriDiCorniceUguali(m)
                ris = quadratiConcentrici(m(2:end-1, 2:end-1));
            else 
                ris = false;
            end
        end
    end
end

```

# Esercizio 3 

Si considerino due calcolatori aventi le seguenti configurazioni:

* __Configurazione A__

    * 1 Mbyte di memoria fisica e pagine di memoria da 4 Kbyte

    * una memoria cache con hit rate di 0.8, hit time di 50 ns e miss penalty di 150 ns

* __Configurazione B__

    * indirizzo di memoria fisica a 24 bit e pagine di memoria da 64 Kbyte

    * una memoria cache con hit rate di 0.9, hit time di 40 ns e miss penalty di 250 ns

## Domanda 1
Quali dei due dispositivi ha il maggior numero di pagine di memoria fisica? Perchè?

> Nessuno dei due dispositivi; entrambi hanno lo stesso numero di pagine di memoria fisica (2^8), infatti:
> 
> * La configurazione A ha 20 bit di memoria fisica indirizzabile (1 Mbyte = 2^20), e 12 bit di offset (2^12=4K).
> * La configurazione B ha 24 bit di memoria fisica indirizzabile, di cui 16 dedicati all’offset all’interno della pagina.

## Domanda 2
Quale dei due avrà maggiore memoria virtuale?

> Le informazioni fornite non ci permettono di risalire al numero di pagine virtuali né della configurazione A né della B.

## Domanda 3
In quale dei due dispositivi l'accesso alla memoria è più rapido?

> La configurazione B è più veloce, infatti:
> 
> * Tempo medio di accesso di A = 0.8 * 50 ns + 0.2 * 150 ns = 70 ns
> * Tempo medio di accesso di B = 0.9 * 40 ns + 0.1 * 250 ns = 61 ns

## Domanda 4
Si consideri ora il dispositivo più lento: qual è l’hit rate minimo che dovrebbe avere per essere rapido almeno quanto l'altro?

> Se hit rate = \\(h\\), si dovrà avere: 
> 
> \\(h \times 50 + (1-h) \times 150 \leq 61\\), ovvero
> 
> \\(- 100 \times h \leq - 89\\), quindi
> 
> \\(h \geq 0.89\\).
> 

