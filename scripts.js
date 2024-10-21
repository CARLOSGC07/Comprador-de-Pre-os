/*
    Lógica de Programação  "Tarefas"

    [x] Pegar os dados do Input, quando o botão for clicado.
    [x] Ir até o servido, e trazer os produtos.
    [x] Colocar os Produtos na Tela.
    [x] Criar o gráfico de Preços.
*/

// PEGANDO OS DADOS DO INPUT E INDO TRAZENDO OS PRUDUTOS DO SERVIDOR

const searchForm = document.querySelector(".search-form");
const productList = document.querySelector(".product-list");
const priceChart = document.querySelector(".price-chart");

let myChart = null;

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inputValue = event.target[0].value;

  const data = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`
  );
  const products = (await data.json()).results.slice(0, 10);

  displayItems(products);
  updatePriceChart(products);
});

// Função para exibir os produtos
function displayItems(products) {
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.thumbnail.replace(
              /\w\.jpg/gi,
              "W.jpg"
            )}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="product-price">${product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</p>
            <p class="product-store">Loja: ${product.seller.nickname}</p>
        </div>
    `
    )
    .join("");
}

// Função para atualizar o gráfico de preços
function updatePriceChart(products) {
  const ctx = priceChart.getContext("2d");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: products.map((product) => product.title.substring(0, 20) + "..."),
      datasets: [
        {
          label: "Preço (R$)",
          data: products.map((product) => product.price),
          backgroundColor: "rgba(46, 204, 113, 0.6)",
          borderColor: "rgba(46, 204, 113, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Comparador de Preços",
          font: {
            size: 18,
          },
        },
      },
    },
  });
}
