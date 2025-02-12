const express = require('express')
const route = express.Router()
const loginControllers = require('./src/controllers/loginControllers')
const registerController = require('./src/controllers/registerControllers')

// Login
route.get('/login', loginControllers.index)

// Register
route.get('/register', registerController.index)
route.post('/register', registerController.register)

module.exports = route