const productContainer = document.querySelector(".produktcards");
const categoryDropdown = document.getElementById("category-dropdown");
const filterBtn = document.getElementById("filter-toggle");
const filterDropdown = document.getElementById("filter-dropdown");
const h1 = document.querySelector("main h1");
const params = new URLSearchParams(window.location.search);
const kategori = params.get("categories") || "sunglasses";

// Slugs from dummyjson that match our store's categories
const storeCategories = [
  "sunglasses",
  "mens-watches",
  "womens-watches",
  "womens-jewellery",
  "womens-bags",
  "mens-bags",
];

// Stored products and sort state
let products = [];
let sortOrder = null; // null | "asc" | "desc"

// Fetch all categories: populate dropdown + set h1
fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((categories) => {
    const filtered = categories.filter((cat) =>
      storeCategories.includes(cat.slug)
    );
    filtered.forEach((cat) => {
      categoryDropdown.innerHTML += `<li><a href="produktliste.html?categories=${cat.slug}">${cat.name}</a></li>`;
    });

    const current = categories.find((cat) => cat.slug === kategori);
    if (current) h1.textContent = current.name;
  });

// Fetch products for the active category
fetch(`https://dummyjson.com/products/category/${kategori}`)
  .then((response) => response.json())
  .then((data) => {
    products = data.products;
    renderProducts(products);
  });

function renderProducts(list) {
  productContainer.innerHTML = "";
  list.forEach((produkter) => {
    productContainer.innerHTML += `
      <article class="produkt">
        <div class="produktbillede">
          <a href="produkt.html?id=${produkter.id}"><img src="${produkter.thumbnail}" alt="${produkter.title}" /></a>
        </div>
        <h2 class="produktnavn">${produkter.title}</h2>
        <div class="info">
          <p class="katagori">${produkter.brand ?? ""}: ${produkter.category}</p>
          <p class="pris"><span class="valuta">$</span>${produkter.price},-</p>
        </div>
        <a href="produkt.html?id=${produkter.id}" class="knap">Read more</a>
      </article>
    `;
  });
}

// Toggle dropdown open/close
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterDropdown.classList.toggle("open");
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  filterDropdown.classList.remove("open");
});

// Handle sort option selection
filterDropdown.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-sort]");
  if (!btn) return;

  const sort = btn.dataset.sort;
  filterDropdown.classList.remove("open");

  if (sort === "asc") {
    filterBtn.textContent = "Billigst først ↑";
    renderProducts([...products].sort((a, b) => a.price - b.price));
  } else if (sort === "desc") {
    filterBtn.textContent = "Dyrest først ↓";
    renderProducts([...products].sort((a, b) => b.price - a.price));
  } else {
    filterBtn.textContent = "Filter ↓";
    renderProducts(products);
  }
});
