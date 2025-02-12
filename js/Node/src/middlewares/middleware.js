exports.middlewareGlobal = (req, res, next) => {
    res.locals.erros = req.flash('erros')
    res.locals.success = req.flash('success')
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}
