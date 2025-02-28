const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    criadoEm: {type: Date, required: true, default: Date.now}
}) 

const ContatoModel = mongoose.model('Contatos', ContatoSchema)

class Contato{
    constructor(body){
        this.body = body
        this.erros = []
        this.contato = null
    }

    async register(){
        this.valida()
        if(this.erros.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    valida(){
        this.cleanUp()
        if(this.erros.length > 0) return

        if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push('E-mail invalido')
        if(this.body.telefone.length < 11) this.erros.push('Telefone invalido')
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }

    async edit(id){
        if(typeof id !== 'string') return
        this.valida()
        if(this.erros.length > 0) return

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
    }

    static async buscarPorId(id){
        if(typeof id !== 'string') return

        const contato = await ContatoModel.findById(id)
        return contato
    }

    static async buscaContato(){
        const contato = await ContatoModel.find().sort({criadoEm: -1})
        return contato
    }

    static async delete(id){
        if(typeof id !== 'string') return

        const contato = await ContatoModel.findByIdAndDelete({_id: id})
        return contato
    }

}

module.exports = Contato