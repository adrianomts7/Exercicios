const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/contato', (req, res) => {
    res.send(`
        <form action="/contato" method="POST">
        Nome: <input type="test" nome="nome">
        <button>Enviar</button>
        </form>
        `)
})

app.post('/contato', (req,res) => {
    res.send('Formulario Entregue')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
    console.log('Servidor executando na porta 3000')
})