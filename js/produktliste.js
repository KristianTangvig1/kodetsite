const productContainer = document.querySelector(".produktcards");
const params = new URLSearchParams(window.location.search);
const kategori = params.get("categories");
const season = params.get("");

console.log("season", season);

fetch(`https://dummyjson.com/products/category/sunglasses`)
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);
    productContainer.innerHTML = "";
    data.products.forEach((produkter) => {
      productContainer.innerHTML += `
          <article class="produkt">
          <div class="produktbillede "> 
            <a href="produkt.html?id=${produkter.id}"><img src="${produkter.thumbnail}" /></a>
            <h2 class="produktnavn">${produkter.title}</h2>
          </div>
          <div class="info">
            <p class="katagori">${produkter.brand}: ${produkter.category}</p>
            <p class="pris"><span class="valuta">DKK</span>${produkter.price},-</p>
          </div>
          <div>
            <a href="produkt.html?id=${produkter.id}" class="knap">Read more</a>
          </div>
        </article>
        `;
    });
  });
