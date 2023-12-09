//Referente as funções para adicionar.html
//Requer sweetalert2.all.min.js e local-storage.js para rodar

//Cria um pop up e coleta os dados ao clicar em + nova despesa
function popUpNovaDespesa(){
  Swal.fire({
    title: 'Insira nova despesa',
    html:
      '<input type="text" id="inputNome" class="swal2-input" placeholder="Categoria (opicional)">' +
      '<input type="text" id="inputValor" class="swal2-input" placeholder="Valor">'+
      '<input type="date" id="inputData" class="swal2-input" value="' + receberDataAtual() + '">',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {

      //Recebendo os valores
      let inputNome = document.getElementById('inputNome').value;
      let inputValor = document.getElementById('inputValor').value;
      const inputData = document.getElementById("inputData").value;

      inputValor = inputValor.replace(",", ".");

      if (!inputValor) {
        Swal.showValidationMessage('Campo de valor precisa ser preenchido');
        return false;
      }
      else if(inputValor != Number(inputValor)){
        Swal.showValidationMessage('Valor precisa ser um número');
        return false;
      }
      else if(inputValor <= 0){
        Swal.showValidationMessage('Valor deve ser um número maior que 0');
        return false;
      }
      else if(!inputData){
        Swal.showValidationMessage('Data não pode estar vazia');
        return false;
      }

      inputNome = inputNome ? inputNome : "Sem categoria";

      let saidaHTML;
      if(inputData <= receberDataAtual()){
        saidaHTML = document.getElementById("despesas-atuais");
      }
      else{
        saidaHTML = document.getElementById("despesas-agendadas");
      }
      
      //Precisa substituir a vírgula por ponto para converter em número
      let recorte = saidaHTML.textContent.slice(3, -1)
      recorte = recorte.replace(",",".");
      let novaSaida = Number(recorte) - Number(inputValor);
      novaSaida = novaSaida.toFixed(2);

      //Atualiza os valores na tela
      saidaHTML.textContent = "R$ " + novaSaida;

      //Essa parte vai adicionar os inputs ao localStorage
      armazenarElemento({descricao: inputNome, valor: -inputValor, data: inputData, mes: inputData.slice(0, -3)});
      
      //Se for um mês que não está nas opções ele passa a fazer parte
      adicionarNovoMes(inputData.slice(0, -3));
    }
  });
}

function receberDataAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
  const dia = hoje.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

//Cria um pop up e coleta os dados ao clicar em + nova despesa
function popUpNovoGanho(){
    Swal.fire({
        title: 'Insira novo ganho',
        html:
          '<input type="text" id="inputNome" class="swal2-input" placeholder="Categoria (opicional)">' +
          '<input type="text" id="inputValor" class="swal2-input" placeholder="Valor">'+
          '<input type="date" id="inputData" class="swal2-input" value="' + receberDataAtual() + '">',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {

          //Recebendo os valores
          let inputNome = document.getElementById('inputNome').value;
          const inputValor = document.getElementById('inputValor').value;
          const inputData = document.getElementById("inputData").value;
    
          if (!inputValor) {
            Swal.showValidationMessage('Campo de valor precisa ser preenchido');
            return false;
          }
          else if(inputValor != Number(inputValor)){
            Swal.showValidationMessage('Valor precisa ser um número');
            return false;
          }
          else if(inputValor <= 0){
            Swal.showValidationMessage('Valor deve ser um número maior que 0');
            return false;
          }
          else if(!inputData){
            Swal.showValidationMessage('Data não pode estar vazia');
            return false;
          }

          inputNome = inputNome ? inputNome : "Sem categoria";

          let saidaHTML;
          if(inputData <= receberDataAtual()){
            saidaHTML = document.getElementById("ganhos-atuais");
          }
          else{
            saidaHTML = document.getElementById("ganhos-agendados");
          }

          //Precisa substituir a vírgula por ponto para converter em número
          let recorte = saidaHTML.textContent.slice(3, -1)
          recorte = recorte.replace(",",".");
          let novaSaida = Number(recorte) + Number(inputValor);
          novaSaida.toFixed(2);
          saidaHTML.textContent = "R$ " + novaSaida;

          //Essa parte vai adicionar os inputs ao localStorage
          armazenarElemento({descricao: inputNome, valor: inputValor, data: inputData, mes: inputData.slice(0, -3)});
          
          //Se o mês não estiver no selector ele é adicionado como opção
          adicionarNovoMes(inputData.slice(0, -3));
        }
    });
}


//Vê todas as transações e calcula despesas e ganhos para aparecerem na tela
function GanhosAtuaisEAgendados(){
  let mesAtual = document.getElementById("sele-month").value;
  const dataAtual = receberDataAtual();
  let total = {ganho: {atual: 0, agendado: 0}, despesa: {atual: 0, agendado: 0}};
  let listaMes;  
  if(mesAtual != 'geral'){
      listaMes = filtrarPorMes(mesAtual);
  }
  else{
      listaMes = receberElemento();
  }

  //Percorre todos os valores armazenados daquele respectivo mês
  if(listaMes){
    for(let i of listaMes){
      if(i.valor > 0){//Verifica se é um ganho
        if(i.data <= dataAtual){
          total.ganho.atual += Number(i.valor);
        }
        else{
          total.ganho.agendado += Number(i.valor);
        }
      }
      else{//Verifica que é uma despesa
        if(i.data <= dataAtual){
          total.despesa.atual += Number(i.valor);
        }
        else{
          total.despesa.agendado += Number(i.valor);
        }
      }
    }
  }
  else{
    total.ganho.atual = 0;
    total.ganho.agendado = 0;

    total.despesa.atual = 0;
    total.despesa.agendado = 0;
  }

  //Atualiza os valores na tela de acordo com os novos totais calculados
  document.getElementById("ganhos-atuais").textContent = "R$ " + total.ganho.atual.toFixed(2);
  document.getElementById("ganhos-agendados").textContent = "R$ " + total.ganho.agendado.toFixed(2);

  document.getElementById("despesas-atuais").textContent = "R$ " + total.despesa.atual.toFixed(2);
  document.getElementById("despesas-agendadas").textContent = "R$ " + total.despesa.agendado.toFixed(2);
}

//Adicionando o evento de pop up nos botões
document.getElementById("lose-button").addEventListener("click", popUpNovaDespesa);
document.getElementById("win-button").addEventListener("click", popUpNovoGanho);

//Muda os valores na tela quando troca o mês selecionado
let seletor = document.getElementById("sele-month");
seletor.addEventListener("click", GanhosAtuaisEAgendados);

//Função de inicialização em suma pega dados armazenagos no cache
window.addEventListener("load", ()=>{
  preencherMesesUtilizados();
  adicionarNovoMes(receberDataAtual().slice(0, -3));
  seletor.value = receberDataAtual().slice(0, -3);
  GanhosAtuaisEAgendados(); 
});