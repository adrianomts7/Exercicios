function Relogio(){
    let display = document.querySelector('.display')

    let data = new Date()

    let horaAtual = data.toLocaleString('pt-BR', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    display.innerHTML = horaAtual

}

setInterval(Relogio, 1000)
Relogio()