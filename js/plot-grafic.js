//Script dedicado as configurações dos gráficos

//Os únicos parâmetros obrigatórios são id, valoresX e valoresX. Todos os outros tem valores padrões
function criarGrafico(id, valoresX, valoresY, cores, titulo, legenda) {
    let mostrarTitulo;
    cores = cores ? cores : ["rgb(2, 149, 206)", "rgb(80, 174, 83)", "rgb(244, 66, 55)", "rgb(238, 251, 0)", "rgb(255, 155, 0)"];
    legenda = valoresX;
    mostrarTitulo = true;

    return new Chart(id, {
        type: 'doughnut',
        data: {

            datasets: [{
                label: legenda,
                backgroundColor: cores,
                data: valoresY,
                fill: false,
                lineTension: 0,
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: mostrarTitulo,
                text: titulo
            },
            cutout: '80%' //Propriedade para tornar o gráfico mais "fino";
        }
    });
}

//Plot destinado ao grafico em barra
function criarGraficoBarra(id, valoresX, valoresY, cores, legenda) {
    let mostrarTitulo;
    cores = cores ? cores : ["rgb(80, 174, 83)", "rgb(244, 66, 55)"];
    legenda = valoresX;
    mostrarTitulo = true;

    return new Chart(id, {
        type: 'bar',
        data: {
            labels: valoresX,
            datasets: [{
                label: '# of Votes',
                data: valoresY,
                backgroundColor: cores,
                lineTension: 1,
                borderWidth: 1,
                borderRadius: 100 ,
    
            }]
        },
        options: {
            
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            //Ocultando eixos e legendas
            scales: {
                x: {
                    display: false, 
                },
                y: {
                    display: false,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

//Funcao para criar o chart do circular da pagina main
function funcaoGraficoDognut(id, valoresX, valoresY){
    // Sample data
const data = {
    labels: valoresX,
    datasets: [
      {
        data: valoresY,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        fill: false,
        lineTension: 0,
        borderWidth: 1
      },
    ],
  };

    // Chart configuration
    const config = {
        type: "doughnut",
        data: data,
        options: {
            cutout: '78%',
            plugins: {
                tooltip: {
                    callbacks: {
                    label: (context) => {
                        // Recebe o index do elemento sobre o mouse
                        const dataIndex = context.dataIndex;
                        
                        // Recebe o label da categoria
                        const label = data.labels[dataIndex];

                        // Encontra a despesa correspondente e formata
                        const resumo=retornarResumoDoMes()
                        const posicaoNoResumo = resumo.descricao.findIndex((elementoLista)=>{return elementoLista == label});
                        let saida = -resumo.despesa[posicaoNoResumo].toFixed(2);
                        saida = "R$ " + saida;
                        saida = saida.replace(".", ",");

                        //Exibe saída na descrição do gráfico
                        return saida;
                        },
                    },
                },
            },
        },
    };
    
  return new Chart(document.getElementById(id), config);  
}

//criarGrafico("myChart", ["Saldo", "Receita", "Despesas"], ["2300.20", "430.00", "523.60"]);