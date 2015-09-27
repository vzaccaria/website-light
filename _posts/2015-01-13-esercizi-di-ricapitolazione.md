---
title: Esercizi di ricapitolazione
date: 2015-01-13 18:20:51

layout: post
category : infob 
tags : ["lezione"] 
---

# Battaglia navale

Si consideri una versione semplificata della battaglia navale in cui le navi possono essere posizionate solo in orizzontale e ogni riga può contenere al massimo una nave. 

Il campo di gioco di un singolo giocatore può essere rappresentato tramite la matrice `CampoGioco` di dimensione 5x5 in cui ogni cella della matrice può assumere solo il valore 0 o 1. Il valore 0 rappresenta la presenza del mare e il valore 1 la presenza di un pezzo di nave. Le navi possono essere lunghe una, due, tre, quattro o cinque celle.
Ad esempio la seguente istanza della matrice `CampoGioco` rappresenta un campo di gioco in cui sono presenti 4 navi: una nave lunga 4 nella prima riga, una nave lunga 1 nella terza riga, una nave lunga 2 nella quarta riga e una nave lunga 4 nella quinta riga:

```
  0 1 1 1 1
  0 0 0 0 0
  0 0 0 1 0
  1 1 0 0 0
  1 1 1 1 0
```

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

```matlab
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
```


\\newpage


# Mercato

Una signora al mercato compra un sacchetto di mele, che purtroppo le cade durante il tragitto verso casa. Il commerciante si offre di darle un altro sacchetto contenente lo stesso numero di mele del precedente e le chiede quindi quale fosse questo numero. La signora, abilissima negli indovinelli matematici, risponde così:

* Organizzandole in file da 5 mele, ne rimangono fuori 2
* Organizzandole in file da 7 mele, ne rimangono fuori 3

Quanto indicato dalla signora è rappresentabile dalle seguenti equazioni, dove \\(m\\) è il numero di mele che vogliamo trovare:

$$
\\left\\{
\\begin{array}{ccc}
\\textrm{mod}(m,5) & = & 2 \\\\
\\textrm{mod}(m,7) & = & 3 \\\\
\\end{array}
\\right.
$$

Le equazioni di sopra sono un'esempio di _equazione alle congruenze_: 

$$
\\left\\{
\\begin{array}{ccc}
\\textrm{mod}(m,a) & = & w_1 \\\\
\\textrm{mod}(m,b) & = & w_2 \\\\
\\end{array}
\\right.
$$
Che ci porta finalmente ad una delle soluzioni: 

$$
m = b \times w_1 \times y + a \times w_2 \times x
$$

Dove \\(x\\) e \\(y\\) sono calcolati con l'**algoritmo esteso di euclide** (nota bene: la funzione è ricorsiva e calcola contemporaneamente una coppia di valori): 

$$
(x, y) = \\textrm{calcolaCoeff}(a, b) = \\left\\{
\\begin{array}{cc}
(1, 0)     & \\textrm{quando}~(b=0) \\\\
(r_x, r_y) & \\textrm{negli altri casi} \\\\
\\end{array}
\\right. 
$$

dove:

$$
\\begin{array}{rcl}
r_x        & =  & t_y \\\\
r_y        & =  & t_x - t_y * (a ~ \\textrm{div} ~ b) \\\\
(t_x, t_y) & =  & \\textrm{calcolaCoeff}(b, a ~ \\textrm{mod} ~ b) \\\\
\\end{array}
$$

Si noti che \\(a ~ \\textrm{div} ~ b\\) rappresenta la divisione intera tra due numeri \\(a\\) e \\(b\\), e \\(a ~ \\textrm{mod} ~ b\\) rappresenta il calcolo del resto della divisione intera del valore di \\(a\\) per il valore di \\(b\\).

## Domanda 1

Implementare la funzione `calcolaCoeff` in Matlab/Octave (si usi `fix(a/b)` per la divisione intera):

**Soluzione** 

```octave
function [x, y] = calcolaCoeff(a, b)
    if b == 0
        x = 1;
        y = 0;
    else
        [x1, y1] = calcolaCoeff(b, mod(a,b))
        x = y1;
        y = x1 - y1 * (fix(a/b));
    end
end
```

## Domanda 2 

Si chiede di scrivere una funzione matlab che riceve i valori \\(a\\), \\(b\\), \\(w_1\\) e \\(w_2\\) e calcoli il valore risultante delle mele \\(m\\) utilizzando la funzione di cui sopra:

**Soluzione** 


```octave
function [m] = numero_di_mele(a,b,w_1,w_2)
    [ x, y ] = calcolaCoeff(a, b) 
    c1 = b*w_1*y
    c2 = a*w_2*x
    m = (c1 + c2) 
end
```

## Domanda 3
Come invochereste la funzione `numero_di_mele` per risolvere il problema iniziale della signora del mercato? Quante mele verrebbero calcolate?

**Soluzione** 

```octave
> numero_di_mele(5, 7, 2, 3) 
ans = 17
```

# Cosa fa questa funzione

Si considerino la funzione e lo script seguenti:

```matlab
function [r] = MiaFunz(a, b)
  if b == 0
      r = 1;
  else
      r = a * MiaFunz(a, b-1);
  end;
```


```matlab
%script che chiama MiaFunz
MiaFunz2 = @(x,y)1/MiaFunz(x,-y);

x = 2;
for y = -2:1:4
  if y < 0
    r = MiaFunz2(x,y)
  else 
    r = MiaFunz(x,y)
  end
end
```


1. Descrivere brevemente quale sia la funzione matematica calcolata dalla funzione  MATLAB MiaFunz. Giustificare la risposta.

> La funzione matematica calcolata dal programma è x^y 

2. Quali risultati vengono stampati a video? Non è necessario calcolare i valori numerici esatti, ma è sufficiente riportare le espressioni artimetiche necessarie per calcolarli. Giustificare la risposta.


> I risultati stampati a video sono:
> 
> ```
> 0.25
> 0.5
> 1
> 2
> 4
> 8
> 16
> ```

 
