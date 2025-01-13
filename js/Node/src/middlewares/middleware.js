exports.dadosCliente = (req, res, next) => {
    if(req.body.nome){
        res.send(`Os dados recebidos foram: ${req.body.nome} ${req.body.sobrenome} ${req.body.dataNascimento}`)
        console.log(`${req.body.nome} ${req.body.sobrenome} ${req.body.dataNascimento}`)
    }
    
    next()
}

exports.checkCsurfError = (err, req, res, next) => {
    if(err & 'EBADCSRFTOKEN' === err.code){
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}