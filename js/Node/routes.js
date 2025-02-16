const express = require('express')
const route = express.Router()
const loginControllers = require('./src/controllers/loginControllers')
const registerController = require('./src/controllers/registerControllers')

// Login
route.get('/login', loginControllers.index)
route.post('/login/login', loginControllers.login)
route.get('/login/logout', loginControllers.logout)

// Register
route.get('/register', registerController.index)
route.post('/register/register', registerController.register)

module.exports = route