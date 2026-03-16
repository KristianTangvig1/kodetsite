const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productContainer = document.querySelector(".productContainer");

async function loadProduct() {
  const data = await fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json());

  const gallery = data.images
    .slice(1, 3)
    .map((src) => `<img src="${src}" alt="${data.title}" />`)
    .join("");

  productContainer.innerHTML = `
    <div class="product-left">
      <figure class="main-image">
        <img src="${data.images[0]}" alt="${data.title}" />
      </figure>
      <div class="image-gallery">${gallery}</div>
    </div>
    <div class="product-right">
      <h2 class="productName">${data.title}</h2>
      <p class="productDescription">${data.description}</p>
      <div class="product-actions">
        <button class="add-to-cart-btn">Tilføj til kurv</button>
        <button class="swap-btn">Swap nu</button>
      </div>
      <div class="also-viewing">
        <p>Andre kigger på</p>
        <div class="also-viewing-grid" id="also-viewing-grid"></div>
      </div>
    </div>
  `;

  const related = await fetch(`https://dummyjson.com/products/category/${data.category}`).then((r) => r.json());

  const grid = document.getElementById("also-viewing-grid");
  related.products
    .filter((p) => p.id !== data.id)
    .slice(0, 3)
    .forEach((p) => {
      grid.innerHTML += `
        <a href="produkt.html?id=${p.id}">
          <img src="${p.thumbnail}" alt="${p.title}" />
        </a>
      `;
    });
}

loadProduct();

const burgerBtn = document.getElementById("burger-btn");
const navMenu = document.getElementById("nav-menu");
burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("open");
  navMenu.classList.toggle("open");
});
