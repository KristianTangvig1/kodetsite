const heroContainer = document.getElementById("hero-images");
const sunglassesContainer = document.getElementById("sunglasses");
const watchesContainer = document.getElementById("watches");
const dreamContainer = document.getElementById("dream");
const ctaImages = document.getElementById("cta-images");
const inspoImages = document.getElementById("inspo-images");

// HERO (mix af kategorier)
Promise.all([
  fetch("https://dummyjson.com/products/category/sunglasses").then((r) => r.json()),
  fetch("https://dummyjson.com/products/category/womens-jewellery").then((r) => r.json()),
  fetch("https://dummyjson.com/products/category/womens-bags").then((r) => r.json()),
]).then(([sunglasses, jewellery, bags]) => {
  const mixed = [sunglasses.products[0], jewellery.products[0], sunglasses.products[1], jewellery.products[1], bags.products[0]];

  heroContainer.innerHTML = mixed.map((p) => `<img src="${p.thumbnail}" alt="${p.title}">`).join("");
});

// SUNGLASSES
fetch("https://dummyjson.com/products/category/sunglasses")
  .then((res) => res.json())
  .then((data) => {
    renderProducts(data.products.slice(0, 4), sunglassesContainer);
  });

// WATCHES
Promise.all([fetch("https://dummyjson.com/products/category/mens-watches").then((r) => r.json()), fetch("https://dummyjson.com/products/category/womens-watches").then((r) => r.json())]).then(([men, women]) => {
  const combined = [...men.products, ...women.products].slice(0, 4);
  renderProducts(combined, watchesContainer);
});

// DREAM (mix af ALLE relevante kategorier)
Promise.all([
  fetch("https://dummyjson.com/products/category/sunglasses").then((r) => r.json()),
  fetch("https://dummyjson.com/products/category/womens-jewellery").then((r) => r.json()),
  fetch("https://dummyjson.com/products/category/mens-bags").then((r) => r.json()),
  fetch("https://dummyjson.com/products/category/womens-bags").then((r) => r.json()),
]).then(([sunglasses, jewellery, mensBags, womensBags]) => {
  const mixed = [sunglasses.products[1], jewellery.products[1], mensBags.products[0], womensBags.products[0]];
  renderProducts(mixed, dreamContainer);
});

// CTA (smykker)
fetch("https://dummyjson.com/products/category/womens-jewellery")
  .then((res) => res.json())
  .then((data) => {
    ctaImages.innerHTML = data.products
      .slice(0, 6)
      .map(
        (p) => `
        <a href="produkt.html?id=${p.id}">
          <img src="${p.thumbnail}" alt="${p.title}">
        </a>
      `,
      )
      .join("");
  });

// INSPO (tasker)
Promise.all([fetch("https://dummyjson.com/products/category/mens-bags").then((r) => r.json()), fetch("https://dummyjson.com/products/category/womens-bags").then((r) => r.json())]).then(([men, women]) => {
  const mixed = [men.products[0], women.products[0]];

  inspoImages.innerHTML = mixed
    .map(
      (p) => `
      <a href="produkt.html?id=${p.id}">
        <img src="${p.thumbnail}" alt="${p.title}">
      </a>
    `,
    )
    .join("");
});

// RENDER
function renderProducts(list, container) {
  container.innerHTML = "";

  list.forEach((produkt) => {
    container.innerHTML += `
      <article class="produkt">
        <div class="produktbillede">
          <a href="produkt.html?id=${produkt.id}">
            <img src="${produkt.thumbnail}" alt="${produkt.title}" />
          </a>
        </div>
        <div class="info">
          <p class="katagori">${produkt.brand ?? ""}: ${produkt.category}</p>
          <p class="pris"><span class="valuta">$</span>${produkt.price},-</p>
        </div>
      </article>
    `;
  });
}
