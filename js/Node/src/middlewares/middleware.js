exports.dadosCliente = (req, res, next) => {
    if(req.body.nome){
        res.send(`Os dados recebidos foram: ${req.body.nome} ${req.body.sobrenome} ${req.body.dataNascimento}`)
        console.log(`${req.body.nome} ${req.body.sobrenome} ${req.body.dataNascimento}`)
    }
    
    next()
}
