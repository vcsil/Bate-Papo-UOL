// Constantes 

const SEGUNDO_1 = 1000 // 1000 ms == 1 segundo

let ultimaMensagem;
let cont = 0;
let cont2 = 0;

let ver;
let ver1;
let ver2;
let ver3;

// Essa função serve para retirar o texto "Escreva aqui..." da caixa de escrever
function removeTextoSuporte(elemento) {
    const textoDoUsuario = elemento.innerHTML;
    if (textoDoUsuario === '') {
        document.querySelector(".textoSuporte").classList.remove("hidden");
    } else {
        document.querySelector(".textoSuporte").classList.add("hidden");
    }
}

// Função para requistar as mensagens ao servidor
function buscaMensagemServidor(sucesso, falha) {
    const promiseBuscaMensagemServidor = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promiseBuscaMensagemServidor.then(sucesso);
    promiseBuscaMensagemServidor.then(falha);
}
function encontrouMensagemServidor(arrayDeObjetos) { // Função que executa quando não ocorre falha
    arrayDeObjetos.data.forEach(inserirMensagemTela);
}
function falhaMensagemServidor(erro) {  // Função que executa quando ocorre falha ao requisitar mensagem
    return `FALHOU CHEFE ${erro}`;
}

function inserirMensagemTela(objetoComValores) {
    ultimaMensagem = objetoComValores;
    /* 
     *  {from: "Remetente", to: "Destinatário", text: "Mensagem", 
     *  type: "status|message|private_message", time: "HH:MM:SS"}
     */
    const type = objetoComValores['type'];

    if (type === "status") {
        adicionarMsgStatus(objetoComValores);
    } else if (type === "private_message") {
        adicionarMsgPrivada(objetoComValores);
    } else if (type === "message") {
        adicionaMsg(objetoComValores);
    } else {
        const resp = prompt("Aconteceu algum erro. Deseja reiniciar a página? Sim / Não");
        if (resp[0] === 's') {
            window.location.reload();
        }
    }
}

function adicionarMsgStatus(objetoComValores) {
    document.querySelector("main")
        .innerHTML += `<div class="boxMensagem status">
                       <span class="time">${objetoComValores['time']}</span>
                       <span class="name"><span>${objetoComValores['from']}</span></span>
                       <span class="mensagem">${objetoComValores['text']}</span>
                       </div>`
}
function adicionarMsgPrivada(objetoComValores) {
    document.querySelector("main")
        .innerHTML += `<div class="boxMensagem reservado">
                       <span class="time">${objetoComValores['time']}</span>
                       <span class="name"><span>${objetoComValores['from']}</span><p> reservadamente para </p>${objetoComValores['to']}:</span>
                       <span class="mensagem">${objetoComValores['text']}</span>
                       </div>`
}
function adicionaMsg(objetoComValores) {
    document.querySelector("main")
        .innerHTML += `<div class="boxMensagem">
                       <span class="time">${objetoComValores['time']}</span>
                       <span class="name"><span>${objetoComValores['from']}</span><p> para </p>${objetoComValores['to']}:</span>
                       <span class="mensagem">${objetoComValores['text']}</span>
                       </div>`
}

// function atualizaMensagens() {
//     document.querySelector("main").innerHTML = "";
//     buscaMensagemServidor(encontrouMensagemServidor, falhaMensagemServidor);
//     scrollandoParaUltimaMensagem();
// }
// function scrollandoParaUltimaMensagem() {
//     let type = ultimaMensagem["type"];
//     ver1 = type
//     let quantidadeElementosTipo = document.querySelectorAll(`.${type}`);
//     ver2 = quantidadeElementosTipo
//     let ultimoBlocoTipo = document.querySelectorAll(`.${type}`)[quantidadeElementosTipo-1];
//     ver3 = ultimoBlocoTipo
//     ultimoBlocoTipo.scrollIntoView();    
// }

//buscaMensagemServidor(encontrouMensagemServidor, falhaMensagemServidor);
//scrollandoParaUltimaMensagem();
//setInterval(atualizaMensagens, SEGUNDO_1*2.5);

