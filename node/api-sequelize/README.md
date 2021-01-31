# Criando uma API com Sequelize
## Conceitos iniciais
- **Migrations**: Representam o "histórico" de alterações do banco de dados; a maneira como ele vai se comportar em tempo de aplicação.
- **MVC**: Sigla para o padrão *Model View Controller*.
- **Model**: Define o modo como vai ser a comunicação com o banco de dados.

---

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

### Criando os arquivos iniciais
No package.json:
```javascript
"scripts": {
    "dev": "nodemon src/server.js"
  },
```

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
---

## Configuração e criação da database
Na pasta `database`:<br/>
**`index.js`**: onde será feita a conexão com o banco de dados.

Na pasta `src`:<br/>
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
---
## Criando tabelas usando migrations
De volta ao `.sequelizerc`, precisamos informar ao Sequelize onde serão mantidas as migrations da aplicação:
```javascript
const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'src', 'config', 'database.js'),
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations')
};

```
Não esqueça de criar a pasta `migrations` no local informado nas configurações.

### Criando a primeira migration
Nossa primeira tabela será a de usuários, para isso criaremos a migration responsável por cria-lá, bem como seus campos.

No terminal:
```bash
yarn sequelize migration:create --name=create-users
```

Na pasta `migrations` você encontrará algo semelhante a isso:
```
📁 migrations
- 20191016131653-create-users.js
```
Esses números são o timestamp de quando a migration foi criada. Com isso vai sendo montado o histórico do seu banco de dados. As migrations são executadas de forma linear.

#### Estrutura da migration
Ao entrar no arquivo recém-criado você encontrará um objeto sendo exportado com dois métodos: **up** e **down**.
```javascript
'use-strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Esse método representa o que essa migration irá fazer no banco de dados.
    //Ex: criar a tabela users
  },

  down:(queryInterface, Sequelize) => {
    //Se houver algum erro ao realizar o método "up", esse método irá desfazer as alterações feitas no banco de dados.
    //Ex: excluir a tabela users
  }
}
```

### Configurando uma tabela
Ainda no arquivo da migration, iremos fazer as configurações da nossa tabela, como os campos que ela terá e as configurações desses campos.

```javascript
up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      //Apesar desses campos serem preenchidos de forma automática,
      //eles precisam ser informados na criação da tabela.
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
```
### Criando a tabela no banco de dados
Para a tabela ser criada de fato na base de dados, usaremos o seguinte comando no terminal:
```bash
yarn sequelize db:migrate
```
Isso fará com que todas as migrations do nosso projeto sejam executadas.

#### SequelizeMeta
Além das nossas tabelas, haverá também a tabela SequelizeMeta, que irá armazenar o histórico de migrations do nosso banco.

### Corringindo erros e desfazendo migrations
Caso perceba que cometeu um erro, como o nome errado de um campo, você pode desfazer as migrations:
```bash
yarn sequelize db:migrate:undo
```
Depois só corrigir o erro e executar o comando de migrations novamente.

No entanto, caso sua aplicação já esteja em produção você não poderá voltar atrás. A melhor forma de contornar o erro é criando um nova migration responsável por isso.

---
## Registrando dados no banco
---