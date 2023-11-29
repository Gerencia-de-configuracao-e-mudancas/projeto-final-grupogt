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
        cores = cores ? cores : ["red", "blue", "yellow", "green", "purple"];
        legenda = valoresX;
        mostrarTitulo = true;
    }
    new Chart(id, {
        type: tipo,
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

criarGrafico("myChart", ["Casa", "Escola", "Lazer"], ["2300.20", "430.00", "523.60"], "pie");
criarGrafico("linha", [50,60,70,80,90,100,110,120,130,140,150], [7,8,8,9,9,9,10,11,14,14,15]);