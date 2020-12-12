# nodejs-streaming-dados
Alura - Formação: Node.js com Express - Curso: NodeJS: Streaming de dados e Repositório

## Conexão com Banco de dados PostgreSQL 
Diferente da aula vou utilizar postgreSQL. As configurações utilizadas são:

* **host:** 'localhost'
* **database:** 'agenda-petshop'
* **user:** 'postgres'
* **password:** 'postgres'
* **port:** 5432

## Como rodar o projeto?
Para instalar o projeto use:
```cmd
npm install
```
E depois para inicializar use:
```cmd
npm start
```
Para gerar build use:
```cmd
npm build
```

### A partir da aula 3
Vai ser necessário startar outro serviço que retorna as informações do cliente, para isso precisa executar os seguintes comandos:
```cmd
cd /servicos
npm install
node clientes.js
```

### Fontes originais do curso
[Link Github do curso Rest com NodeJS: API com Express e MySQL](https://github.com/alura-cursos/nodejs-api-rest/tree/aula-5)