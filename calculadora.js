// Variaveis
var anuncios = new Array();

// Calculos

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
    return numeroDeCliques * 3 / 20;
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

// Cadastro

function cadastrar() {
    let form = document.getElementById('cadastro');
    
    let nome = form.elements['nome'].value;
    let cliente = form.elements['cliente'].value;
    let dataInicio = Date.parse(form.elements['data-inicio'].value);
    let dataFinal = Date.parse(form.elements['data-final'].value);
    let investimento = form.elements['investimento'].value;

    if(cadastrarAnuncio(nome, cliente, dataInicio, dataFinal, investimento)) {
        form.reset();
        document.getElementById('filtro').reset();
    }
}

function cadastrarAnuncio(nome, cliente, dataInicio, dataFinal, investimento) {
    if(nome.length == 0 || cliente.length == 0 || investimento.length == 0) {
        alert("Preencha todos os campos!");
        return false;
    }

    if(isNaN(dataInicio) || isNaN(dataFinal)) {
        alert("Data inválida!");
        return false;
    } 

    if(dataInicio > dataFinal) {
        alert("A data de inicio deve ser menor ou igual a data final");
        return false;
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

    atualizaLista(anuncios);

    return true;
}

// Filtrar lista

function filtrar() {
    let form = document.getElementById('filtro');
    
    let cliente = form.elements['cliente'].value;
    let dataInicio = Date.parse(form.elements['data-inicio'].value);
    let dataFinal = Date.parse(form.elements['data-final'].value);

    filtrarAnuncios(cliente, dataInicio, dataFinal);
}

function filtrarAnuncios(cliente, dataInicio, dataFinal) {

    if(!isNaN(dataInicio) && !isNaN(dataFinal)) {
        if(dataInicio > dataFinal) {
            alert("A data de inicio deve ser menor ou igual a data final");
            return
        }
    } 

    var listaFiltrada = new Array();
    listaFiltrada = filtrarPorCliente(anuncios, cliente);
    listaFiltrada = filtrarPorData(listaFiltrada, dataInicio, dataFinal);

    atualizaLista(listaFiltrada);
}

function filtrarPorCliente(lista, cliente) {
    if(cliente.length == 0) {
        return  lista;
    }

    var listaFiltrada = new Array();

    for(var i = 0; i < lista.length; i++) {
        if(lista[i].cliente.includes(cliente)){
            listaFiltrada.push(lista[i]);
        }
    }

    return listaFiltrada;
}

function filtrarPorData(lista, dataInicio, dataFinal) {
    if(isNaN(dataInicio) || isNaN(dataFinal)) { 
        return lista;
    }else if(dataInicio > dataFinal) {
        return lista;
    }

    var listaFiltrada = new Array();

    for(var i = 0; i < lista.length; i++) {
        if(lista[i].dataInicio >= dataInicio && lista[i].dataInicio <= dataFinal){
            listaFiltrada.push(lista[i]);
        }
    }

    return listaFiltrada;
}

// Interface

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