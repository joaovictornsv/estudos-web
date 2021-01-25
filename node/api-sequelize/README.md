# Criando uma API com Sequelize
## Conceitos iniciais
- **Migrations**: Representam o "histórico" de alterações do banco de dados; a maneira como ele vai se comportar em tempo de aplicação.
- **MVC**: Sigla para o padrão *Model View Controller*.
- **Model**: Define o modo como vai ser a comunicação com o banco de dados.


## Iniciando a aplicação
**Criando a pasta onde ficará o código**
```bash
  mkdir slqnode
  cd slqnode
```
```javascript
yarn init -y
```
*Obs*: A flag `y` indica que queremos pular a sessão interativa e gera um `‎package.json` baseado no seu padrões

### Instalando as bibliotecas
- Express
- pg
- ph-hstore
- sequelize
- sequelize-cli (desenvolvimento)
- nodemon (desenvolvimento) (reinicia a aplicação a cada alteração)

### Criando os scripts
No package.json:
```javascript
"scripts": {
    "dev": "nodemon src/server.js"
  },
```

### Server.js
Criando a pasta `src` e nela o arquivos `server.js` e `routes.js`:

**server.js**
```javascript
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json()); // Permitir que nossa API saiba lidar com requisições JSON

app.use(routes);

app.listen(3333); //Porta onde o servidor irá rodar.
```
**routes.js**
### Routes.js
```javascript
const express = require('express');

const routes = express.Router();


routes.get('/', (req, res) => {
  return res.json({ hello: 'world' });
});

module.exports = routes;
```

Rodando `yarn dev` no terminal e acessando a porta, já é possível ver nossa aplicação funcionando:
```javascript
//http://localhost:3333

{
  "hello": "world"
}
```

## Configuração e criação da database
Na pasta `database`:
**`index.js`**: onde será feita a conexão com o banco de dados.

Na pasta `src`:
**`config/database.js`**: armazena as credenciais de acesso ao banco de dados.

**`database.js`**: irá exportar um objeto de configurações
```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'sqlnode',
  define: {
    // Indica que toda tabela do meu banco terá os campos: created_at e updated_at
    timestamps: true,

    // Fará uso do snake_case para nomear as tabelas
    // Obs: por padrão o Sequelize utiliza o Pascal Case
    underscored: true, 
  },
}
```

Por padrão, o Sequelize irá buscar o arquivo `config/config.json` para obter as configurações do banco de dados. Por isso vamos configurar o Sequelize para que ele busque as configurações no arquivo `config/database.js`:

Na pasta raiz do projeto criaremos o arquivo `.sequelizerc`:
```javascript
const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'src', 'config', 'database.js');
};
```
  
### Criando a conexão com o banco de dados
No arquivo `database/index.js`:
```javascript
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//Conexão com o banco de dados
const connection = new Sequelize(dbConfig);

module.exports = connection;
```

### Criando o banco
No terminal:
```bash
yarn sequelize db:create
```

Existem alguns programas que permite visualizar o banco e suas tabelas como:
- [Beekeeper Studio](https://www.beekeeperstudio.io/)
- [Postico](https://eggerapps.at/postico/)
- [DBeaver](https://dbeaver.io/)

## Criando tabelas e usando migrations