require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.url_db)
    .then(() => {
        console.log('Conectei ao base de dados')
        app.emit('pronto')
    })
    .catch(e => console.log(e))

const route = require('./routes')
const path = require('path')
const {dadosCliente, helloWorld} = require('./src/middlewares/middleware')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(dadosCliente)
app.use(route)

app.on('pronto', () => {

})
app.listen(3000, () => {
    console.log('Acesse ao  terminal: http://localhost:3000')
    console.log('Servidor inicializado com sucesso')
})