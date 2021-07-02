function calculaNumeroDeCliques(numeroDeVisualizacoes) {
    return numeroDeVisualizacoes * 12 / 100;
}

function calculaNumeroDeCompartilhamentos(numeroDeCliques) {
    return numeroDeCliques * 3 / 100;
}

function calculaNumeroDeVisualizacoes(numeroDeCompartilhamentos) {
    return numeroDeCompartilhamentos * 40;
}

function calculaValorPago(numeroDeVisualizacoes) {
    return numeroDeVisualizacoes / 30;
}

function calcularAlcance(valorPago) {
    var numeroDeVisualizacoes = valorPago * 30; 
    var numeroDeCliques = calculaNumeroDeCliques(numeroDeVisualizacoes);
    var numeroDeCompartilhamentos = calculaNumeroDeCompartilhamentos(numeroDeCliques);
    var numeroDeVisualizacoesCompartilhados = calculaNumeroDeVisualizacoes(numeroDeCompartilhamentos);
    return numeroDeVisualizacoes + (numeroDeVisualizacoesCompartilhados * 4);
}

var teste = calcularAlcance(7.40); 
console.log('O valor é: ' + teste);