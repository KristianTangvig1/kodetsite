const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const produkt = params.get("products.category");

console.log(id);

// document.querySelector(".back_btn").addEventListener("click", goBack);
// function goBack() {
//  history.back();
// }

const productContainer = document.querySelector(".productContainer");

fetch(`https://dummyjson.com/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("antal billeder: ", data.images);
    productContainer.innerHTML = `
    <figure>
        <img src="${data.images[0]}" alt="Produktbillede" class="productImage" />
        ${data.soldout ? "<span class='saleLabel'>Udsolgt!</span>" : ""}
      </figure>
      <section class="productDetails">
        <h2 class="productName">Produktnavn</h2>
        <div>
          <p class="articleType"><span class="bold">Kategori:</span> ${data.category}</p>
          <p class="productCategory"><span class="bold">Kategori:</span> ${data.category}</p>
          <p class="productPrice"><span class="bold">Pris:</span> ${data.price} DKK</p>
        </div>
        <button class="buyButton">Køb nu</button>
      </section>
      `;
  });
