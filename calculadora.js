var anuncios = new Array();

function calculaNumeroDeVisualizacoes(numeroDeCompartilhamentos) {
    return numeroDeCompartilhamentos * 40;
}

function calcularAlcance(valorPago) {
    var numeroDeVisualizacoes  =  valorPago  *  30 ; 
    var numeroDeCompartilhamentos = calcularCompartilhamento(valorPago);
    var numeroDeVisualizacoesCompartilhados = calculaNumeroDeVisualizacoes(numeroDeCompartilhamentos);
    return numeroDeVisualizacoes + (numeroDeVisualizacoesCompartilhados * 4);
}

function calcularCompartilhamento(valorPago) {
    var numeroDeCliques = calcularCliques(valorPago);
    return numeroDeCliques * 3 / 100;
}

function calcularCliques(valorPago) {
    var numeroDeVisualizacoes = valorPago * 30; 
    return numeroDeVisualizacoes * 12 / 100;
}

function cadastrar() {
    let form = document.getElementById('cadastro');
    
    let nome = form.elements['nome'].value;
    let cliente = form.elements['cliente'].value;
    let dataInicio = new Date(form.elements['data-inicio'].value);
    let dataFinal = form.elements['data-final'].value;
    let investimento = form.elements['investimento'].value;

    let visualizacoes = calcularAlcance(investimento);
    let compartilhamentos = calcularCompartilhamento(investimento);
    let cliques = calcularCliques(investimento);

    var anuncio = {
        nome: nome,
        cliente: cliente,
        dataInicio: dataInicio,
        dataFinal: dataFinal,
        investimento: investimento,
        visualizacoes: visualizacoes,
        compartilhamentos: compartilhamentos,
        cliques: cliques
    };

    anuncios.push(anuncio);
    atualizaLista();
}

function atualizaLista() {

    let lista = document.getElementById('lista-conteudo');
    var html = "";

    for(var i = 0; i < anuncios.length; i++) {
        let anuncioHtml = gerarAnuncioHtml(anuncios[i]);
        html += anuncioHtml;
    }

    lista.innerHTML = html;
}

function gerarAnuncioHtml(anuncio) {
    let anuncioHtml = "<tr><td>" + anuncio.nome + "</td><td>" + anuncio.cliente + "</td><td>" + anuncio.investimento + "</td><td>" + anuncio.visualizacoes + "</td><td>" + anuncio.cliques + "</td><td>" + anuncio.compartilhamentos + "</td></tr>";
    return anuncioHtml;
}

var teste = calcularAlcance(7.40); 
console.log('O valor é: ' + teste);