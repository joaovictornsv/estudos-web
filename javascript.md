<div  align="center">
<!-- Top Image and Title -->
<img  src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=black&color=ffe05d"  width="30%"><br/>

<!--
Commit Template
📝 docs: ...
🖼 image: ...
✏️ structure: ...
-->

<hr>
</div>

# Uso do localStorage

Permite salvar informações não relacionais, apenas no formato chave-valor.

O localStorage não tem habilidade de guardar vetores ou objetos dentro dele, apenas strings.
Para contornar esse problema basta converter uma estrutura desse tipo para o formato JSON através da função: **`JSON.stringify(objeto)`**


## Métodos do localStorage

#### `.setItem`
Guarda um novo valor no storage.

#### `.getItem`
Busca valores guardados no storage

#### Sintaxe:
```javascript
localStorage.setItem(chave, valor)
localStorage.getItem(chave)
```

**Obs:** No caso de a estrutura a ser buscada ser um objeto, basta usar a função **`JSON.parse(objeto)`** para coloca-lá no formato certo.

## Defininindo valores padrões para uma variável

```javascript
var toDos = JSON.parse(localStorage.getItem('list_todos')) || [];
```


O comando acima significa que, caso o localStorage não retorne um valor viável para ser manipulado, será guardado um array vazio na variável toDos.

<hr>

# Requisições AJAX
O AJAX é uma requisição assíncrona realizada em algum backend.

## Início de uma requisição
```javascript
var xhr = new XMLHttpRequest();

//xhr.open('método', 'url do servidor')
xhr.open('GET', 'https://api.github.com/users/joaovictornsv');
xhr.send(null);
```

## Esperando o retorno da requisição
```javascript
xhr.onreadystatechange = function() {
  //xhr.readyState == 4 (resposta da requisição retornou)
  
  if (xhr.readyState === 4) {
    console.log(JSON.parse(xhr.responseText))  
  }
}
```

<hr>

# Promises

Promises são funções que retornarão um resultado de sucesso ou erro só depois de um tempo. Essa funções não interferem no fluxo do script.

## Definindo uma promisse
```javascript
var minhaPromise = function() {
  return new Promise(function(resolve, reject) {
    xhr.open('GET', 'https://api.github.com/users/joaovictornsv');
    xhr.send(null);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        
        if(xhr.status === 200) {
          //Status 200 é o código de sucesso da requisição
          resolve(JSON.parse(xhr.responseText));
        }
        else {
          reject('Erro na requisição')
        }
      }
    }
  })
}
```

## Esperando resultado da Promise
O Javascript não aguarda o retorno de uma promise para executar as prómixas linhas. Se rodarmos o código:

```javascript
var resultado = minhaPromise();
console.log(resultado)
```

O resultado no console será: **`Promise {<pending>}`**. Pois a promise não está finalizada.

## Usando os dados retornados pela Promise
O **`.then`** será executado quando o resolve da Promise for chamado.

O **`.catch`** é executado quando o reject da Promise for chamado.

```javascript
minhaPromise()
  .then(function(response) {
    //código
  })
  
  .catch(function(error) {
    //código
  })
```

<hr>

# Axios

Axios é uma biblioteca JS que facilita a escrita de uma requisição. Nada mais é do que um encapsulamento em volta do XMLHttpRequest.

## Usando o axios em um arquivo Javascript

No arquivo HTML principal:

**`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`**

No arquivo Javascript, a estrutura da nossa requisição ficará dessa forma:

```javascript
axios.get('https://api.github.com/users/joaovictornsv')
  .then(response => {
    //código
  })
  
  .catch(error => {
    //código
  })
```

## Retorno do axios
Na requisição anterior (sem o uso do axios) o retorno, em caso de sucesso, era apenas os dados no formato JSON.

Já utilizando o Axios, o retorno contém mais informações, como o headers e o request (*XMLHttpRequest*).

<hr>

# Avaliação de Curto-Circuito

## Usando operador `&&`
Retorna o primeiro valor equivalente a **false** ou o último valor caso nenhum seja false.

```javascript
console.log(false && 'Texto')         //false
console.log(true && null && 'Texto')  //null

console.log(true && 'Oi')          //'Oi'
console.log(true && true && 'Oi')  //'Oi'
```

## Usando operador `||`
Retorna o primeiro valor equivalente a **true**.

```javascript
let meuCarro = null
console.log(meuCarro || 'Sem carro')               //'Sem carro'
console.log(meuCarro || 'Sem carro' || undefined)  //'Sem carro'


meuCarro = 'Celta'
console.log(meuCarro || 'Sem carro')           //'Celta'
console.log(false || meuCarro || 'Sem carro')  //'Celta'
```

<hr>

# Atribuição via desestruturação

## Arrays

```javascript
const numeros = [1, 2, 3];
const [a, b, c] =  numeros;

console.log(a, b, c) //1, 2, 3
```

## Objetos

```javascript
const pessoa = {
   nome: 'João',
   sobrenome: 'Victor',
   idade: 18,
   localizacao: {
     nacao: 'Brasil',
     cidade: 'Campina Grande'
   },
}

// Cria as variáveis 'nome', 'sobrenome' e 'idade' com o valor das chaves do objeto
const { nome, sobrenome, idade } = pessoa;
console.log(nome, sobrenome, idade) //João Victor 18
```

## Valores padrões
Caso a variável não exista no objeto/array a ser desestruturado, é possível definir valores padrões para as variáveis que estão sendo declaradas.

```javascript
const pessoa = {
   // nome: 'João',
   sobrenome: 'Victor',
   idade: 18,
}

//Sem definir valor padrão = retorna 'undefined'
const { nome, sobrenome, idade } = pessoa;
console.log(nome, sobrenome, idade); //undefined Victor 18

//Definindo valor padrão = retorna o valor definido
const { nome = 'Sem nome', sobrenome, idade } = pessoa;
console.log(nome, sobrenome, idade); //Sem nome Victor 18
```

## Alterando nome da variável
Assim como na desestruturação com arrays, é possível escolher o nome das variáveis da desestruturação com objetos também:

```javascript
// Atribuindo o valor de 'nome' para a variável 'teste'
const { nome: teste } = pessoa;
console.log(teste) = 'João'
```

## Recebendo um objeto da desestruturação
Utilizando o mesmo objeto de exemplo:
```javascript
const pessoa = {
   nome: 'João',
   sobrenome: 'Victor',
   idade: 18,
   localizacao: {
     nacao: 'Brasil',
     cidade: 'Campina Grande'
   },
}
```
#### Recendo o objeto completo:
```javascript
const { endereço } = pessoa;
console.log(endereço); // {nacao: 'Brasil', cidade: 'Campina Grande'}
```

#### Desestruturando o objeto recebido:
```javascript
const { endereço: { nacao, cidade } } = pessoa;
console.log(nacao, cidade); // Brasil Campina Grande
```

#### Estrutura completa de tudo que foi aprendido
```javascript
const { endereço: {
  nacao: minhaNacao = 'Sem Nacionalidade',
  cidade: minhaCidade = 'Sem cidade' 
 }
} = pessoa;

console.log(minhaNacao, minhaCidade); //Brasil Campina Grande
```

## Operador rest (...rest)
Usado para atribuir o restante do objeto/array para uma variável:

#### Arrays:
```javascript
const numeros = [1, 2, 3, 4, 5];
const [a, b, ...c] =  numeros;

console.log(a) //1
console.log(b) //2
console.log(c) //[3, 4, 5]
```

#### Objetos:
```javascript
const pessoa = {
   nome: 'João',
   sobrenome: 'Victor',
   idade: 18,
   localizacao: {
     nacao: 'Brasil',
     cidade: 'Campina Grande'
   },
}

const {nome, sobrenome, ...resto} = pessoa]
console.log(nome, sobrenome) // João Victor
console.log(resto) //{idade: 18, localizacao: {nacao: 'Brasil', cidade: 'Campina Grande'}
```
