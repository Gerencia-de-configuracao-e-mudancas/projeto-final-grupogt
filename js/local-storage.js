//Funcoes para manipular o nosso "banco de dados" no Local Storage
function receberElemento(){
    if(localStorage.financas){
        return JSON.parse(localStorage.financas);
    }
    return null;
}

function armazenarElemento(objeto){
    if(localStorage.financas){
        let armazenamento = receberElemento();
        armazenamento.push(objeto);
        localStorage.financas = JSON.stringify(armazenamento);   
    }
    else{
        localStorage.financas = JSON.stringify([objeto]);
    }
}

//Trata as posicoes comecando do 0
function editarElemento(objeto, posicao){
    let listaElementos = receberElemento();
    if(listaElementos){
        if(posicao < listaElementos.length && posicao > -1){
            //console.log("Edição possível");
            listaElementos[posicao] = objeto;
            localStorage.financas = JSON.stringify(listaElementos);   
        }
        else{
            console.log("Tentando editar posicao que não existe");
        }
    }
    else{
        console.log("Tentando editar com a lista vazia");
    }
}

function apagarElemento(posicao){
    let listaElementos = receberElemento();
    if(listaElementos){
        if(posicao < listaElementos.length && posicao > -1){
            listaElementos.splice(posicao, 1);
            localStorage.financas = JSON.stringify(listaElementos);   
        }
        else{
            console.log("Tentando apagar posicao que não existe");
        }
    }
    else{
        console.log("Tentando apagar com a lista vazia");
    }
}