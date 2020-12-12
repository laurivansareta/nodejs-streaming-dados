  
const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = "INSERT INTO atendimentos (cliente, pet, servico, status, observacoes, data_agendamento, data_criacao) " +
            " VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id; "
            
        return query(sql, atendimento)
    }

    lista() {
        const sql = 'SELECT * FROM atendimentos'

        return query(sql)
    }
}

module.exports = new Atendimento()