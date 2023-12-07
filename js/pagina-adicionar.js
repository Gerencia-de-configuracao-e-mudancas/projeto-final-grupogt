//Requer sweetalert2.all.min.js e local-storage.js para rodar

//Cria um pop up e coleta os dados ao clicar em + nova despesa
function popUpNovaDespesa(){
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

      //Essa parte vai adicionar os inputs ao localStorage
      armazenarElemento({descricao: inputNome, valor: -inputValor, data: inputData});
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

          //Essa parte vai adicionar os inputs ao localStorage
          armazenarElemento({descricao: inputNome, valor: inputValor, data: inputData});
        }
    });
}

//Adicionando o evento de pop up nos botões
document.getElementById("lose-button").addEventListener("click", popUpNovaDespesa);
document.getElementById("win-button").addEventListener("click", popUpNovoGanho);
