const express = require('express')
const route = express.Router()
const homeControllers = require('./src/controllers/homeControllers')
const contatoControllers = require('./src/controllers/contatoControllers')

// Home
route.get('/', homeControllers.paginaInicial)

//Contato
route.get('/contato', contatoControllers.paginaInicial)
route.post('/contato', contatoControllers.trataPost)

module.exports = route