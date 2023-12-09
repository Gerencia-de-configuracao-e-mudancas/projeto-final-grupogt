console.log("Está funcionando");

//Funcoes para manipular o nosso "banco de dados" no Local Storage
function receberElemento(nomeLocalStorage){
    //caso nenhum nome seja passado o localStorage tem valor padrão = "financas"
    nomeLocalStorage = nomeLocalStorage ? nomeLocalStorage : "financas";
    if(localStorage[nomeLocalStorage]){
        return JSON.parse(localStorage[nomeLocalStorage]);
    }
    return null;
}

function preencherElemento(objeto, nomeLocalStorage){
    nomeLocalStorage = nomeLocalStorage ? nomeLocalStorage : "financas";
    localStorage[nomeLocalStorage] = JSON.stringify(objeto);
}

function armazenarElemento(objeto, nomeLocalStorage){
    //caso nenhum nome seja passado o localStorage tem valor padrão = "financas"
    nomeLocalStorage = nomeLocalStorage ? nomeLocalStorage : "financas";
    console.log("NomeLocalStorage:", nomeLocalStorage);
    if(localStorage[nomeLocalStorage]){
        let armazenamento = receberElemento(nomeLocalStorage);
        armazenamento.push(objeto);
        preencherElemento(armazenamento, nomeLocalStorage);   
    }
    else{
        preencherElemento([objeto], nomeLocalStorage);
    }
}

//Trata as posicoes comecando do 0
function editarElemento(objeto, posicao, nomeLocalStorage){
    nomeLocalStorage = nomeLocalStorage ? nomeLocalStorage : "financas";
    let listaElementos = receberElemento();
    if(listaElementos){
        if(posicao < listaElementos.length && posicao > -1){
            //console.log("Edição possível");
            listaElementos[posicao] = objeto;
            preencherElemento(listaElementos, nomeLocalStorage);   
        }
        else{
            console.log("Tentando editar posicao que não existe");
        }
    }
    else{
        console.log("Tentando editar com a lista vazia");
    }
}

function apagarElemento(posicao, nomeLocalStorage){
    nomeLocalStorage = nomeLocalStorage ? nomeLocalStorage : "financas";
    let listaElementos = receberElemento();
    if(listaElementos){
        if(posicao < listaElementos.length && posicao > -1){
            listaElementos.splice(posicao, 1);
            preencherElemento(listaElementos, nomeLocalStorage);   
        }
        else{
            console.log("Tentando apagar posicao que não existe");
        }
    }
    else{
        console.log("Tentando apagar com a lista vazia");
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
    console.log("Mes: ", mes);
    console.log("listaFinancas: ", listaFinancas);
    if(listaFinancas){
        return listaFinancas.filter((objeto) => {
            console.log("Objeto: ", objeto);
            console.log(`${objeto.mes} == ${mes}: `, objeto.mes == mes);
            return objeto.mes == mes;
        });
    }
    return null;
}

//Simplesmente retorna o total de um campo somado, permite marcar até que data será somado
function somatorioCampo(lista, campo, dataLimite){
    dataLimite = dataLimite ? dataLimite : false;
    if(dataLimite == false){
        return lista.reduce((acumulador, atual) => {
            return acumulador + Number(atual[campo]);
        }, 0);
    }
    else{
        return lista.reduce((acumulador, atual) => {
            console.log(`${atual['data']} <= ${dataLimite}: `, atual["data"] <= dataLimite);
            if(atual["data"] <= dataLimite){
                return acumulador + Number(atual[campo]);
            }
            return acumulador;
        }, 0);
    }
}

function adicionarOptionDataAtual(mesParaInserir){
    let opcoesMeses = document.getElementById("sele-month");
    let existe = false;
    for(let i of opcoesMeses.children){
        if(i.value == mesParaInserir){
          existe = true;
          break;
        }

        //Descobre que o mês não está na lista e adiciona ele antes do seu sucessor
        if(i.value < mesParaInserir){
          let novaOpcao = document.createElement("option");
          novaOpcao.value = mesParaInserir;
          novaOpcao.textContent = nomeDosMeses(mesParaInserir.split("-")[1]) + " - " + mesParaInserir.split("-")[0];
          opcoesMeses.insertBefore(novaOpcao, i);
          existe = true;
          break;
        }
    }

    //Descobre que o mês não está na lista e adiciona ele no final
    if(existe == false){
      let novaOpcao = document.createElement("option");
        novaOpcao.value = mesParaInserir;
        novaOpcao.textContent = nomeDosMeses(mesParaInserir.split("-")[1]) + " - " + mesParaInserir.split("-")[0];
        opcoesMeses.appendChild(novaOpcao);
    }
}

//Verifica quais meses estão no localStorage e adiciona eles para as options
function preencherMesesUtilizados(){
  let cacheMeses = receberElemento("cacheMeses");
  if(cacheMeses == null){
    const listaFinancas = receberElemento();
    cacheMeses = valoresUnicosArray(listaFinancas, "mes");
    preencherElemento(cacheMeses, "cacheMeses");
  }
  for(let i of cacheMeses){
    adicionarOptionDataAtual(i);
  }
}

//Serve para converter os números armazenados no campo de mês em nomes
function nomeDosMeses(numeroDoMes){
    numeroDoMes = Number(numeroDoMes);
    switch(numeroDoMes) {
        case 1:
            return "Janeiro";
        case 2:
            return "Fevereiro";
        case 3:
            return "Março";
        case 4:
            return "Abril";
        case 5:
            return "Maio";
        case 6:
            return "Junho";
        case 7:
            return "Julho";
        case 8:
            return "Agosto";
        case 9:
            return "Setembro";
        case 10:
            return "Outubro";
        case 11:
            return "Novembro";
        case 12:
            return "Dezembro";
        default:
            return null;
    }
}

//Se o mês não estiver no cache ele é adicionado e também adicionado as opções
function adicionarNovoMes(novoMes){
    let cacheMeses = receberElemento("cacheMeses");
    if(cacheMeses != null){
        if(cacheMeses.indexOf(novoMes) == -1){
            console.log("Novo mês!");
            console.log("Novo mes armazenado no localStorage: ", novoMes);
            armazenarElemento(novoMes, "cacheMeses");
            adicionarOptionDataAtual(novoMes);
          }
    }
    else{
        armazenarElemento(novoMes, "cacheMeses");
        adicionarOptionDataAtual(novoMes);
    }
}


/*
//Para testes cria um input inicial no localStorage para ele não começar vazio
if(!receberElemento()){
    preencherElemento([{"descricao":"IFPB","valor":"1000","data":"2023-12-06","mes":"2023-02"},{"descricao":"Escola","valor":"-130","data":"2023-12-06","mes":"2023-02"},{"descricao":"Escola","valor":"320","data":"2023-12-06","mes":"2023-04"},{"descricao":"Escola","valor":"-230","data":"2023-12-06","mes":"2023-04"},{"descricao":"Escola","valor":"430","data":"2023-12-06","mes":"2023-03"},{"descricao":"Escola","valor":"-210","data":"2023-12-06","mes":"2023-03"},{"descricao":"Escola","valor":"430","data":"2023-12-06","mes":"2023-12"},{"descricao":"Steam","valor":"-22.50","data":"2023-02-06","mes":"2023-02"},{"descricao":"Steam","valor":-15,"data":"2023-03-06","mes":"2023-03"},{"descricao":"Steam","valor":-123.2,"data":"2023-04-06","mes":"2023-04"},{"descricao":"Comida","valor":-37.23,"data":"2023-12-08","mes":"2023-12"},{"descricao":"Comida","valor":-53.5,"data":"2023-12-08","mes":"2023-12"},{"descricao":"Cadernos","valor":-34.5,"data":"2023-12-29","mes":"2023-12"},{"descricao":"Comida","valor":"-12.4","data":"2023-12-08","mes":"2023-12"},{"descricao":"Eletricidade","valor":"-340","data":"2023-12-08","mes":"2023-12"},{"descricao":"Churros","valor":"34","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"213","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"213","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"45","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"345","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"234","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"43","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"23.4","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1.3","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"1","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"23","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Comida","valor":"-310","data":"2023-12-06","mes":"2023-03"},{"descricao":"Sem categoria","valor":"34","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"34.3","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"23.12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"34.12","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"234","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"341","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"34.3","data":"2023-12-22","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-08","mes":"2023-12"},{"descricao":"Sem categoria","valor":"34.4","data":"2023-12-27","mes":"2023-12"},{"descricao":"Sem categoria","valor":"123","data":"2023-12-29","mes":"2023-12"},{"descricao":"Encanamento","valor":-54,"data":"2023-12-08","mes":"2023-12"},{"descricao":"Eletricidade","valor":-210,"data":"2023-04-20","mes":"2023-04"}]);
}
*/
//criarResultadoMes("maio");
