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