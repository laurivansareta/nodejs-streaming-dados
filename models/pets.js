const conexao = require('../infraestrutura/conexao')
const utilModels = require('./util.models')

class Pet {
    adiciona(pet, res) {
        const consulta = utilModels.createInsertQuery('pets', pet)
        
        conexao.query(consulta.sql, consulta.params, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const id = resultado.rows[0].id
                res.status(200).json({...pet, id})
            }
        })
    }
}
module.exports = new Pet()