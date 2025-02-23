const Register = require('../models/RegisterModel')

exports.index = (req,res) => {
    res.render('register')
}

exports.register = async function(req, res){
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

        req.flash('success', 'Usuario Registrado com sucesso!')
        req.session.save(() => {
            return res.redirect('login')
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}