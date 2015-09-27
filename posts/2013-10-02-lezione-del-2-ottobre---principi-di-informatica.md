---
title: Lezione del 2 Ottobre - Principi di Informatica
date: 2013-10-02 14:31:25

layout: post
category : infob 
tags : ["lezione", "compilatori", "linguaggi", "pseudocodice"] 
---

Giornata molto piena di nozioni oggi, eh? Eccovi un pò di informazioni e link su ciò che abbiamo visto oggi (mi raccomando, partecipate al sondaggio alla fine di questo post).

Per i miei contatti, vi rimando alla sezione ['contatti'](http://www.vittoriozaccaria.net/lectures/infob/infob_contacts.html) di questo sito. Stessa cosa per quanto riguarda [il programma del corso](http://www.vittoriozaccaria.net/lectures/infob/programma.html).

## I fondamenti

[In queste slide pdf](http://www.vittoriozaccaria.net/deposit/01_introduzione_informatica.pdf) potrete trovare un riassunto di ciò di cui vi ho parlato oggi. In particolare ricordatevi questi concetti:[^1]

* [Compilatore](http://it.wikipedia.org/wiki/Compilatore)
* [Assemblatore](http://it.wikipedia.org/wiki/Assembler)
* [Linguaggio macchina](http://it.wikipedia.org/wiki/Linguaggio_macchina)

## Giocare con la conversione da linguaggio C a linguaggio macchina

Per quelli di voi che strabuzzavano gli occhi oggi, ecco il link al sito dove potete compilare per x86 e ARM (iPhone) dei semplici programmi.[^2]

* [Link al sito di compilazione da C ad Assembly e Linguaggio Macchina](http://assembly.ynh.io/)

 [^1]:Vi lascio dei link wikipedia, ma fate una ricerca più approfondita. 
 [^2]:Mi raccomando, non sovraccaricate il server. 

## Esecuzione passo passo dei programmi

Come vi dicevo, il sistema di didattica che avete visto oggi non e' ancora disponibile online. Nel frattempo, ecco lo pseudocodice dell'algoritmo che permette di controllare se, dati i voti dei compitini, avete passato l'esame completo:[^3]

    var voto1 = 9;
    var voto2 = 9;

    if (voto1 >= 8)
    {
        if(voto2 >= 8)
        {
            if(voto1 + voto2 >= 18)
            {
                var passato = 1 // Ha passato il l'esame
            }
            else
            {
                var passato = 0 // Non ha passato l'esame
            }
        }
        else
        {
            var passato = 0 // Non ha passato l'esame
        }
    }
    else
    {
        var passato = 0 // Non ha passato l'esame
    }

Ricordatevi, `voto1` e `voto2` sono le variabili di ingresso del programma; `passato` e' la variabile di uscita calcolata dal programma stesso. Deve valere `1` se lo studente ha passato l'esame, `0` altrimenti.

## Ultime informazioni relative ai laboratori

Proprio oggi e' arrivata una comunicazione dai *servizi informatici di ateneo*. Se — durante il laboratorio — volete usare il vostro PC e' necessario che configuriate il PC secondo le istruzioni presenti [sul sito del politecnico](http://www.smartpc.polimi.it/virtual-desktop/).

## Sondaggio

Il sondaggio e' anonimo. Non e' necessaria alcuna registrazione.

<div class="iframe-wrapper"> 
    <iframe id="fs-survey-iframe" class="iframe-content" src="http://fluidsurveys.com/surveys/vittorio-HFF/lezione-del-2-ottobre-2013" scrolling="no" frameborder="0" >.
    </iframe>
</div>

 [^3]:Si, e' proprio quello che abbiamo visto oggi a lezione. 