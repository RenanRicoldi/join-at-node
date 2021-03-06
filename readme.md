# Nodejs Challenge

A aplicação sera uma api que armazenara informações a respeito dos usuários dos github

### 📋 Requisitos

- [x] A aplicação usa express com o (sequelize)
- [x] CRUD de users (nome, email, localização, avatar, username, bio). Um usuário deve ser único
- [x] O método de autenticação devera buscar se o usuário esta cadastrado na tabela users, se sim retornar os dados com sucesso, e armazenar o id do usuário e a data da requisição em uma tabela chamada Tokens.
- [x] CRUD de follower (todo follower deve ser um usuário, criar a relação pertinente para follower e user).
- [x] CRUD de following (todo following deve ser um usuário, criar a relação pertinente para following e user).
- [x] CRUD de repositories (nome, description, public, slug). A propriedade slug deve ser concatenada com o nome de usuário e o nome do repositório.
- [x] CRUD de repositories stars (Esse crud devera manter a relação de usuários que deram stars para um repositório, criar relação pertinente entre users, repositories).
- [x] Gostaríamos de ver os campos necessários para os endpoints fossem validados na request, opcional.
- [x] A Api irá fornecer dados para o protótipo disponibilizado no [link](https://xd.adobe.com/view/1798f30c-7746-444c-bffa-91b29835eef5-42cb/ 'Protótipo').
- [x] Os métodos get, post, put, devem ser coerentes com os retornos necessários definidos no protótipo.
### ✅ Rodando

Foi utilizado Node com JavaScript, então para rodar basta executar
```bash
yarn
// npm install
```

```bash
yarn dev:server
// npx dev:server
```

### 💽 Banco de dados

Sequelize está rodando uma imagem docker do postgres na porta 5434.
 * Para criar a imagem

```bash
docker run --name labluby_postgres -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres
```

 * Para criar a database

```bash
yarn sequelize db:create
// npx sequelize db:create
```

```bash
yarn sequelize db:migrate
// npx sequelize db:migrate
```