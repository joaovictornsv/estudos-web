<div align="center">
 <h1>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="node" width=80/> +
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg" alt="sequelize" width=80/> +
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgres" width=80/>
 </h1>
</div>

---

# Criando uma API com Sequelize
 [➜ Conceitos iniciais](#conceitos-iniciais)<br>
 [➜ Iniciando a aplicação](#iniciando-a-aplicação)<br>
 [➜ Configuração e criação da database](#configuração-e-criação-da-database)<br>
 [➜ Criando tabelas usando migrations](#criando-tabelas-usando-migrations)<br>
 [➜ Registrando dados no banco](#registrando-dados-no-banco)


## Conceitos iniciais
<sup>[Voltar ao topo](#criando-uma-api-com-sequelize)</sup><br>
- **Migrations**: Representam o "histórico" de alterações do banco de dados; a maneira como ele vai se comportar em tempo de aplicação.
- **MVC**: Sigla para o padrão *Model View Controller*.
- **Model**: Define o modo como vai ser a comunicação com o banco de dados.

---

## Iniciando a aplicação
<sup>[Voltar ao topo](#criando-uma-api-com-sequelize)</sup><br>
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
- express (Framework)
- pg (postgres)
- ph-hstore (postgres)
- sequelize (ORM)
- sequelize-cli (depend. de desenvolvimento)
- nodemon (depend. de desenvolvimento) (reinicia a aplicação a cada alteração)

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
<sup>[Voltar ao topo](#criando-uma-api-com-sequelize)</sup><br>
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
<sup>[Voltar ao topo](#criando-uma-api-com-sequelize)</sup><br>
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
➜ 🟨 20191016131653-create-users.js
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
<sup>[Voltar ao topo](#criando-uma-api-com-sequelize)</sup><br>
### Models
Um model é a representação de como nossa aplicação vai se comunicar com a nossa base dados

### Criando model de Usuário
```
📁 models
➜ 🟨 User.js
```

Os models são representados através de classes. Essas classes extendem as propriedades da classe Model proveniente do Sequelize.

```javascript
const { Model } = require('sequelize');

class User extends Model {

}

module.exports = User;
```

#### Configurando o model
- Método `init()`: vai receber a conexão com  a base de dados e os campos da tabela que estamos referenciando.
```javascript
static init(sequelize) {
  super.init({ //Chama o método init() da classe Model.
    name: DataTypes.STRING, //Importar o DataTypes do Sequelize
    email: DataTypes.STRING,
  }, {
    sequelize //conexão com o banco
  })
}
```
Obs: Não é necessário informar as colunas de id e timestamps.

### Iniciando o model para realizar a conexão
No arquivo `database/index.js`:
```javascript
const User = require('../models/User');
User.init(connection);
```
### Criando uma rota de cadastro (POST)
No arquivo `routes.js`:
```javascript
const UserController =  require('./controllers/UserController');
routes.post('/users', UserController.store);
```
A função de criação de users `UserController.store` será definida no arquivo `UserController.js`.
Para isso criaremos uma pasta `controllers` em `src`:
```
📁 controllers
➜ 🟨 UserController.js
```

Nos controllers que definiremos as funções que serão chamadas nas rotas, que podem ser dos tipos: GET, POST, PUT e DELETE..

São os controllers que lidam com as requisições e respostas do servidor.

#### Definindo a função `UserController.store`:
Para isso usaremos nosso model User.
```javascript
module.exports = {
  async  store(req, res) {
    const { name, email } =  req.body;
    const  user  =  await  User.create({name, email});
    return  res.json(user);
  }
}
```

#### Outras funções
Também é possível criar outras funções, como listar os usuários (GET), editar seus dados (PUT) ou deletá-lo (DELETE).
Ex: Listagem de usuários `UserController.index`:
```javascript
module.exports = {
  async  index(req, res) {
    const  users  =  await  User.findAll();
   return  res.json(users);
  },
  // outras funções
}
```

### Importando as conexões com o banco
Também é necessário importar as conexões com o banco, que estão no arquivo `database/index.js` dentro do arquivo `server.js`:
```javascript
const  express  =  require('express');
const  routes  =  require('./routes');

require('./database'); // Importando as conexões

const  app  =  express();

app.use(express.json());
app.use(routes);

app.listen(3333);
```
