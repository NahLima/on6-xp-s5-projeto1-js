console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

readline = require('readline-sync')
const db = require('./database')

//-----------------------------------------------------------
console.log('Estoque do mercado - dataBase')
const { produtos } = db
console.table(produtos) // showing the products in the stock
//-----------------------------------------------------------
//ex1
console.log("exercicio 1")

function precoCrescente(a, b) {
  if (a.preco < b.preco)
    return -1
}

produtos.sort(precoCrescente)

console.table(produtos) // [2, 5, 9]

// produtos.sort((a,b)=> a.preco - b.preco) // -->>>  versão java moderno
// console.table(produtos)

// -----------------------------------------------------------------------------------

// separando por categoria

console.log("Escolha a categoria")

const categorias = readline.question('Digite a categoria: ')

function filtrarCategoria(item){
    return item.categoria ===  categorias
}
const categoriaSelecionada = produtos.filter(filtrarCategoria)
console.table(categoriaSelecionada)

// se no database a categoria estiver com acento ele retorna index vazio
// se tirar o acento ele volta normalmente


//------------------------------------------------------------------------------------
//ex2 compras- seleção dos produtos 
console.log("Escolha seus produtos") 

let comprarMais = 'S'

const array = new Array(); // novo array para colocar os itens da compra nele

class Pedido { // classe é sempre maiuscula - fazer uma comparação
  constructor(array){
    this.products = array
    this.data = new Date()
    this.subTotal = 0 
  }
  calcularSubTotal(){
this.subTotal = this.products.reduce((acumulador,item) => acumulador + (item.preco * item.quantidade), 0)
 }
}

do {
  const codigoId = parseInt(readline.question('Codigo do produto: '))
  const quantidadeItem = parseInt(readline.question('Quantidade desejada: '))
  function procurar(produto){
    return produto.id === codigoId
  }

  const produtoEncontrado = produtos.find(procurar) // achou o produto
  if(!produtoEncontrado){
    return 'Produto não encontrado'
  }else{
    const pedidoCompra = {... produtoEncontrado, quantidade: quantidadeItem } /// usar ... é o produto encontrado com todas as infos mais a quantidade. voce cria um obeto novo mais a quantidade
  array.push(pedidoCompra) // lista do cliente 

  }
  

  comprarMais = readline.question('Deseja continuar comprando? (S/N):  ')
}while(comprarMais.toUpperCase() === 'S')// tudo que estiver em minusculo vira maiuscula

const pedido = new Pedido (array)

console.table(pedido.products)
pedido.calcularSubTotal()
console.log(`O subtotal da sua compra é R$ ${pedido.subTotal.toFixed(2)}`)

//-------------------------------------------------------------------------------------
//ex3 cupom desconto

//console.log("exercicio 3")

const descValor = parseInt(readline.question('Possui cupom de desconto de: '))

const precoDesconto = function () {
 if (descValor <= 15)
  return descValor

 else if (descValor >= 16){
  return 0
   
 }else{
  return 
 }
 
}
precoDesconto()
//console.log(precoDesconto())

//-----------------------------------------------------------------------
//ex4 calculo do desconto 
// 
 function valorDesconto(){
  return((pedido.subTotal * precoDesconto()) / 100) // se eu colocar (descValor <= 15) ele calcula errado
 }
console.log(`O valor do desconto é de R$ ${valorDesconto().toFixed(2)} `)

//-----------------------------------------------------------------------------
// ex5  total da compra

function total(){
  return(pedido.subTotal - valorDesconto())
}
console.log(`O total da sua compra é R$ ${total().toFixed(2)}`)

//-------------------------------------------------------------------------------
//ex6 data do pedido
const dataPedido = new Date()

const dia = dataPedido.getDate()
const mes = dataPedido.getMonth()
const ano = dataPedido.getFullYear()

const dataFormatada = dataPedido.toLocaleDateString('pt-br')

//console.log(`Pedido fechado em ${dia} ${mes} ${ano}`);
 console.log(`Data do pedido realizado em ${dataFormatada}`)

//-------------------------------------------------------------------------------

