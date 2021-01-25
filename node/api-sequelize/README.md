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

## Server.js
Criando a pasta `src` e nela o arquivo `server.js`:

```javascript
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json()); // Permitir que nossa API saiba lidar com requisições JSON

app.use(routes);

app.listen(3333); //Porta onde o servidor irá rodar.
```

## Routes.js
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