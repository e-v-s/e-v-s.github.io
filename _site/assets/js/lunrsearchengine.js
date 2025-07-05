
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/portfolio/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/portfolio/about",
    "title": "Évora Leite Portfolio",
    "body": "Essa sou eu bla bla bla Quer entrar em contato comigo?Github Linkedin E-mail "
    }, {
    "id": 2,
    "url": "http://localhost:4000/portfolio/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/portfolio/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                           CIT aplicada à análise de phishing corporativo - Parte 1                              :               Nesta primeira parte, teremos::                                                                                                                                                                       Evs                                04 Jul 2025                                                                                                                      All Stories:             "
    }, {
    "id": 4,
    "url": "http://localhost:4000/portfolio/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/portfolio/CTI-report-1/",
    "title": "CIT aplicada à análise de phishing corporativo - Parte 1",
    "body": "2025/07/04 - Nesta primeira parte, teremos:: 1 Introdução: 2 Contexto: 3 Objetivos: 1 IntroduçãoNo contexto atual da digitalização de processos corporativos, o e-mail permanece como um dos principais vetores de comunicação e ao mesmo tempo um dos mais explorados por agentes maliciosos. A engenharia social, aliada a técnicas cada vez mais sofisticadas de spoofing e clonagem de páginas legítimas, permite que atacantes influenciem usuários a revelar credenciais críticas ou a executar ações que comprometam a segurança organizacional. Este relatório apresenta a aplicação prática de Cyber ThreatIntelligence (CTI) para a análise de um e-mail de phishing direcionado a uma empresa de pequeno porte do setor de energia. Com base em ferramentas consolidadas como VirusTotal, Hybrid-Analysis e MITRE ATT&amp;CK, aliado ao uso de BurpSuite para inspeção manual, busquei identificar padrões de ataque, indicadores de comprometimento e vulnerabilidades exploradas. Ao explorar tanto o design do e-mail (pretexto, entrega e técnicas de spoofing), quanto o comportamento dinâmico de páginas clonadas e back-end malicioso, o documento tem como objetivo demonstrar os riscos inerentes à ausência de controles de autenticação de origem (SPF, DKIM, DMARC) e propõe um procedimento replicável de mitigação. Dessa forma, esta análise serve de base para fortalecer a postura de defesa contra campanhas de phishing futuras. 2 ContextoM Solutions (por motivos de confidencialidade usaremos um nomefictício) é uma empresa de automação e controle com foco emprogramação e comissionamento de ICS/SCADA. Há 10 anos usa um domínio e um provedor de email associado a este domínio. Até então nunca havia sofrido uma tentativa de phishing. A empresa recebeu um email com características de phishing durante o mês de março de 2025. Este email foi direcionado ao CEO da empresa, não foi detectado spam pelo provedor e tinha como pretexto informar ao alvo que várias tentativas de acesso à sua conta de email haviam sido detectadas. No primeiro dia de junho de 2025, mais um email foi recebido. Desta vez, informando que a conta de email do alvo iria ser desativada, e que seria necessário que o alvo acessasse um link para verificar a conta para que isto não ocorresse. Aqui temos um detalhe importante, o email foi enviado do mesmo domínio de email do alvo, mudando apenas o usuário. 3 ObjetivosEste relatório tem como objetivo principal usar ferramentas de Cyber Threat Intelligence (CTI) para pontuar os indicativosde phishing resultantes da análise do design do e-mail e da análise dos relatórios gerados pelas seguintes ferramentas:    Virus Total     Hybrid-Analysis     Mitre ATT&amp;CK     URLScan. io     BurpSuite  A partir do relatório gerado, estratégias de mitigação serão expostas para os possíveis malwares associados ao e-mail, como:    Verificação dos registros dos domínios;     Atualização do registro SPF;     Implementação do DKIM;     Implementação da política DMARC;     Monitoramento contínuo do servidor de e-mail.  Além disso, o relatório pode ser adotado como um procedimento a ser usado nas análises de phishing que a empresa possa, por ventura, receber futuramente. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});