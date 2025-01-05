exports.dadosCliente = (req, res, next) => {
    res.send(`Os dados recebidos foram: ${req.body.nome} ${req.body.sobrenome} ${req.body.dataNascimento}`)
    next()
}