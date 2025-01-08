const ContatoModel = require('../models/contatomodels')

// ContatoModel.create({
//     nome: 'Adriano',
//     sobrenome: 'Mateus',
//     dataNascimento: '07/12/2005'
// })
//     .then(dados => console.log(dados))
//      .catch(e => console.log(e))

ContatoModel.find()
    .then(dados => console.log(dados))
    .catch(e => console.log(e))

exports.paginaInicial = (req, res) => {
    res.render('index')
}

exports.trataPost = (req, res) => {
    return res.send('Dados recebido com sucesso!')
}