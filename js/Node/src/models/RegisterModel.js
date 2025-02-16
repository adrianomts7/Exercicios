const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const RegisterSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const RegisterModel = mongoose.model('Register', RegisterSchema)

class Register{
    constructor(body){
        this.body = body
        this.erros = []
        this.user = null
    }

    async login(){
        this.valida()
        if(this.erros.length > 0) return
        this.user = await RegisterModel.findOne({ email: this.body.email})

        if(!this.user){
            this.erros.push('Usuario não existe')
            return
        }

        // if(!bcrypt.compareSync(this.body.password, this.body.password)){
        //     this.erros.push('Senha Invalida')
        //     this.user = null
        //     return
        // }

    }

    async register(){
        this.valida()
        
        await this.userExists()
        if(this.erros.length > 0) return
        
        // const salt = bcrypt.genSaltSync()
        // this.body.password = bcrypt.hashSync(this.body.password, salt)
        this.user = await RegisterModel.create(this.body)
    }

    async userExists(){
        this.user = await RegisterModel.findOne({email: this.body.email})
        if(this.user) this.erros.push('Usuario já existe')
    }

    valida(){
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail invalido')
        if(this.body.password.length < 3 || this.body.password.length > 15) this.erros.push('O password deve conter entre 3 a 15 caracteres')
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