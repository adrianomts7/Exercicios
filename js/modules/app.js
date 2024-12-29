const fs = require('fs').promises
const path = require('path')
const caminhoArquivo = path.resolve(__dirname, '..', 'pessoas.json')
const escrever = (caminho, dados) => {
    fs.writeFile(caminho, dados, {flag: 'w'})
}
const ler = caminho => fs.readFile(caminho, 'utf-8')

// const pessoas = [
//     { nome: 'Adriano'},
//     { nome: 'Joanice'},
//     { nome: 'Julia'},
//     { nome: 'Ourinho'},
// ]

// const json = JSON.stringify(pessoas, ' ', 2)
// escrever(caminhoArquivo,json)

async function lerArquivos(caminho){
    const dados = await ler(caminho)
    renderizarDados(dados)
}

function renderizarDados(dados){
    dados = JSON.parse(dados)
    dados.forEach(val => console.log(val))
}

lerArquivos(caminhoArquivo)