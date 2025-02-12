const mongoose = require('mongoose')
const validator = require('validator')

const registerSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const RegisterModel = mongoose.model('Register', registerSchema)

class Register{
    constructor(body){
        this.body = body
        this.erros = []
        this.user = null
    }

    async register(){
        this.valida()
        if(this.erros.length > 0) return

        try{
            this.user = await RegisterModel.create(this.body)
        }
        catch(e){
            console.log(e)
        }
    }

    valida(){
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail invalido')
        if(this.body.password.length < 3 || this.body.password.length > 15) this.erros.push('O password precisa ter entre 3 e 15 caracteres')
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Register