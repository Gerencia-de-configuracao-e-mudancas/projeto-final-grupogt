/*Separando elementos importantes*/
const botomMenu = document.querySelector("#more-menu");
const menu = document.querySelector("#menu");
/*Voltando a pagina inicial*/
const homePage = document.querySelector("#home").addEventListener('click', _ => {
    location.reload();
})

botomMenu.addEventListener('click', _ => {
    menu.classList.toggle('sumir');
})

/*Transição entre uma página e outra com requisição AJAX*/
const myLinks = document.querySelectorAll('[link]');  /*Nesse caso, é necessário não atribuir o link ao href, para evitar o comportamneto padrão, que é o redirecionamento*/

myLinks.forEach(link => {
    link.onclick = e => {
        e.preventDefault();
        const conteudoSaida = document.querySelector("#dashboard");
        fetch(link.getAttribute('link'))
            .then(content => content.text())
            .then(forma => conteudoSaida.innerHTML = forma)
            .catch(err => console.log(err));
    }
})

/*Adicao de evento de click nos icone*/
myLinks.forEach(item => {
    item.addEventListener('click', _ => {
        /*Ajuste no estilo com relação ao grid quando ocorre a transição da página*/
        const dashZone = document.querySelector("#dashboard");
        dashZone.classList.remove('my-dash');
        dashZone.classList.add('container-controle');
    })
})

