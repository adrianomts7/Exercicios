const ContatoModel = require('../models/contatomodels')

exports.index = (req, res) => {
    res.render('login')
}

exports.trataPost = (req, res) => {
    return res.send('Dados recebido com sucesso!')
}