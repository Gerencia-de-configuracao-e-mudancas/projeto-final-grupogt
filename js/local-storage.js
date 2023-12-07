//Funcoes para manipular o nosso "banco de dados" no Local Storage
function receberElemento(){
    if(localStorage.financas){
        return JSON.parse(localStorage.financas);
    }
    return null;
}

function preencherElemento(objeto){
    localStorage.financas = JSON.stringify(objeto);
}

function armazenarElemento(objeto){
    if(localStorage.financas){
        let armazenamento = receberElemento();
        armazenamento.push(objeto);
        preencherElemento(armazenamento);   
    }
    else{
        preencherElemento([objeto]);
    }
}

//Trata as posicoes comecando do 0
function editarElemento(objeto, posicao){
    let listaElementos = receberElemento();
    if(listaElementos){
        if(posicao < listaElementos.length && posicao > -1){
            //console.log("Edição possível");
            listaElementos[posicao] = objeto;
            preencherElemento(listaElementos);   
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
            preencherElemento(listaElementos);   
        }
        else{
            console.log("Tentando apagar posicao que não existe");
        }
    }
    else{
        console.log("Tentando apagar com a lista vazia");
    }
}

//Para lidar com o resultado de todas as financas de um mês no caso a soma das 
function receberResumo(){
    if(localStorage.resumoFinancas){
        return JSON.parse(localStorage.resumoFinancas);
    }
    return null;
}

function preencherResumo(objeto){
    localStorage.resumoFinancas = JSON.stringify(objeto);
}

function armazenarResumo(objeto){
    if(localStorage.resumoFinancas){
        let armazenamento = receberResumo();
        armazenamento.push(objeto);
        preencherResumo(armazenamento);   
    }
    else{
        preencherResumo([objeto]);
    }
}

function apagarResumo(posicao){
    let listaResumos = receberResumo();
    if(listaResumos){
        if(posicao < listaResumos.length && posicao > -1){
            listaResumos.splice(posicao, 1);
            preencherResumo(listaResumos);   
        }
        else{
            console.log("Tentando apagar posicao que não existe");
        }
    }
    else{
        console.log("Tentando apagar com a lista vazia");
    }
}

function editarResumo(objeto, posicao){
    let listaResumos = receberResumo();
    if(listaResumos){
        if(posicao < listaResumos.length && posicao > -1){
            //console.log("Edição possível");
            listaResumos[posicao] = objeto;
            preencherResumo(listaResumos);   
        }
        else{
            console.log("Tentando editar posicao que não existe");
        }
    }
    else{
        console.log("Tentando editar com a lista vazia");
    }
}

//Retorna os valores não repetidos de um campo específico da lista de objetos
function valoresUnicosArray(array, campo){
    let valoresUnicos = [...new Set(array.map(obj => obj[campo]))];
    return valoresUnicos;
}

//Adiciona as opções os meses que estão no localStorage (provavelmente será modificada logo)
function inserirOptionsMeses(){
    let localInserir = document.getElementById("sele-month");
    let listaFinancas = receberElemento();
    if(listaFinancas){
        let todosMeses = valoresUnicosArray(listaFinancas, "mes");
        for(let i of todosMeses){
            i = i.charAt(0).toUpperCase() + i.slice(1);
            let novaOpcao = document.createElement("option");
            novaOpcao.textContent = i;
            localInserir.appendChild(novaOpcao);
        }
    }
}

//Retorna todos os objetos do localStorage de um mes específico
function filtrarPorMes(mes){
    let listaFinancas = receberElemento();
    if(listaFinancas){
        return listaFinancas.filter((objeto) => {return objeto.mes == mes});
    }
    return null;
}

//Simplesmente retorna o total de um campo somado (até agora não foi usado)
function somatorioCampo(lista, campo){
    return lista.reduce((acumulador, atual) => {
        return acumulador + Number(atual[campo]);
    }, 0);
}

//Analisa todas as movimentações de cada categoria e cria um resumo com os totais
function criarResultadoMes(nomeDoMes){
    let listaFiltrada = filtrarPorMes(nomeDoMes);
    console.log(`listaFiltrada pelo mes ${nomeDoMes}: `, listaFiltrada);
    if(listaFiltrada){
        let saida = {mes: nomeDoMes, descricao: [], valor: []};
        for(let i of listaFiltrada){
            //Se o saldo não tiver um nome ele será nomeado de "Outros"
            if(!i.descricao){
                console.log("Adicionado outros");
                i.descricao = "Outros";
            }
            //Descobre a posicao do saldo na lista de saida
            let posicao = saida.descricao.indexOf(i.descricao);

            //Se o saldo não tiver uma posição na lista ele cria uma nova
            if(posicao == -1){
                saida.descricao.push(i.descricao);
                saida.valor.push(i.valor);
            }
            else{//Do contrario adiciona o valor na posicao correspondente
                saida.valor[posicao] += i.valor;
            }
        }

        //Verificando se já existe um resumo do mes do parâmetro e substitui o antigo pelo novo
        let listaResumos = receberResumo();
        let posicaoMesAtual = -1;
        if(listaResumos){
            posicaoMesAtual = listaResumos.findIndex(objeto => objeto.mes == nomeDoMes);
            console.log("Posicao do MesAtual", posicaoMesAtual);
        }
        if(posicaoMesAtual != -1){
            editarResumo(saida, posicaoMesAtual);
        }
        else{
            armazenarResumo(saida);
        }
    }
    else{
        console.log("Ainda falta adicionar um mensagem para quando iniciar sem nada");
    }
}

//Para testes cria um input inicial no localStorage para ele não começar vazio
if(!receberElemento()){
    preencherElemento([{descricao: "casa", valor: 23.4, mes: "maio"}, {descricao: "casa", valor: 256.4, mes: "janeiro"}, {descricao: "casa", valor: 23.4, mes: "maio"}, {descricao: "casa", valor: 23.4, mes: "maio"}, {descricao: "casa", valor: 256.4, mes: "setembro"}, {descricao: "casa", valor: 256.4, mes: "janeiro"}, {descricao: "casa", valor: 23.4, mes: "maio"}, {descricao: "casa", valor: 23.4, mes: "maio"}, {descricao: "casa", valor: 256.4, mes: "agosto"}, {descricao: "escola", valor: 42, mes: "maio"}]);
}
criarResultadoMes("maio");