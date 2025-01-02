const express = require('express')
const route = express.Router()
const homeControllers = require('../Node/controllers/homeControllers')
const contatoControllers = require('../Node/controllers/contatoControllers')

// Home
route.get('/', homeControllers.paginaInicial)

//Contato
route.get('/contato', contatoControllers.paginaInicial)
route.post('/contato', contatoControllers.trataPost)

module.exports = route