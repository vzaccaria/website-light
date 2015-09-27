---
title: esercitazione di giovedi scorso su matlab, funzioni
date: 2013-12-09 11:56:49 
layout: post
category : infob 
tags : [ "esercizi", "funzioni in matlab" ] 
---


Ecco di seguito il materiale presentato nella esercitazione di giovedi' scorso:

Esercizio sui vettori:

    % Esercizio su vettori
    % Chiedere all'utente di inserire un numero e un vettore di numeri e 
    % calcolare le seguenti quantità:
    % - il numero di elementi del vettore uguali al numero dato
    % - il numero di elementi del vettore maggiori del valore dato
    % - il numero di elementi del vettore minori del valore dato

    disp('Programma per calcolare numero di elementi di vettore uguali,')
    disp('minori, e maggiori a un valore dato')

    v = input('Comunicami un array di numeri ');
    x = input('Comunicami un valore da cercare nell array ');

    %disp('il numero di elementi uguali al valore dato è')
    %sum(x==v)

    % per avere tutti i valori su un'unica riga posso scrivere
    a = sum(x==v);
    str = ['il numero di elementi del vettore uguali al valore dato è ' num2str(a)];
    disp(str)
    disp('posizioni nel vettore dei valori uguali al valore dato')
    find(x==v)
    % un modo alternativo per il calcolo di a è
    a = length(find(x==v));

    b = sum(x<v);
    str = ['il numero di elementi del vettore maggior del valore dato è ' num2str(b)];
    disp(str)
    disp('posizioni nel vettore dei valori maggiori al valore dato')
    find(x<v)
    % un modo alternativo per il calcolo di b è
    b = length(find(x<v));

    c = sum(x>v);
    str = ['il numero di elementi del vettore minori del valore dato è ' num2str(c)];
    disp(str)
    disp('posizioni nel vettore dei valori minori al valore dato')
    find(x>v)
    % un modo alternativo per il calcolo di c è
    c = length(find(x>v));

Esercizio su ordinamento:

    % Esercizio per casa

    % chiedere all'utente di inserire un array di numeri
    % ordinare l'array in modo crescente
    % (senza usare un doppio ciclo come visto nelle esercitazioni in C, ma usando un 
    %  solo ciclo e la concatenazione di vettori)

    % esempio di concatenazione di vettori
    a = [1 2]
    b = [2 4]
    c = [a b]

    % output sarà 
    % c = [1 2 2 4]

    % esempio di ciclo for:

    for indice=1:length(v)
       % istruzioni del ciclo
    end


    % suggerimento: 

    % fare un ciclo sugli elementi del vettore
    % ad ogni iterazione sostiture al vettore dato il vettore ottenuto concatenando in ordine:
    % i numeri più piccoli del numero in posizione i-esami, il numero in posizione i-esima,
    % e i numeri più grandi del numero in posizione i-esima.

    % successivamente comunicato un nuovo numero da parte dell'utente, inserirlo nell'array
    % nella posizione opportuna in modo che il vettore rimanga ordinato 



 
