const Pool = require('pg').Pool

const conexao = new Pool({    
    host: 'localhost',
    database: 'agenda-petshop',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
  })

module.exports = conexao