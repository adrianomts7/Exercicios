const mongoose = require('mongoose')

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, require},
    sobrenome: {type: String, require},
    dataNascimento: {type: String, require},
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

module.exports = ContatoModel