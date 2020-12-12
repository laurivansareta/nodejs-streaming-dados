const conexao = require('../infraestrutura/database/conexao')
const utilModels = require('./util.models')
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')

class Pet {
    adiciona(pet, res) {
        

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {            
            const novoPet = {nome: pet.nome, imagem: novoCaminho}
            if (erro) {
                res.status(400).json({ erro })
            } else {
                const consulta = utilModels.createInsertQuery('pets', novoPet)

                conexao.query(consulta.sql, consulta.params, (erro, resultado) => {
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        const id = resultado.rows[0].id
                        res.status(200).json({...novoPet, id})
                    }
                })
            }            
        })
    }
}
module.exports = new Pet()