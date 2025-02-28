const Contato = require('../models/ContatoModel')

exports.index =  (req,res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async (req,res) => {
    try{
        const contato = new Contato(req.body)
        await contato.register()

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => {
                return res.redirect(req.get('contato') || '/contato')
            })
            return
        }

        req.flash('success', 'Contato Registrado com Sucesso')
        req.session.save(() => {
            return res.redirect('/')
        })

    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contato = await Contato.buscarPorId(req.params.id)
    if(!contato) return res.render('404')

    res.render('contato', { contato })
}

exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404')

        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => { res.redirect('back') })
            return
        }

        req.flash('success', 'Contato Editado Com Sucesso')
        req.session.save(() => { res.redirect('/') })
        return

    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.delete = async (req,res) => {
    if(!req.params.id) return res.render('404')

    const contato = await Contato.delete(req.params.id)
    if(!contato) res.render('404')

    req.flash('success', 'Contato Deletado com Sucesso')
    req.session.save(() => { res.redirect('/') })
    return
}