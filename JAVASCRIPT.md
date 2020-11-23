<div  align="center">
<!-- Top Image and Title -->
<img  src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=black&color=ffe05d"  width="80%"><br/>

<hr>
</div>

# ◼️ Uso do localStorage

Permite salvar informações não relacionais, apenas no formato chave-valor.

O localStorage não tem habilidade de guardar vetores ou objetos dentro dele, apenas strings.
Para contornar esse problema basta converter uma estrutura desse tipo para o formato JSON através da função: `JSON.stringify(objeto)`


## Métodos do localStorage

#### `.setItem`
Guarda um novo valor no storage.

#### `.getItem`
Busca valores guardados no storage

#### Sintaxe:
<div  align="center">
<img src="https://i.imgur.com/phbqywR.png" width=500>
</div>

**Obs:** No caso de a estrutura a ser buscada ser um objeto, basta usar a função `JSON.parse(objeto)` para coloca-lá no formato certo.

## Defininindo valores padrões para uma variável

<div  align="center">
<img src=https://i.imgur.com/bHFm4vd.png" width=80%>
</div>

O comando acima significa que, caso o localStorage não retorne um valor viável para ser manipulado, será guardado um array vazio na variável toDos 
