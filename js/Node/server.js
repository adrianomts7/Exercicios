const express = require('express')
const app = express()
const route = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(route)

app.listen(3000, () => {
    console.log('Acesse o Servidor: http://localhost:3000')
})