//Requer sweetalert2.all.min.js e local-storage.js para rodar

function popUpNovaDespesa(){
    Swal.fire({
        title: 'Insira nova despesa',
        html:
          '<input type="text" id="input1" class="swal2-input" placeholder="Categoria (opicional)">'+
          '<input type="text" id="input2" class="swal2-input" placeholder="Valor">',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          //Recebendo os valores
          const inputNome = document.getElementById('input1').value;
          const inputValor = document.getElementById('input2').value;
    
          if (!inputValor) {
            Swal.showValidationMessage('Campo de valor precisa ser preenchido');
            return false;
          }
          if(inputValor != Number(inputValor)){
            console.log(inputValor.value, parseFloat(inputValor.value))
            Swal.showValidationMessage('Valor precisa ser um número');
            return false;
          }
    
          //Não sei como funciona, então por via das dúvidas é bom zerar os inputs
          document.getElementById('input1').value = "";
          document.getElementById('input2').value = "";
    
          //Essa parte vai adicionar os inputs ao localStorage
          console.log('Input 1:', inputNome);
          console.log('Input 2:', inputValor);
        }
    });
}

function popUpNovoGanho(){
    Swal.fire({
        title: 'Insira novo ganho',
        html:
          '<input type="text" id="inputNome" class="swal2-input" placeholder="Categoria (opicional)">' +
          '<input type="text" id="inputValor" class="swal2-input" placeholder="Valor">',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          //Recebendo os valores
          const inputNome = document.getElementById('inputNome').value;
          const inputValor = document.getElementById('inputValor').value;
    
          if (!inputValor) {
            Swal.showValidationMessage('Campo de valor precisa ser preenchido');
            return false;
          }
          if(inputValor != Number(inputValor)){
            console.log(inputValor.value, parseFloat(inputValor.value))
            Swal.showValidationMessage('Valor precisa ser um número');
            return false;
          }
    
          //Não sei como funciona, então por via das dúvidas é bom zerar os inputs
          document.getElementById('input1').value = "";
          document.getElementById('input2').value = "";
    
          //Essa parte vai adicionar os inputs ao localStorage
          console.log('Input 1:', inputNome);
          console.log('Input 2:', inputValor);
        }
    });
}

document.getElementById("lose-button").addEventListener("click", popUpNovaDespesa);
document.getElementById("win-button").addEventListener("click", popUpNovoGanho);
