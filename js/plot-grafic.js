//Script dedicado as configurações dos gráficos

//Os únicos parâmetros obrigatórios são id, valoresX e valoresX. Todos os outros tem valores padrões
function criarGrafico(id, valoresX, valoresY, tipo, cores, titulo, legenda){
    tipo = tipo ? tipo : "line";
    titulo = titulo ? titulo : "Despesas por categoria";
    let mostrarTitulo;

    if(tipo == "line"){
        //valoresY = Array.from(valoresY, (y) => Number(y));
        cores = cores ? cores : "blue";
        legenda = legenda ? legenda : "Gastos";
        mostrarTitulo = false;
    }
    else{
        cores = cores ? cores : ["rgb(2, 149, 206)", "rgb(80, 174, 83)","rgb(244, 66, 55)", "green", "purple"];
        legenda = valoresX;
        mostrarTitulo = true;
    }
    new Chart(id, {
        type: 'doughnut',
        data: {
            labels: valoresX,
            datasets: [{
                label: legenda,
                backgroundColor: cores,
                data: valoresY,
                fill: false,
                lineTension: 0,
            }]
        },
        options: {
            title: {
                display: mostrarTitulo,
                text: titulo
            }
        }
    });
}

criarGrafico("myChart", ["Saldo Atual", "Receita", "Despesas"], ["2300.20", "430.00", "523.60"], "pie");