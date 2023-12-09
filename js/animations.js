//TRATANDO O "LOGIN"
document.querySelector("#form").addEventListener('submit', e => {
    e.preventDefault();
    console.log("aa");

    const user = document.querySelector('#user').value;
    const pass = document.querySelector('#senha').value;

    if (user === 'Dom Vito' && pass === 'corleone') {
        window.location.href = './SRC/main.html';
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuário ou senha incorretos",
        });
    }
})