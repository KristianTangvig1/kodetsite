const productContainer = document.querySelector(".produktcards");
const params = new URLSearchParams(window.location.search);
const kategori = params.get("category");
const season = params.get("season");

console.log("season", season);

let endpoint = "";
if (kategori) {
  endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;
} else {
  endpoint = `https://kea-alt-del.dk/t7/api/products?season=${season}`;
}

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);
    productContainer.innerHTML = "";
    data.forEach((produkter) => {
      productContainer.innerHTML += `
          <article class="produkt">
          <div class="produktbillede "> 
            <a href="produkt.html?id=${produkter.id}"><img src="https://kea-alt-del.dk/t7/images/webp/640/${produkter.id}.webp" /></a>
            <h2 class="produktnavn">${produkter.productdisplayname}</h2>
          </div>
          <div class="info">
            <p class="katagori">${produkter.brandname}: ${produkter.category}</p>
            <p class="pris"><span class="valuta">DKK</span>${produkter.price},-</p>
          </div>
          <div>
            <a href="produkt.html?id=${produkter.id}" class="knap">Read more</a>
          </div>
        </article>
        `;
    });
  });

document.querySelectorAll(".buttons button").forEach((knap) => {
  knap.addEventListener("click", filterButtonClick);

  function filterButtonClick(evt) {
    showFiltered(evt.currentTarget.dataset.gender);
  }

  function showFiltered(filter) {
    let dataToShow;
    if (filter === "all") {
      dataToShow = allData;
    } else {
      dataToShow = allData.filter((produkt) => produkt.gender === filter);
    }
    showProducts(dataToShow);

    let allData;
    getData(`https://kea-alt-del.dk/t7/api/products?category=${category}`);
    function getData(url) {
      fetch(url).then((response) =>
        response.json().then((data) => {
          allData = data;
          showProducts(allData);
        }),
      );
    }
  }
});
