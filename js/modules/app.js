const path = require('path')
const fs = require('fs')
const caminhoArquivo = path.resolve(__dirname, '..', 'teste.json')
const escrever = require('../script')
const ler = caminho =>  fs.promises.readFile(caminho, 'utf-8') 

// Inscreve as pessoas no JSON
// const pessoas = [
//     { nome: 'Adriano', idade: 19, sexo:'M'},
//     { nome: 'Maria', idade: 20, sexo:'F'},
//     { nome: 'Mateus', idade: 22, sexo:'M'},
//     { nome: 'Lourdes', idade: 18, sexo:'F'},
//     { nome: 'Edvaldo', idade: 50, sexo:'F'},
// ]

// const json = JSON.stringify(pessoas, ' ', 2)
// escrever(caminhoArquivo, json)

async function lerArquivos(caminho){
    const dados = await ler(caminho)
    renderizarDados(dados)
}

function renderizarDados(dados){
    dados = JSON.parse(dados)
    dados.forEach(val => console.log(val));
}

lerArquivos(caminhoArquivo)