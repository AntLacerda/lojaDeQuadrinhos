const marvel = [
    {
        Nome: "Guerras Secretas (2015)",
        Imagem: "./imgs/guerras_secretas_009.jpg",
        Descricao: "A incursão final que afetou o Universo marvel o coloca contra o Universo Ultimate.",
        Preco: "9.99"
    },
    {
        Nome: "A caçada pelo Wolverine",
        Imagem: "./imgs/wolverine.jpg",
        Descricao: "Wolverine morreu envolto em Adamantium, mas quando seu corpo desaparece, os X-Men precisam se unir.",
        Preco: "19.99"
    },
    {
        Nome: "A Poderosa Thor V2 (2015)",
        Imagem: "./imgs/poderosa_thor.jpg",
        Descricao: "Ela está de volta! A Deusa do Trovão em sua nova fase, com sua identidade ainda encoberta e seu problema de saúde.",
        Preco: "29.99"
    },
    {
        Nome: "A Fuga dos Homens Mortos",
        Imagem: "./imgs/capitaoamerica.jpg",
        Descricao: "Quando o Capitão América responde a um pedido de socorro originário da selva sul-americana, ele descobre uma equipe de soldados dos EUA.",
        Preco: "19.99"
    },
    {
        Nome: "Carnificina <br> (2010)",
        Imagem: "./imgs/carnage.jpg",
        Descricao: "A história mostra o retorno do Carnificina, dado como morto em um confronto com o Sentinela.",
        Preco: "39.99"
    },
    {
        Nome: "Demolidor: Renascido (2015)",
        Imagem: "./imgs/demolidor.jpg",
        Descricao: "Os apocalípticos eventos de TERRA DAS SOMBRAS deixaram o outrora admirável legado do Demolidor em pedaços.",
        Preco: "9.99"
    },
    {
        Nome: "Guardiões da Galáxia - A Última Manopla",
        Imagem: "./imgs/guardioes.jpg",
        Descricao: "O universo está em chamas. Centenas de mundos estão em guerra. Nunca houve tal ódio e divisão.",
        Preco: "29.99"
    },
    {
        Nome: "Homem-Aranha - A Saga do Clone",
        Imagem: "./imgs/miranha.jpg",
        Descricao: "A Saga do Clone (ou Saga do Clone do Homem-Aranha) é uma das principais sagas do Homem Aranha.",
        Preco: "59.99"
    }
]

let sessaoQuadrinhos = document.querySelector("#sessao_quadrinhos");
let campoPesquisa = document.querySelector("#campo_pesquisa");
let bolaCarrinho = document.querySelector("#bolinha");
let pesquisaEmAndamento;
let arrayLocalStorage = [];



function construirCaixa(nome, img, descricao, preco){
    let elementoDiv = document.createElement("div");
    elementoDiv.classList.add("box");
    sessaoQuadrinhos.appendChild(elementoDiv);

    let elementoH3 = document.createElement("h3");
    elementoH3.textContent = nome;
    elementoDiv.appendChild(elementoH3);

    let elementoImg = document.createElement("img");
    elementoImg.src = img;
    elementoDiv.appendChild(elementoImg);

    let elementoH4 = document.createElement("h4");
    elementoH4.textContent = descricao;
    elementoDiv.appendChild(elementoH4);

    let elementoDiv2 = document.createElement("div");
    elementoDiv.appendChild(elementoDiv2);

    let elementoP = document.createElement("p");
    elementoP.textContent = `R$ ${preco}`;

    let elementoImg2 = document.createElement("img");
    elementoImg2.src = "./imgs/botao-de-adicao.png";
    elementoImg2.addEventListener("click", ()=>{

        
        arrayLocalStorage.push({NOME:nome,IMAGEM:img,DESCRICAO:descricao,PRECO:preco});         //Lembrar de quando for reconstruir os itens no carrinho, se não conseguir construir direito com apenas um array, criar um array pra cada elemento;

        localStorage.setItem("quadrinho", JSON.stringify(arrayLocalStorage));

        let teste = JSON.parse(localStorage.quadrinho);
        console.log(arrayLocalStorage);

        let qntDeItens = arrayLocalStorage.length;
        bolaCarrinho.style.display = "block";
        bolaCarrinho.textContent = qntDeItens;

    });

    elementoDiv2.appendChild(elementoP);
    elementoDiv2.appendChild(elementoImg2);
}

function somaCarrinho(){
    
}

function pesquisando(){

    sessaoQuadrinhos.innerHTML = " ";

    let valorPesquisado = campoPesquisa.value;

    pesquisaEmAndamento = marvel.filter((valorAtual)=>{
        return valorAtual.Nome.toLowerCase().includes(`${valorPesquisado.toLowerCase()}`);
    });

    for(let k=0;k<pesquisaEmAndamento.length;k++){
        construirCaixa(pesquisaEmAndamento[k].Nome, pesquisaEmAndamento[k].Imagem, pesquisaEmAndamento[k].Descricao, pesquisaEmAndamento[k].Preco);
    }
}

function preCarregamento(){
    for(let k=0;k<marvel.length;k++){
        construirCaixa(marvel[k].Nome,marvel[k].Imagem,marvel[k].Descricao,marvel[k].Preco);
    }
}

function carregarLocalStorage(){
    if(localStorage.getItem("quadrinho")){
        let quadrinhosSelecioandos = JSON.parse(localStorage.quadrinho);
        arrayLocalStorage = quadrinhosSelecioandos;

        let qntDeItens = arrayLocalStorage.length;
        console.log(qntDeItens);
        bolaCarrinho.style.display = "block";
        bolaCarrinho.textContent = qntDeItens;
    }
}

window.addEventListener("load", carregarLocalStorage);
window.addEventListener("load", preCarregamento);
campoPesquisa.addEventListener("keyup", pesquisando);