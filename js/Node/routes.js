const express = require('express')
const route = express.Router()
const loginControllers = require('./src/controllers/loginControllers')
const registerController = require('./src/controllers/registerControllers')
const contatoControler = require('./src/controllers/contatoControllers')

// Login
route.get('/login', loginControllers.index)
route.post('/login/login', loginControllers.login)
route.get('/login/logout', loginControllers.logout)

// Register
route.get('/register', registerController.index)
route.post('/register/register', registerController.register)

// Contato
route.get('/contato', contatoControler.index)

module.exports = route