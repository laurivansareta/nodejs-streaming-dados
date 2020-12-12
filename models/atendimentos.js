const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment')
const utilModels = require('./util.models')
const axios = require('axios')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
    adiciona(atendimento, res) {

        let {cliente, pet, servico, status, observacoes, dataAgenamento} = atendimento
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        dataAgenamento = moment(atendimento.data_agendamento, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')

        const dataEhValida = moment(dataAgenamento).isSameOrAfter(dataCriacao)
        const clienteEhValido = cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            return new Promise((resolve, reject) => reject(erros))            
        }else{
            const parametros = [cliente, pet, servico, status, observacoes, dataAgenamento, dataCriacao]

            return repositorio.adiciona(parametros)
                .then((resultados) => {
                    const id = resultados.rows[0].id                    
                    return {...atendimento, id}
                })
        }        
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos '

        conexao.query(sql, (erro, resultados) => {
            const atendimentos = resultados.rows
            if (erro) {
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimentos)
            }
        })
    }

    buscaPorId(id, res){
        const sql = 'SELECT * FROM atendimentos WHERE id = $1 ;'

        conexao.query(sql, [id], async (erro, resultados) => {
            const atendimento = resultados.rows[0]
            const cpf = atendimento.cliente

            if (erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get('http://localhost:8082/' + cpf)
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data_agendamento){
            valores.data_agendamento = moment(valores.data_agendamento, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')
        }

        const consulta = utilModels.createUpdateQuery('atendimentos', 'id', id, valores)        
        
        conexao.query(consulta.sql, consulta.params, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id=$1 RETURNING id; '
        conexao.query(sql, [id], (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento