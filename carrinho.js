let caixa = document.querySelector(".quadrado_maior");
let arrayLocalStorage = [];
let arrayFinal = [];
let cont;
let qntDeProdutos = document.querySelector(".qnt_itens");
let valorFinal=0;
let eleTextoValorFinal = document.createElement("p");
let arrayAtualizado = [];

function removerItem(arr, prop, valor){
    return arr.filter(function(i){ return i[prop] !== valor});
}

function construiCarrinho(img, nome, preco){
    let eleDiv = document.createElement("div");
    caixa.appendChild(eleDiv);
    eleDiv.classList.add("div_produtos");

    let elementoImg = document.createElement("img");
    elementoImg.src = img;
    eleDiv.appendChild(elementoImg);

    let eleP = document.createElement("p");
    eleP.textContent = nome;
    eleDiv.appendChild(eleP);

    let elePPreco = document.createElement("p");
    elePPreco.textContent = `R$ ${preco}`;
    eleDiv.appendChild(elePPreco);

    let eleValorFinal = document.createElement("p");
    eleValorFinal.textContent = `R$ ${preco}`;
    
    let eleImput = document.createElement("input");
    eleImput.value = 1;
    
    let eleImgDim2 = document.createElement("img");
    eleImgDim2.src = "./imgs/remover.png";
    eleImgDim2.addEventListener("click", ()=>{
        if(eleImput.value>0){
            eleImput.value--;
            valorFinal -= Number(preco);
            eleValorFinal.textContent = `R$ ${Math.round(preco*Number(eleImput.value))},00`;
            eleTextoValorFinal.textContent = `TOTAL: R$ ${Math.round(valorFinal)},00`;
        }
    });
    eleDiv.appendChild(eleImgDim2);
    
    eleDiv.appendChild(eleImput);
    
    let eleImgDim = document.createElement("img");
    eleImgDim.src = "./imgs/adicionar.png";
    eleImgDim.addEventListener("click", ()=>{
        eleImput.value++;
        valorFinal += Number(preco); 
        console.log(valorFinal);
        eleValorFinal.textContent = `R$ ${Math.round(preco*Number(eleImput.value))},00`;
        eleTextoValorFinal.textContent = `TOTAL: R$ ${Math.round(valorFinal)},00`;
    });
    eleDiv.appendChild(eleImgDim);

    eleDiv.appendChild(eleValorFinal);

    let eleBarra = document.createElement("hr");
    eleBarra.classList.add("barra_divisoria");
    
    qntDeProdutos.textContent = `0${arrayLocalStorage.length} Itens`;

    valorFinal += Number(preco);
    let barraDivisoria = document.createElement("div");
    let barraBranca = document.createElement("hr");
    barraBranca.classList.add("barra_divisoria");
    barraDivisoria.appendChild(barraBranca);
    caixa.appendChild(barraDivisoria);

    let eleLixeira = document.createElement("img");
    eleLixeira.src = "./imgs/lixeira.png";
    eleLixeira.classList.add("lixeira_produtos");
    eleLixeira.addEventListener("click", ()=>{
        caixa.removeChild(eleDiv);
        barraDivisoria.remove();
        
        arrayAtualizado = removerItem(arrayLocalStorage, "NOME", `${nome}`);
        arrayLocalStorage = arrayAtualizado;

        localStorage.setItem("quadrinho", JSON.stringify(arrayAtualizado));

        valorFinal -= Math.round(preco*Number(eleImput.value));
        eleTextoValorFinal.textContent = `TOTAL: R$ ${Math.round(valorFinal)},00`;
    });
    eleDiv.appendChild(eleLixeira);

}

function carregarLocalStorage(){
    if(localStorage.getItem("quadrinho")){
        caixa.innerHTML = " ";

        let elementoDiv = document.createElement("div");
        elementoDiv.classList.add("titulo_quadrado_maior");
        caixa.appendChild(elementoDiv);

        let elementoP = document.createElement("p");
        elementoP.textContent = "QUADRINHO";
        let elementoP2 = document.createElement("p");
        elementoP2.textContent = "QTD";
        let elementoP3 = document.createElement("p");
        elementoP3.textContent = "SUBTOTAL";
        elementoDiv.appendChild(elementoP);
        elementoDiv.appendChild(elementoP2);
        elementoDiv.appendChild(elementoP3);

        let quadrinhosSelecioandos = JSON.parse(localStorage.quadrinho);
        arrayLocalStorage = quadrinhosSelecioandos;

        for(let k=0;k<quadrinhosSelecioandos.length;k++){
            construiCarrinho(arrayLocalStorage[k].IMAGEM, arrayLocalStorage[k].NOME, arrayLocalStorage[k].PRECO);
        }

        let divFinal = document.createElement("div");
        caixa.appendChild(divFinal);
        divFinal.classList.add("alinhamento_rodape");

        let eleBotao = document.createElement("div");
        eleBotao.classList.add("botao_pagamento");
        eleBotao.textContent = "FINALIZAR PEDIDO";
        divFinal.appendChild(eleBotao);

        eleTextoValorFinal.textContent = `TOTAL: R$ ${valorFinal}`;
        eleTextoValorFinal.classList.add("texto_valor_final");
        divFinal.appendChild(eleTextoValorFinal);
    }
}


window.addEventListener("load", carregarLocalStorage);