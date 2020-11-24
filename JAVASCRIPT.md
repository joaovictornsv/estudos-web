<div  align="center">
<!-- Top Image and Title -->
<img  src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=black&color=ffe05d"  width="80%"><br/>

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
> ```
> var xhr = new XMLHttpRequest();
> // xhr.open('método', 'url do servidor')
>xhr.open('GET',https:api.github.com/users/diego3g');
>xhr.send(null);
> ```


## Esperando o retorno da requisição
> ```
> xhr.onreadystatechange = function() {
> 	//xhr.readyState == 4 (variável que significa que a resposta da requisição retornou)
> 	if (xhr.readyState === 4) {
> 		console.log(JSON.parse(xhr.responseText))
> 	}
> }
> ```

<hr>

# Promises

Promises são funções que retornarão um resultado de sucesso ou erro só depois de um tempo. Essa funções não interferem no fluxo do script.

## Definindo uma promisse
>```
> var minhaPromise = function() {
>   return new Promise(function(resolve, reject) {
> 	xhr.open('GET',https:api.github.com/users/diego3g');
> 	xhr.send(null);
> 		
> 	xhr.onreadystatechange = function() {
> 		//xhr.readyState == 4 (variável que significa que a resposta da requisição retornou)
> 		if (xhr.readyState === 4) {
> 			if (xhr.status === 200) {
> 				// Status 200 é o código de sucesso da requisição
> 				resolve(JSON.parse(xhr.responseText));
> 			} else {
> 				  reject('Erro na requisição')
> 			  }
> 		  }
> 	  }
>   })
> }
>```

## Esperando resultado da Promise

O Javascript não aguarda o retorno de uma promise para executar as prómixas linhas. Se rodarmos o código:

```
var resultado = minhaPromise();
console.log(resultado)
```

O resultado no console será: `Promise {<pending>}`. Pois a promise não está finalizada.

## Usando os dados retornados pela Promise
O `.then` será executado quando o resolve da Promise for chamado.

O `.catch` é executado quando o reject da Promise for chamado.

>```
> minhaPromise()
> 
> 	.then(function(response) {
> 		// Código
> 	})
> 	
> 	.catch(function(error) {
> 		// Código
> 	})
>```
