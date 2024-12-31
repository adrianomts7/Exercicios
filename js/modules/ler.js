const fs = require('fs')

module.exports.ler = ler = caminho =>  fs.promises.readFile(caminho)