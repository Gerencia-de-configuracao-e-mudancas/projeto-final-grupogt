/*Separando elementos importantes*/
const botomMenu = document.querySelector("#more-menu");
const menu = document.querySelector("#menu");

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




document.querySelectorAll("[bizu]").forEach(link => {
    link.onclick = e => {
        e.preventDefault();

        const conteudo = document.getElementById("conteudo");

        fetch(link.getAttribute("bizu")) //Pegando o href do corpo do link
            .then(cont => cont.text()) //pegando o conteúdo html do href indicao ------ BIZU
            .then(forma => conteudo.innerHTML = forma);  //Adicioanndo o conteudo (que foi retonado pra cá) na página
    }
})