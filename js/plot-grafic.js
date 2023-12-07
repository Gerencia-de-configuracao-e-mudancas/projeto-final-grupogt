//Script dedicado as configurações dos gráficos

//Os únicos parâmetros obrigatórios são id, valoresX e valoresX. Todos os outros tem valores padrões
function criarGrafico(id, valoresX, valoresY, cores, titulo, legenda) {
    let mostrarTitulo;
    cores = cores ? cores : ["rgb(2, 149, 206)", "rgb(80, 174, 83)", "rgb(244, 66, 55)"];
    legenda = valoresX;
    mostrarTitulo = true;

    new Chart(id, {
        type: 'doughnut',
        data: {

            datasets: [{
                label: legenda,
                backgroundColor: cores,
                data: valoresY,
                fill: false,
                lineTension: 0,
                borderWidth: 1
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

    new Chart(id, {
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

criarGrafico("myChart", ["Saldo", "Receita", "Despesas"], ["2300.20", "430.00", "523.60"]);
criarGraficoBarra("myChartBar", ["Receita", "Despesas"], ["430.00", "523.60"])