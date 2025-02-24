import validator from 'validator'

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        let erros = []
        let msg = document.querySelector('.mensagens-erro')


        if(!validator.isEmail(emailInput.value)){
            erros.push('E-mail Invalido')
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 15){
            erros.push('Senha tem que ter entre 3 e 15 caracteres')
        }

        if(erros.length > 0){
            msg.innerHTML = erros.join('<br>')
            console.log('erro')
        }

        if(erros.length <= 0){
            el.submit()
        }

    }

}