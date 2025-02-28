const Login = require('../models/RegisterModel')

exports.index = (req,res) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.login = async function(req, res){
    try{
        const login = new Login(req.body)
        await login.login()

        if(login.erros.length > 0){
            req.flash('erros', login.erros)
            req.session.save(() => { 
                return res.redirect('back') 
            })
            return
        }

        req.flash('success', 'Você entrou no sistema')
        req.session.user = login.user
        req.session.save(() => {
            return res.redirect('back')
        })

    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.logout = (req,res) => {
    req.session.destroy()
    res.redirect('/login')
    return
}