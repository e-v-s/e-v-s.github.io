---
layout: post
title:  "Script básico de automação de busca no Virus Total"
author: Evs
categories: [ Virus Total, automação, python]
image: assets/images/post2.png
featured: true
excerpt: "Desenvolvimento de script Python para automatizar consultas na API do VirusTotal e otimizar workflows de CTI."
---

Após minhas aventuras pela CTI e suas ferramentas, descobri que o Virus Total possui uma API e que eu poderia usá-la para automaizar minhas buscas e torná-las mais rápidas e fáceis. Bem, ao final a busca realmente se tornou mais rápida e fácil, mas desenvolver a solução não foi tão fácil assim.

Como já adiantei, resolvi desenvolver um script para automatizar minhas buscas no **Virus Total**. Primeiramente pensei em usar *bash*, mas como tive pouco contato cheguei à conclusão que talvez eu fosse complicar (sem necessidade) um problema fácil de solucionar. Depois, fiquei entre usar *JavaScript*, o qual usei por alguns anos como desenvolvedora front-end, e *Python*, o qual usei bastante em um mestrado em Ciências da Computação que nem cheguei a terminar.

Acabei decidindo em usar *Python*, pois acho uma linguagem "acessível" e organizada, além de ser um pouco mais *user friendly*. A verdade é que estou enferrujadíssima na programação e eu queria uma solução rápida, já que meu foco não é programar e sim usar a programação como uma ferramenta a mais (não uma complicação a mais).

Aqui contarei um pouco da minha saga com esse processo de *reconexão* com a programação e os conhecimentos que (re)adquiri.

Meu racicínio foi primeiro buscar quais resultador a API traria numa consulta de IP.
