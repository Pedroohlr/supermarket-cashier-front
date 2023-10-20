//aqui ira criar um array vazio para armazenar os itens
var itens = [];
var id = 0;
var soma = 0;

//crio a função de deletar o item criado com baso do ID dele
function deleteItem(id) {
  document.getElementById(id).remove();
  itens = itens.filter((item) => item.id != id);

  //aki eu deleto o valor do item que foi adicionado
  calcularValorTotal(itens);
}

//calculo o valor do item
function calcularValorTotal(itens) {
  let newSoma = 0;
  itens.forEach((item) => {
    newSoma += item.valor;
    console.log(newSoma);
  });

  let elementSoma = document.querySelector(".soma-produto h1");
  elementSoma.innerHTML = `Total: R$ ${newSoma}`;
}

//aqui ira pegar o botão cadastro e colocar a função click
document.querySelector("input[type=submit]").addEventListener("click", () => {
  //aqui eu crio 2 variaveis para o nome do produto e o valor do produto
  var nomeProduto = document.querySelector("input[name=nome_produto]");
  var precoProduto = document.querySelector("input[name=preco");

  //aqui eu verifico se os campos de nome e valor estão vazios
  if (nomeProduto.value.trim() == "" || precoProduto.value == "") {
    document.querySelector(".erro").innerHTML = 
      `
        <p>Digite o valor</p>
      `;
  } else {
    document.querySelector(".erro").innerHTML = "";
    //aqui uso o push para adicionar um ou mais elementos ao final do array
    itens.push({
      id: id++,
      nome: nomeProduto.value,
      valor: parseFloat(precoProduto.value),
    });

    //aqui eu pego a lista de produtos do html
    let listaProdutos = document.querySelector(".lista-produtos");

    //aqui eu deixo a lista de produtos vazia para dar inicio ao codigo
    listaProdutos.innerHTML = "";

    //aqui eu uso o map para criar um novo array a partir de um array existente, aplicando uma função a cada elemento do array original.
    itens.map(function (val) {
      //aqui eu crio onde ira aparecer os produtos e os valores
      listaProdutos.innerHTML +=
        `
          <div id="` +val.id +`" class="lista-produto-single">
            <h3>`+val.nome +`</h3>
            <h3 class="preco-produto"><span>R$`+val.valor+`</span> <button class="btDelete" onclick="deleteItem(`+val.id +`)"> X </button > </h3>
          </div>
        `;
    });

    //deixo as variaveis vazias
    nomeProduto.value = "";
    precoProduto.value = "";
    calcularValorTotal(itens);
  }
});

//botão de limpar a lista
document.querySelector("button[name=limpar]").addEventListener("click", () => {
  //ao apertar o botão tudo voltara ao 0
  itens = [];
  document.querySelector(".lista-produtos").innerHTML = "";
  document.querySelector(".soma-produto h1").innerHTML = "Total: R$0.00";
});
