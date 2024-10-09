/*
    Lógica de Programação  "Tarefas"

    [x] Pegar os dados do Input, quando o botão for clicado.
    [x] Ir até o servido, e trazer os produtos.
    [] Colocar os Produtos na Tela.
    [] Criar o gráfico de Preços. 
*/

// PEGANDO OS DADOS DO INPUT E INDO TRAZENDO OS PRUDUTOS DO SERVIDOR

const searchForm = document.querySelector(".search-form");
const productList = document.querySelector(".product-list");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inputValue = event.target[0].value;

  const data = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`
  );
  const products = (await data.json()).results.slice(0, 10);

  displayItems(products);
});

// COLOCANDO A IMAGENS DOS PRODUTOS

function displayItems(products) {
  productList.innerHTML = products.map(
    (product) => `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</p>
            <p>Loja: ${product.seller.nickname}</p>
        </div>
    `
  );
}
