class ValidaCpf{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    eSequencial(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
    }

    geraNovoCpf(){
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2)
        const primeiroDigito = this.geraDigito(cpfSemDigitos)
        const segundoDigito = this.geraDigito(cpfSemDigitos + primeiroDigito)


        this.novoCpf = cpfSemDigitos + primeiroDigito + segundoDigito
    }

    geraDigito(cpfSemDigitos){
        let total = 0
        let reverso = cpfSemDigitos.length + 1

        for(let numeroString of cpfSemDigitos){
            total += reverso * Number(numeroString)
            reverso --
        }

        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }

    valida(){
        if(!this.cpfLimpo) return false
        if(typeof this.cpfLimpo !== 'string') return false
        if(this.cpfLimpo.length !== 11) return false
        if(this.eSequencial()) return false

        this.geraNovoCpf()

        return this.novoCpf === this.cpfLimpo
    }


}

let display = document.querySelector('.display')

document.addEventListener('click', event =>{
    const e = event.target

    if(e.classList.contains('verificaCpf')){
        const cpfUsuario = document.querySelector('.cpf-usuario').value
        let verificaCpf = new ValidaCpf(cpfUsuario)

        if(verificaCpf.valida()){
            display.innerText = 'CPF Válido'
            display.style.color = '#00EB3F'
        }
        else{
            display.innerText = 'CPF Invalido'
            display.style.color = 'red'
        }
    }

})