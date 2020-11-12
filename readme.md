# Nodejs Challenge

A aplicação sera uma api que armazenara informações a respeito dos usuários dos github

### 📋 Requisitos

- [x] A aplicação usa express com o (sequelize)
- [ ] CRUD de users (nome, email, localização, avatar, username, bio). Um usuário deve ser único
- [ ] O método de autenticação devera buscar se o usuário esta cadastrado na tabela users, se sim retornar os dados com sucesso, e armazenar o id do usuário e a data da requisição em uma tabela chamada Tokens.
- [ ] CRUD de follower (todo follower deve ser um usuário, criar a relação pertinente para follower e user).
- [ ] CRUD de following (todo following deve ser um usuário, criar a relação pertinente para following e user).
- [ ] CRUD de repositories (nome, description, public, slug). A propriedade slug deve ser concatenada com o nome de usuário e o nome do repositório.
- [ ] CRUD de repositories stars (Esse crud devera manter a relação de usuários que deram stars para um repositório, criar relação pertinente entre users, repositories).
- [ ] Gostaríamos de ver os campos necessários para os endpoints fossem validados na request, opcional.

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