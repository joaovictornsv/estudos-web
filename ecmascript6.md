<div  align="center">
<!-- Top Image and Title -->
<img  src="https://img.shields.io/badge/ECMAScript6-%23FA7343.svg?&style=for-the-badge&logo=javascript&logoColor=white"  width="30%"><br/>

<hr>
</div>

# Classes

## Declarando uma classe com o constructor

O método **constructor** é o primeiro a ser chamado quando um novo objeto é instanciado a partir da classe.

No constructor podemos adicionar ações que serão executadas assim que o objeto for criado ou **iniciar variáveis**.


>```javascript
>class TodoList {
>  constructor() {
>    this.todos = [];
>  }
>}
>```

## Instanciando a classe
>```javascript
>var MinhaLista = new TodoList();
>```

## Herança
Herdando as propriedades da classe List em TodoList
- Classe List
>```javascript
>class List {
>  constructor() {
>    this.data = [];
>  }
>  
>  add(item) {
>    this.data.push(item)
>  }
>}
>```

- Classe TodoList
>```javascript
> class TodoList extends List {
>  constructor() {
>    super(); //Esse comando chama o constructor da classe pai.
>    
>    this.user = 'João Victor';
>  }
>  
>  mostraUsuario() {
>    console.log(this.user);
>  }
>}
>```

## Métodos Estáticos
Métodos estáticos não enxergam o restane da classe e podem ser chamados de forma independente (sem a necessidade de uma classe instanciada).

*Exemplo:*
>```javascript
>class Matematica {
>   static soma(a, b) {
>     return a + b;
>   }
>}
>
>console.log(Matematica.soma(1,2));
>// 3
>```
