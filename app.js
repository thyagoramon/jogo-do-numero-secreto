let numerosSorteados = [];
let quantidadeNumeros = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

mensagemInicial();

function mensagemInicial(){
    textosNaTela('h1','Jogo do número secreto');
    textosNaTela('p','Escolha um número de 1 a '+quantidadeNumeros); 
}

function textosNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = 'Parabéns, você acertou em '+tentativas+' '+palavraTentativa+'.';
        textosNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled'); //altera propriedade do botão
    } else {
        if (chute > numeroSecreto) {
            textosNaTela('p','O número secreto é nenor');
        } else {
            textosNaTela('p','O número secreto é maior');
        }
        tentativas++
        limparTela();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumeros + 1); //gera numero aleatório
    if (numerosSorteados.length == quantidadeNumeros) { //verifica se a lista de números sorteados está cheia
        numerosSorteados.splice(0, (quantidadeNumeros/2)); //limpa a metade da lista quando ela estiver cheia
    }
    if (numerosSorteados.includes(numeroEscolhido)) { //verifica se o número gerado já foi escolhido
        return gerarNumeroAleatorio(); //se sim, gerar novamente
    } else { //se não
        numerosSorteados.push(numeroEscolhido); //adiciona o número na lista de números sorteados
        return numeroEscolhido; //retorna o valor
    }
}

function limparTela() { //limpar input
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciar() {
    mensagemInicial();
    limparTela();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', true); //desativa o botão
}

document.getElementById("input").addEventListener("keydown", function(event) { //função ao pressionar enter no input
    if (event.key === "Enter") {
        verificarChute()
    }
});


