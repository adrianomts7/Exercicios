const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true, default: ''},
    sobrenome: {type: String, required: true, default: ''},
    email: {type: String, required: true, default: ''},
    telefone: {type: String, required: true, default: ''},
    tipo: {type: String, enum: ['Pessoal', 'Trabalho'],required: true, default: ''},
    criadoEm: {type: Date, required: true, default: Date.now}
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body){
    this.body = body
    this.erros = []
    this.contato = null
}

Contato.prototype.register = async function(){
    this.valida()
    
    if(this.erros.length > 0) return
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function(){
    this.cleanUp()
    if(this.erros.length > 0) return
    
    if(!this.body.email && !validator.isEmail(this.body.email)) this.erros.push('E-mail invalido')
    if(this.body.nome.length < 3) this.erros.push('Nome invalido')
    if(!this.body.telefone.length === 11)this.erros.push('Telefone invalido')
    
}

Contato.prototype.cleanUp = function(){
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
        tipo: this.body.tipo
    }
}

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return
    this.valida()
    if(this.erros.length > 0) return

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
}

Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return
    const user = await ContatoModel.findById(id)
    return user
}

Contato.buscaContato = async function(){
    const contato = await ContatoModel.find()
        .sort( {criadoEm: -1} )
    return contato
}

Contato.delete = async function(id){
    if(typeof id !== 'string') return
    const contato = await ContatoModel.findByIdAndDelete({_id: id})
    return contato
}

module.exports = Contato