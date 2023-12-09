/*Separando elementos importantes*/
const botomMenu = document.querySelector("#more-menu");
const menu = document.querySelector("#menu");

botomMenu.addEventListener('click', _ => {
    menu.classList.toggle('sumir');
})

//Redirecionando ao perfil
const perfil = document.querySelector('#miniatura').addEventListener('click', _ => {window.location.href = '../SRC/configuracoes.html'})