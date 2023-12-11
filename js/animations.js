//TRATANDO O "LOGIN"
document.querySelector("#form").addEventListener('submit', e => {
    e.preventDefault();
    console.log("aa");

    const user = document.querySelector('#user').value;
    const pass = document.querySelector('#senha').value;

    let timerInterval;
    Swal.fire({
        title: "Carregando",
        html: "Aguarde",
        timer: 3000,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
            if (user === 'Dom Vito' && pass === 'corleone') {
                window.location.href = './SRC/main.html';
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Usuário ou senha incorretos",
                });
            }
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });

})