const express = require('express')
const app = express()
const route = require('./routes')
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(route)

app.listen(3000, () => {
    console.log('Acesse ao  terminal: http://localhost:3000')
    console.log('Servidor inicializado com sucesso')
})