function receberDataAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoje.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

//Analisa todas as movimentações de cada categoria e cria um resumo com os totais
function criarResultadoMes(nomeDoMes){
    console.log("Pelo menos roda");
    let listaFiltrada = filtrarPorMes(nomeDoMes);
    //console.log(`listaFiltrada pelo mes ${nomeDoMes}: `, listaFiltrada);
    if(listaFiltrada){
        let saida = {mes: nomeDoMes, descricao: [], ganho: [], despesa: [], valor: []};
        for(let i of listaFiltrada){
            //Se o saldo não tiver um nome ele será nomeado de "Outros"
            if(!i.descricao){
                console.log("Adicionado outros");
                i.descricao = "Outros";
            }
            //Descobre a posicao do saldo na lista de saida
            let posicao = saida.descricao.indexOf(i.descricao);

            //Para dizer se é uma despesa ou ganho
            let saldoAtual, segundoSaldo;
            if(i.valor > 0){
                saldoAtual = "ganho";
                segundoSaldo = "despesa";
            }
            else{
                saldoAtual = "despesa";
                segundoSaldo = "ganho";
            }

            //Se o saldo não tiver uma posição na lista ele cria uma nova
            if(posicao == -1){
                saida.descricao.push(i.descricao);
                saida[saldoAtual].push(Number(i.valor));
                saida[segundoSaldo].push(0);
            }
            else{//Do contrario adiciona o valor na posicao correspondente
                saida[saldoAtual][posicao] += Number(i.valor);
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

//Resumos
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

function atualizarValoresHTML(){
    let valorReceitas = document.getElementById("receitas");
    let valorSaldoAtual = document.getElementById("saldo-atual");
    let valorDespesas = document.getElementById("despesas");
    let valorCartao = document.getElementById("cartao");

    const mesMarcado = seletor.value;
    let resumo = receberResumo();
    for(let i of resumo){
        if(i.mes == mesMarcado){
            resumo = i;
            break;
        }
    }
    
    let totalDespesas = resumo.despesa.reduce((total, atual) => {return total + atual}, 0).toFixed(2);
    let totalReceitas = resumo.ganho.reduce((total, atual) => {return total + atual}, 0).toFixed(2);
    let totalSaldoAtual;

    let listaFinancas = receberElemento();
    console.log("listaFinancas: ",listaFinancas);
    if(listaFinancas){
        if(receberDataAtual().slice(0, -3) == seletor.value){
            totalSaldoAtual = somatorioCampo(receberElemento(), "valor", receberDataAtual());
        }
        else{
            console.log(seletor.value+"-31");
            totalSaldoAtual = somatorioCampo(receberElemento(), "valor", seletor.value+"-31");
        }
        
    }
    else{
        totalSaldoAtual = 0;
    }
    

    console.log("totalDespesas: ", totalDespesas);
    console.log("totalReceitas: ", totalReceitas);

    valorReceitas.textContent = "R$ " + totalReceitas;
    valorDespesas.textContent = "R$ " + totalDespesas;
    valorSaldoAtual.textContent = "R$ " + totalSaldoAtual;
}

let seletor = document.querySelector("#sele-month");
seletor.addEventListener("click", ()=>{
    console.log("Mes marcado: ", seletor.value);
    criarResultadoMes(seletor.value);
    atualizarValoresHTML();
    graficoCategorias();
    graficoDespesasGanhos();
});

//Retorna o resumo do mes marcado no select
function retornarResumoDoMes(){
    let mesMarcado = document.querySelector("#sele-month").value;
    console.log(seletor.value);
    console.log("Mes marcado: ", mesMarcado);
    let resumo = receberResumo();
    for(let i of resumo){
        if(i.mes == mesMarcado){
            resumo = i;
            break;
        }
    }
    return resumo;    
}

function graficoCategorias(){
    console.log(" ");
    console.log("Grafico categorias");
    console.log(" ");

    const resumo = retornarResumoDoMes();

    let valoresX = [], valoresY = [];
    let contador = 0;
    for(let i of resumo["despesa"]){
        if(i){
            valoresX.push(resumo.descricao[contador]);
            valoresY.push(-i);
        }

        contador++;
    };

    //console.log("valoresX", valoresX);
    //console.log("valoresY", valoresY);

    if(graficoDognut != null){
        graficoDognut.destroy();
    }
    graficoDognut = funcaoGraficoDognut("myChart", valoresX, valoresY);
    //graficoDognut = criarGrafico("myChart", valoresX, valoresY);
}
function graficoDespesasGanhos(){
    const resumo = retornarResumoDoMes();

    const valorDespesas = -resumo.despesa.reduce((total, numAtual)=>{return total += Number(numAtual)}, 0);
    const valorReceita = resumo.ganho.reduce((total, numAtual)=>{return total += Number(numAtual)}, 0);
    let valoresY = [valorReceita, valorDespesas];

    if(graficoBarra != null){
        graficoBarra.destroy();
    }

    graficoBarra = criarGraficoBarra("myChartBar", ["Receita", "Despesas"], valoresY);
}

let graficoDognut = null;
let graficoBarra = null;

window.addEventListener("load", ()=>{
    console.log("Função de inicialização")
    preencherMesesUtilizados();
    adicionarNovoMes(receberDataAtual().slice(0, -3));
    for(let i of valoresUnicosArray(receberElemento(), "mes")){
        adicionarNovoMes(i);
    }
    criarResultadoMes(receberDataAtual().slice(0, -3));
    seletor.value = receberDataAtual().slice(0, -3);
    atualizarValoresHTML();
    graficoCategorias();
    graficoDespesasGanhos();
});