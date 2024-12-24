function Relogio(){
    const relogio = document.querySelector('.relogio')
    let status = document.querySelector('.status')
    let segundos = 0
    let timer

    function criaSegundos(segundos){
        const data = new Date(segundos * 1000)
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        })
    }

    function iniciaRelogio(){
        timer = setInterval(() => {
            segundos ++
            console.log(segundos)
            relogio.innerText = criaSegundos(segundos)
        }, 1000)
    }

    document.addEventListener('click', event => {
        const e = event.target

        if(e.classList.contains('iniciar')){
            relogio.classList.remove('pausado')
            clearInterval(timer)
            iniciaRelogio()
            status.innerHTML = 'Cronômetro Iniciado'
            status.style.color = '#1EB334'
        }

        if(e.classList.contains('pausar')){
            relogio.classList.add('pausado')
            clearInterval(timer)
            status.innerHTML = 'Cronômetro Pausado'
            status.style.color = '#DBD002'
        }

        if(e.classList.contains('zerar')){
            clearInterval(timer)
            relogio.classList.remove('pausado')
            relogio.innerHTML = '00:00:00'
            segundos = 0
            status.innerHTML = 'Cronômetro Zerado'
            status.style.color = '#DC0501'
        }

    })

}

Relogio()