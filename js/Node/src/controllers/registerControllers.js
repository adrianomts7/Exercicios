const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
    res.render('register')
}

exports.register = async (req, res) => {
    try{
        const register = new Register(req.body)
        await register.register()

        if(register.erros.length > 0){
            req.flash('erros', register.erros)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Usuario registrado')
        req.session.save(() => {
            return res.redirect('/login')
        })
    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}