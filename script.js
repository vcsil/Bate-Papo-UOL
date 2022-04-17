// Constantes 

const SEGUNDO_1 = 1000 // 1000 ms == 1 segundo
let NOME_USUARIO;

let idIntervalAtualizaMensagens;
let idManterConectado;
let apertouBotaoEntrar = 0;
let destinatarioMensagemUsuario = "Todos"
let tipoMensagemUsuario = "message"

let ver;
let ver1;
let ver2;
let ver3;

// Função que reinicia a página
function reiniciaPag() {
    window.location.reload()
}

// Abre janela de erro
function callErro(fraseErro) {
    document.querySelector("main")
        .innerHTML += `<div class="avisoBox">
                                <div class="aviso">
                                    <span class="avisoErro">${fraseErro}</span>
                                    <div class="avisoBotao">
                                        <button onclick="fechaAviso()">OK!</button>
                                    </div>
                                </div>
                            </div>`;
}

// Função que remove o box de aviso
function fechaAviso() {
    document.querySelector(".avisoBox").remove()
}

// Pegando o nome na página inicial
function getName() {
    if (apertouBotaoEntrar === 0) {
        apertouBotaoEntrar++
        NOME_USUARIO = document.querySelector("input").value;
        if (NOME_USUARIO === "") {
            const textoErro = "Ta maluco? Escreve um nome aí.<br>Por favor.......";
            apertouBotaoEntrar = 0;
            callErro(textoErro)
        } else {
            const objComNome = { "name": NOME_USUARIO }
            const requesEnviandoNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objComNome);
            requesEnviandoNome.then(liberaChat);
            requesEnviandoNome.catch(falhaLogin);
        }
    }
}
function liberaChat() {
    document.querySelector(".objInteraveis").classList.add("hidden")
    document.querySelector(".pagInicial")
        .innerHTML += `<div class="sk-circle">
                        <div class="sk-circle1 sk-child"></div>
                        <div class="sk-circle2 sk-child"></div>
                        <div class="sk-circle3 sk-child"></div>
                        <div class="sk-circle4 sk-child"></div>
                        <div class="sk-circle5 sk-child"></div>
                        <div class="sk-circle6 sk-child"></div>
                        <div class="sk-circle7 sk-child"></div>
                        <div class="sk-circle8 sk-child"></div>
                        <div class="sk-circle9 sk-child"></div>
                        <div class="sk-circle10 sk-child"></div>
                        <div class="sk-circle11 sk-child"></div>
                        <div class="sk-circle12 sk-child"></div>
                       </div>
                        <div class="entrando">Entrando...</div>`
    // CHAMANDO AS MENSAGENS
    atualizaMensagens()
    idIntervalAtualizaMensagens = setInterval(atualizaMensagens, SEGUNDO_1 * 2.5);
    idManterConectado = setInterval(manterConectado, SEGUNDO_1 * 4.7);
}
function falhaLogin(erro) {
    apertouBotaoEntrar = 0;
    if (erro.response.status === 400) {
        const textoErro = `O nome "${NOME_USUARIO}" já está em uso. Tente novamente com outro nome. 😃`
        callErro(textoErro)
    } else {
        const textoErro = "Erro inesperado.<br>Reiniciando a página.<br>😊";
        callErro(textoErro)
        setTimeout(reiniciaPag, SEGUNDO_1 * 3)
    }
}


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
    promiseBuscaMensagemServidor.catch(falha);
}
function encontrouMensagemServidor(arrayDeObjetos) { // Função que executa quando não ocorre falha
    arrayDeObjetos.data.forEach(inserirMensagemTela);
    document.querySelector(".pagInicial").classList.add("hidden");
}
function falhaMensagemServidor(erro) {  // Função que executa quando ocorre falha ao requisitar mensagem
    const textoErro = `FALHOU CHEFE ${erro.status}<br>Espera um pouco`;
    callErro(textoErro);
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
            reiniciaPag();
        }
    }
}

function adicionarMsgStatus(objetoComValores) {
    document.querySelector("main")
        .innerHTML += `<div class="message status">
                       <span class="time">${objetoComValores['time']}</span>
                       <span class="name">${objetoComValores['from']}</span>
                       <span class="mensagem">${objetoComValores['text']}</span>
                       </div>`
}
function adicionarMsgPrivada(objetoComValores) {
    if (NOME_USUARIO === objetoComValores['to']) {
        document.querySelector("main")
            .innerHTML += `<div class="message private_message">
                                <span class="time">${objetoComValores['time']}</span>
                                <span class="name">${objetoComValores['from']}<p> reservadamente para </p>${objetoComValores['to']}:</span>
                                <span class="mensagem">${objetoComValores['text']}</span>
                            </div>`
    }
}
function adicionaMsg(objetoComValores) {
    document.querySelector("main")
        .innerHTML += `<div class="message">
                       <span class="time">${objetoComValores['time']}</span>
                       <span class="name">${objetoComValores['from']}<p> para </p>${objetoComValores['to']}:</span>
                       <span class="mensagem">${objetoComValores['text']}</span>
                       </div>`
}

function scrollandoParaUltimaMensagem() {
    document.querySelectorAll(".message")[document.querySelectorAll(".message").length-1].scrollIntoView(true)
}

function atualizaMensagens() {
    document.querySelector("main").innerHTML = "";
    buscaMensagemServidor(encontrouMensagemServidor, falhaMensagemServidor);
    setTimeout(scrollandoParaUltimaMensagem, SEGUNDO_1 * 0.5);
}

// Função para avisar ao servidor que o usuário está conectado
function manterConectado() {
    const objComNome = { "name": NOME_USUARIO }
    const promiseManterConectado = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objComNome)
    promiseManterConectado.then(sucessoManterConectado);
    promiseManterConectado.catch(falhaManterConectado);
}
function sucessoManterConectado() {
    return;
}
function falhaManterConectado(erro) {
    const textoErro = `Falhou ao manter conectado.<br>Erro: ${erro.status}`
    callErro(textoErro)
    clearInterval(idIntervalAtualizaMensagens)
    clearInterval(idManterConectado)
}

let txt;

function enviarMensagem() {
    const textoDoUsuario = document.querySelector(".textoDoUsuario").innerHTML
    if (textoDoUsuario === "" || textoDoUsuario === "<div><br></div><div><br></div>") {
        document.querySelector(".textoDoUsuario").innerHTML = "";
        return;
    }
    const objDaMensagem = {
        "from": NOME_USUARIO, "to": destinatarioMensagemUsuario,
        "text": textoDoUsuario, "type": tipoMensagemUsuario
    }
    const promiseEnviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objDaMensagem)
    promiseEnviarMensagem.then(sucessoEnviarMensagem);
    promiseEnviarMensagem.catch(falhaEnviarMensagem);
}
function sucessoEnviarMensagem() {
    const textoDoUsuario = document.querySelector(".textoDoUsuario")
    textoDoUsuario.innerHTML = "";
    removeTextoSuporte(textoDoUsuario)
    atualizaMensagens()
}
function falhaEnviarMensagem(erro) {
    const textoErro = `Falhou ao enviar mensagem.<br>Você foi desconectado e a página será reiniciada.<br>Erro: ${erro.status}`
    callErro(textoErro)
    setTimeout(reiniciaPag, SEGUNDO_1 * 5)
}

// Função para enviar mensagens com enter
function enviarComEnter(tecla, funcao) {
    const teclaPressionada = tecla.key;
    if (teclaPressionada === "Enter") {
        funcao()
    }
}

