exports.paginaInicial = (req, res) => {
    res.send(`
        <form action="/contato" method="POST">
        Nome: <input type="text" name="nome">
        <br>
        <br>
        Sobrenome: <input type="text" name="sobrenome">
        <br>
        <br>
        Idade: <input type="Number" min="1" max="100" name="idade">
        <br>
        <br>
        <button>Enviar</button>
        </form>
    `)
}

exports.trataPost = (req, res) => {
    res.send('Dados recebido com sucesso!')
}