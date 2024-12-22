function Calculadora(){
    let display = document.querySelector('.display');

    this.inicia = () => {
        this.capturaCliques()
    }

    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const e = event.target

            if(e.classList.contains('btn-num')) this.adicionarNumeroDisplay(e)
            if(e.classList.contains('btn-clear')) this.limparTela()
            if(e.classList.contains('btn-cal')) this.realizaConta()
            if(e.classList.contains('btn-del')) this.apagarNumero()

        })
    }

    this.limparTela = () => {
        display.value = ' '
    }

    this.adicionarNumeroDisplay = (valor) => {
        display.value += valor.innerText
    }

    this.apagarNumero = () => {
        display.value = display.value.slice(0, -1)
    }

    this.realizaConta = () => {
        try{
            const conta = eval(display.value)
            
            if(!conta){
                alert('Conta Invalida!')
                return this.limparTela()
            }

            this.limparTela()
            display.value = String(conta)
        }
        catch{
            alert('Conta Invalida!')
            this.limparTela()
        }
    }

}

const calcula = new Calculadora()
calcula.inicia()