---
layout: post
title:  "Script básico de automação de busca de IP no Virus Total"
author: Evs
categories: [ Virus Total, automação, python]
image: assets/images/post2.png
featured: true
hidden: true
excerpt: "Desenvolvimento de script Python para automatizar consultas na API do VirusTotal e otimizar workflows de CTI."
---

## Intro

Após minhas aventuras pela CTI e suas ferramentas, descobri que o Virus Total possui uma API e que eu poderia usá-la para automaizar minhas buscas e torná-las mais rápidas e fáceis. Bem, ao final a busca realmente se tornou mais rápida e fácil, mas desenvolver a solução não foi tão fácil assim.

Como já adiantei, resolvi desenvolver um script para automatizar minhas buscas no **Virus Total**. Primeiramente pensei em usar *bash*, mas como tive pouco contato cheguei à conclusão que talvez eu fosse complicar (sem necessidade) um problema fácil de solucionar. Depois, fiquei entre usar *JavaScript*, o qual usei por alguns anos como desenvolvedora front-end, e *Python*, o qual usei bastante em um mestrado em Ciências da Computação que nem cheguei a terminar.

Acabei decidindo em usar *Python*, pois acho uma linguagem "acessível" e organizada, além de ser um pouco mais *user friendly*. A verdade é que estou enferrujadíssima na programação e eu queria uma solução rápida, já que meu foco não é programar e sim usar a programação como uma ferramenta (não uma complicação a mais).

Aqui contarei um pouco da minha saga com esse processo de *reconexão* com a programação e os conhecimentos que (re)adquiri.

## Metodologia

### Seleção dos termos da consulta de IP

Primeiro, busquei pela API e quais [resultados](https://docs.virustotal.com/reference/ip-object) ela traria numa consulta de IP. Escolhi as que me pareciam mais importantes. Na tabela abaixo estão cada termo selecionado e justificativa.

| Termos | Justificativa |
| - | - |
| jarm | Identificação do fingerprint do TLS usado, ajuda a detectar servidores clonados, hots maliciosos, etc.  |
| as_owner | Nome do dono do sistema autônomo (ASN) responsável pelo IP, como um provedor por exemplo. |
| country | Geolocalização do IP. Nem sempre é confiável por conta do uso de proxies e VPN. |
| last_https_certificate_date | Timestamp do último certificado HTTPS do IP. É útil para verificar se o servidor está atualizado, ativo ou se o certificado acabou de ser modificado para mascarar atividades maliciosas. |
| last_analysis_stats | Estatísticas do último scan no Virus Total. As engines marcam como: <br> - harmless <br> - malicious <br> - suspicious <br> - undetected |
| reputation | Score geral do IP. |
| total_votes | Votos contabilizados pelo feedback da comunidade. | 
| whois | Resultados do WHOIS |

### Formatação do retorno

O `data` retornado pela busca na API é um objeto, então é necessário tratar estes dados. Além de tratar também o timestamp em `last_https_certificate_date`. No caso do timestamp, também fiz um tratamento de erro caso não fosse encontrado nenhum timestamp no retorno.

### Problemas encontrados no WHOIS

Percebi que algumas vezes o WHOIS vinha completo, e outra vinha apenas com uma ID. Foi então que percebi que precisava de uma função assíncrona para poder retornar os dados completos dessa busca. Também resolvi buscar por termos específicos no WHOIS, tendo em vista tudo o que ele pode retornar em uma consulta.

Continuei com problemas na busca do WHOIS, a função async não foi suficiente, e os resultados do script vinham inconsistentes, até que encontrei um padrão: na primeira consulta, os dados de WHOIS não estão prontos, obtendo apenas o timestamp da busca, mas na consulta seguinte a consulta WHOIS da API já está preparada. Não consegui ultrapassar esse problema, mesmo colocando 3 tentativas de consulta no código, a solução foi *Rodar o script uma segunda vez, caso a primeira consulta não retorne WHOIS*, mas funciona.

## Resultados

### Script

Aqui o script: [https://github.com/e-v-s/VT-script](https://github.com/e-v-s/VT-script)

### Resultado da primeira consulta - sem WHOIS :(

```
==================================================
Resultados da Consulta no VirusTotal
==================================================
IP consultado: 8.8.8.8
--------------------------------------------------
Buscando informações básicas do IP...
JARM: 29d3fd00029d29d00042d43d00041d598ac0c1012db967bb1ad0ff2491b3ae

AS_OWNER: GOOGLE

COUNTRY:

LAST_HTTPS_CERTIFICATE_DATE: 2025-07-06 05:33:21

LAST_ANALYSIS_STATS:
  • malicious: 0
  • suspicious: 0
  • undetected: 32
  • harmless: 62
  • timeout: 0

REPUTATION: 549

TOTAL_VOTES:
  • harmless: 229
  • malicious: 44

WHOIS:
  Aguardando processamento dos dados de WHOIS...
  Não existem campos importantes de WHOIS

==================================================
Consulta finalizada
==================================================
```

### Resultado da segunda consulta - com WHOIS :)

```
==================================================
Resultados da Consulta no VirusTotal
==================================================
IP consultado: 8.8.8.8
--------------------------------------------------
Buscando informações básicas do IP...
JARM: 29d3fd00029d29d00042d43d00041d598ac0c1012db967bb1ad0ff2491b3ae

AS_OWNER: GOOGLE

COUNTRY: US

LAST_HTTPS_CERTIFICATE_DATE: 2025-07-06 05:33:21

LAST_ANALYSIS_STATS:
  • malicious: 0
  • suspicious: 0
  • undetected: 32
  • harmless: 62
  • timeout: 0

REPUTATION: 549

TOTAL_VOTES:
  • harmless: 229
  • malicious: 44

WHOIS:
  • netrange: 8.8.8.0 - 8.8.8.255
  • netname: GOGL
  • organization: Google LLC (GOGL)
  • updated: 2019-10-31
  • orgname: Google LLC
  • orgid: GOGL
  • country: US
  • orgabusehandle: ABUSE5250-ARIN
  • orgabusename: Abuse
  • orgabusephone: +1-650-253-0000
  • orgabuseemail: network-abuse@google.com
  • orgabuseref: https://rdap.arin.net/registry/entity/ABUSE5250-ARIN
  • orgtechhandle: ZG39-ARIN
  • orgtechname: Google LLC
  • orgtechphone: +1-650-253-0000
  • orgtechemail: arin-contact@google.com
  • orgtechref: https://rdap.arin.net/registry/entity/ZG39-ARIN

==================================================
Consulta finalizada
==================================================
```

## Conclusão

Bem, a consulta atende às minhas necessidades. Apesar de ter que rodar o script uma segunda vez para obter os dados do WHOIS (em alguns casos), acredito que o script está ok, funciona.

Pretendo agora implementar uma solução de URL com a API do URLscan.io e também usar a API da Falcon sandbox para analisar links maliciosos.
