<div  align="center">
<!-- Top Image and Title -->
<img  src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=black&color=ffe05d"  width="30%"><br/>

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
<img src="https://i.imgur.com/phbqywR.png" width=500>

**Obs:** No caso de a estrutura a ser buscada ser um objeto, basta usar a função **`JSON.parse(objeto)`** para coloca-lá no formato certo.

## Defininindo valores padrões para uma variável

<div  align="center">
<img src=https://i.imgur.com/bHFm4vd.png" width=80%>
</div>

O comando acima significa que, caso o localStorage não retorne um valor viável para ser manipulado, será guardado um array vazio na variável toDos.

<hr>

# Requisições AJAX
O AJAX é uma requisição assíncrona realizada em algum backend.

## Início de uma requisição
<img src="https://i.imgur.com/DmzemDr.png" width=700>

## Esperando o retorno da requisição
<img src="https://i.imgur.com/5QfppUe.png" width=700>

<hr>

# Promises

Promises são funções que retornarão um resultado de sucesso ou erro só depois de um tempo. Essa funções não interferem no fluxo do script.

## Definindo uma promisse
<img src="https://i.imgur.com/MZXf0Hp.png" width=80%>

## Esperando resultado da Promise
O Javascript não aguarda o retorno de uma promise para executar as prómixas linhas. Se rodarmos o código:

```
var resultado = minhaPromise();
console.log(resultado)
```

O resultado no console será: **`Promise {<pending>}`**. Pois a promise não está finalizada.

## Usando os dados retornados pela Promise
O **`.then`** será executado quando o resolve da Promise for chamado.

O **`.catch`** é executado quando o reject da Promise for chamado.

<img src="https://i.imgur.com/SjwbaeE.png" width=500>

<hr>

# Axios

Axios é uma biblioteca JS que facilita a escrita de uma requisição. Nada mais é do que um encapsulamento em volta do XMLHttpRequest.

## Usando o axios em um arquivo Javascript

No arquivo HTML principal:

**`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`**

No arquivo Javascript, a estrutura da nossa requisição ficará dessa forma:

<img src="https://i.imgur.com/unPT9xA.png" width=700>

## Retorno do axios
Na requisição anterior (sem o uso do axios) o retorno, em caso de sucesso, era apenas os dados no formato JSON.

Já utilizando o Axios, o retorno contém mais informações, como o headers e o request (*XMLHttpRequest*).
