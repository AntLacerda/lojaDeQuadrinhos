let caixa = document.querySelector(".quadrado_maior");
let arrayLocalStorage = [];
let arrayFinal = [];
let cont;

function construiCarrinho(img, nome, preco){
    let eleDiv = document.createElement("div");
    caixa.appendChild(eleDiv);

    let elementoImg = document.createElement("img");
    elementoImg.src = img;
    eleDiv.appendChild(elementoImg);

    let eleP = document.createElement("p");
    eleP.textContent = nome;
    eleDiv.appendChild(eleP);

    let elePPreco = document.createElement("p");
    elePPreco.textContent = `R$ ${preco}`;
    eleDiv.appendChild(elePPreco);
    
    let eleImput = document.createElement("input");
    eleImput.value = 1;
    
    let eleImgDim2 = document.createElement("img");
    eleImgDim2.src = "./imgs/remover.png";
    eleImgDim2.addEventListener("click", ()=>{
        eleImput.value--;
    });
    eleDiv.appendChild(eleImgDim2);
    
    eleDiv.appendChild(eleImput);
    
    let eleImgDim = document.createElement("img");
    eleImgDim.src = "./imgs/adicionar.png";
    eleImgDim.addEventListener("click", ()=>{
        eleImput.value++;
    });
    eleDiv.appendChild(eleImgDim);
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
    }
}

window.addEventListener("load", carregarLocalStorage);