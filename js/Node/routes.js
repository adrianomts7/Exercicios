const express = require('express')
const route = express.Router()
const loginControllers = require('./src/controllers/loginControllers')
const registerControllers = require('./src/controllers/registerControllers')

// Login
route.get('/login', loginControllers.index)

// Register
route.get('/register', registerControllers.index)

module.exports = route