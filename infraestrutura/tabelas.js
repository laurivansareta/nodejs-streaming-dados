class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criaAtendimentos()
    }

    criaAtendimentos(){
        const sql = ' CREATE TABLE IF NOT EXISTS public.atendimentos ( ' +
                    '    id serial NOT NULL, ' +
                    '    cliente varchar(50) NOT NULL, ' +
                    '    pet varchar(20) NOT NULL, ' +
                    '    servico varchar(20) NOT NULL, ' +
                    '    status varchar(20) NOT NULL, ' +
                    '    observacoes varchar NULL, ' +
                    '    data_agendamento timestamp NOT NULL, ' +
                    '    data_criacao timestamp NOT NULL, ' +
                    '    CONSTRAINT atendimentos_pk PRIMARY KEY (id) '+
                    '); ' 

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            }else {
                console.log('Tabela atendimentos criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas