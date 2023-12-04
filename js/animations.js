/*Separando elementos importantes*/
const botomMenu = document.querySelector("#more-menu");
const menu = document.querySelector("#menu");

botomMenu.addEventListener('click', _ => {
    menu.classList.toggle('sumir');
})