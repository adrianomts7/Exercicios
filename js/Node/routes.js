const express = require('express')
const route = express.Router()

const loginControllers = require('./src/controllers/loginControllers')
const registerController = require('./src/controllers/registerControllers')
const contatoControler = require('./src/controllers/contatoControllers')
const homeController = require('./src/controllers/homeControllers') 
const { loginRequired } = require('./src/middlewares/middleware')

route.get('/', homeController.index)

// Login
route.get('/login', loginControllers.index)
route.post('/login/login', loginControllers.login)
route.get('/login/logout', loginControllers.logout)

// Register
route.get('/register', registerController.index)
route.post('/register/register', registerController.register)

// Contato
route.get('/contato', contatoControler.index)
route.post('/contato/register', loginRequired, contatoControler.register)
route.get('/contato/index/:id', loginRequired, contatoControler.editIndex)
route.post('/contato/edit/:id', loginRequired, contatoControler.edit)
route.get('/contato/delete/:id', loginRequired, contatoControler.delete)

module.exports = route