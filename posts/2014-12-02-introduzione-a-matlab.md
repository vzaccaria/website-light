---
title: Introduzione a Matlab
date: 2014-12-02 18:09:24

layout: post
category : infob 
tags : ["lezione"] 
---

# Strutture di controllo matlab

Innanzitutto, eccovi il link al materiale sulle [strutture di controllo in Matlab.](http://www.vittoriozaccaria.net/deposit/10_matlab_io_script.pdf). Il materiale comprende anche alcune funzioni di input/output utili per il futuro.

Quindi, eccovi gli esempi di programma scritti oggi:

## If/then/else

```matlab
a = 2;

if rem(a,2) == 0
    disp('a e` pari');
else
    disp('a e` dispari');
end
```


## Ciclo for

```matlab
for k = 1:10
    disp(num2str(k));
end
```

e poi Fibonacci:


```matlab
fib(1) = 1
fib(2) = 1

for k=3:20
    fib(k) = fib(k-1) + fib(k-2);
end

plot(1:20, fib)
```



## Ciclo while

```matlab
n = 1

while prod(1:n) < 1000
    n = n + 1
end

n-1
```