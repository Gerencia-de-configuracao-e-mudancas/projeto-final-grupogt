//Script dedicado as configurações dos gráficos

function criarGrafico(id, valoresX, valoresY, tipo, cores, titulo){
    tipo = tipo ? tipo : "line";
    cores = cores ? cores : ["red", "blue", "yellow", "green", "purple"];
    titulo = titulo ? titulo : "Despesas por categoria";
    new Chart(id, {
    type: tipo,
    data: {
        labels: valoresX,
        datasets: [{
        backgroundColor: cores,
        data: valoresY
        }]
    },
    options: {
        title: {
        display: true,
        text: titulo
        }
    }
    });
}

criarGrafico("myChart", ["Casa", "Escola", "Lazer"], ["2300.20", "430.00", "523.60"], "pie");
criarGrafico("linha", ["Casa", "Escola", "Lazer"], ["2300.20", "430.00", "523.60"]);