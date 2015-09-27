---
title: Funzioni ricorsive
date: 2014-12-12 11:20:07

layout: post
category : infob 
tags : ["lezione", "funzioni ricorsive", "esercizi"] 
---

# Funzioni ricorsive
 
Ecco i links al materiale sugli argomenti trattati oggi e su ulteriori approfondimenti sul linguaggio Matlab:

* [Funzioni ricorsive e anonime (completo)](http://www.vittoriozaccaria.net/deposit/11_matlab_array_struct_funzioni.pdf).
* [Operazioni sui files](http://www.vittoriozaccaria.net/deposit/13_matlab_files.pdf).

Di seguito, gli esercizi visti oggi sulle funzioni ricorsive:



## Calcolo della cifra di un numero

L'esercizio e' composto da due punti; nelle soluzioni non è consentito l’uso della funzione `num2str` di Matlab/Octave:

1. Scrivere la funzione ricorsiva `cifra()` che riceve come parametri due numeri interi `num` e `k` (si supponga che entrambi i numeri siano sempre strettamente positivi). La funzione `cifra` restituisce la `k`-esima cifra del numero `num` a partire da destra.

   Esempi:
   
   * `cifra(1456, 1)` deve restituire 6
   * `cifra(5136, 4)` deve restituire 5
   * `cifra(512, 2)` deve restituire 1
   
    ```octave
    function ris = cifra(num, k)
        if k == 1
            ris = mod(num, 10);
        else
            ris = cifra(floor(num/10), k-1);
        end
    ```
   
2. Riscrivere la funzione ricorsiva del punto precedente in modo tale che nel caso in cui `k` sia maggiore del numero effettivo di cifre che compongono `num` la funzione restituisca -1.

    ```octave
    function ris = cifraConControllo(num, k)
        if (k > 1 && num < 10)
            ris = -1
        else
            if k == 1
                ris = mod(num, 10);
            else
                ris = cifraConControllo(floor(num/10), k-1);
            end
        end
    ```

## Comprensione funzione

Si consideri la seguente funzione in codice Matlab:

    function r = f(a)
    
        if a == 0
          r = [];
        else
          r = [f(floor(a/2)) mod(a,2)];
        end

1. Qual è il valore ritornato dalla chiamata `f(5)`?

    **Spazio soluzione:**
    
    Valore risultante: `[1 0 1]`

2. Qual è il valore ritornato dalla chiamata `f(10)`?

    **Spazio soluzione:**
    
    Valore risultante: `[1 0 1 0]`


3. Ipotizzando che la funzione `f(a)` venga chiamata con un argomento a intero e positivo, descrivere sinteticamente cosa calcola la funzione

    **Spazio soluzione:**

    La funzione `f(a)` calcola le cifre della codifica binaria del numero `a`. 


# Matrice con frazioni

Si assuma di avere una matrice di 2 righe ed un numero arbitrario di colonne, ad esempio:

<div> \begin{equation} M = \left[\begin{array}{ccc} 1 & 3 & 1  \\\\ 2 & 4 & 3  \\\\ \end{array} \right] \end{equation} </div>

Ogni colonna della matrice rappresenta una frazione (ad esempio, per `M`): 

<div> \begin{equation} \frac{1}{2}, \frac{3}{4}, \frac{1}{3} \end{equation} </div>

Si scriva una funzione __ricorsiva__ `frac` che, ricevuta una qualsiasi matrice `M` in ingresso, ritorni il numeratore `n` ed il denominatore `d` della frazione risultante dalla somma delle frazioni contenute in `M`. 

Ad esempio:

    [n d] = frac([1 3 1; 2 4 3])

ritorna

    n = 19
    d = 12

poichè:

<div> \begin{equation} \frac{1}{2} + \frac{3}{4} + \frac{1}{3} = \frac{12 \times 1 + 6 \times 3 + 2 \times 4}{2 \times 4 \times 3} = \frac{19}{12} \end{equation} </div>


La frazione deve essere minimizzata, ovvero non vi devono essere divisori comuni tra `n` e `d`. Nel progettare `frac`, si può utilizzare la funzione `gcd(a,b)` che ritorna il massimo comun divisore tra `a` e `b`.

__Spazio soluzione__

```octave
function [n, d] = frac(M)
    if size(M,2) == 1
        n = M(1,1);
        d = M(2,1);
    else 
        [c d] = frac(M(:,2:end));
        a = M(1,1);
        b = M(2,1);

        k = a*d + c*b;
        l = b * d;

        n = k/gcd(k,l);
        d = l/gcd(k,l);
    end
end
```


