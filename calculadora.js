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

function quantidadeDeDias(dataInicio, dataFinal) {
    let tempo = Math.abs(dataFinal - dataInicio);
    let dias = Math.ceil(tempo / (1000 * 60 * 60 * 24)) + 1;
    return dias;
}

function cadastrar() {
    let form = document.getElementById('cadastro');
    
    let nome = form.elements['nome'].value;
    let cliente = form.elements['cliente'].value;
    let dataInicio = Date.parse(form.elements['data-inicio'].value);
    let dataFinal = Date.parse(form.elements['data-final'].value);
    let investimento = form.elements['investimento'].value;

    if(nome.length == 0 || cliente.length == 0 || investimento.length == 0) {
        alert("Preencha todos os campos!");
        return
    }

    if(isNaN(dataInicio) || isNaN(dataFinal)) {
        alert("Data inválida!");
        return
    } 

    if(dataInicio > dataFinal) {
        alert("A data de inicio deve ser menor ou igual a data final");
        return
    }

    let totalDeDias = quantidadeDeDias(dataInicio, dataFinal);
    let valorTotal = totalDeDias * investimento;
    let visualizacoes = calcularAlcance(valorTotal);
    let compartilhamentos = calcularCompartilhamento(valorTotal);
    let cliques = calcularCliques(valorTotal);

    var anuncio = {
        nome: nome,
        cliente: cliente,
        dataInicio: dataInicio,
        dataFinal: dataFinal,
        investimento: valorTotal,
        visualizacoes: visualizacoes,
        compartilhamentos: compartilhamentos,
        cliques: cliques
    };

    anuncios.push(anuncio);

    form.reset();
    atualizaLista(anuncios);
}

function filtrar() {
    let form = document.getElementById('filtro');
    
    let cliente = form.elements['cliente'].value;
    let dataInicio = Date.parse(form.elements['data-inicio'].value);
    let dataFinal = Date.parse(form.elements['data-final'].value);

    if(!isNaN(dataInicio) && !isNaN(dataFinal)) {
        if(dataInicio > dataFinal) {
            alert("A data de inicio deve ser menor ou igual a data final");
            return
        }
    } 

    var listaFiltrada = new Array();

    for(var i = 0; i < anuncios.length; i++) {
        if(anuncios[i].cliente.includes(cliente)){
            listaFiltrada.push(anuncios[i]);
        }
    }

    atualizaLista(listaFiltrada);

}

function atualizaLista(anuncios) {

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