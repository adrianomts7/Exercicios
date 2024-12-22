function Calculadora() {
    let display = document.querySelector('.display')

    this.inicia = () => {
        this.capturaCliques()
        this.pressionarEnter()
    }

    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const e = event.target

            if(e.classList.contains('btn-num')) this.adicionarTela(e)
            if(e.classList.contains('btn-clear')) this.limpaTela()
            if(e.classList.contains('btn-del')) this.apagarNumero()    
            if(e.classList.contains('btn-cal')) this.realizaConta()
        })
    }

    this.pressionarEnter = () => {
        document.addEventListener('keypress', e => {
            if(e.keyCode === 13) this.realizaConta()
        })
    }

    this.adicionarTela = (e) => {
        display.value += e.innerText
        display.focus()
    }

    this.limpaTela = () => {
        display.value = ' '
    }

    this.apagarNumero = () => {
        display.value = display.value.slice(0, -1)
    }

    this.realizaConta = () => {
        try{
            const conta = eval(display.value)

            if(!conta){
                alert('Conta Invalida')
                return this.limpaTela()
            }

            this.limpaTela()
            display.value = String(conta)
        }
        catch{
            alert('Conta Invalida')
            this.limpaTela()
        }
    }

}

const calcula = new Calculadora()
calcula.inicia()