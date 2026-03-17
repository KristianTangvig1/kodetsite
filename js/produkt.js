const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productContainer = document.querySelector(".productContainer");

async function loadProduct() {
  const data = await fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json());

  const gallery = data.images
    .slice(1, 3)
    .map((src) => `<img src="${src}" alt="${data.title}" />`)
    .join("");

  const price2Days = (Math.round(data.price * 6)).toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const price7Days = (Math.round(data.price * 14)).toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  productContainer.innerHTML = `
    <div class="product-left">
      <figure class="main-image">
        <img src="${data.images[0]}" alt="${data.title}" />
      </figure>
      <div class="image-gallery">${gallery}</div>
    </div>
    <div class="product-right">
      <h2 class="productName">${data.title}</h2>
      <p class="productPrice" id="product-price">${price2Days} DKK</p>

      <div class="rental-period">
        <p class="rental-label">RENTAL PERIOD:</p>
        <div class="rental-buttons">
          <button class="rental-btn active" data-price="${price2Days}">2 DAYS</button>
          <button class="rental-btn" data-price="${price7Days}">7 DAYS</button>
        </div>
      </div>

      <p class="productDescription">${data.description}</p>

      <div class="product-accordions">
        <div class="accordion">
          <button class="accordion-btn">
            <span>HOW TO RENT</span>
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-content">
            <p>1. Select your rental period (2 or 7 days).<br>
               2. Add the item to your cart and proceed to checkout.<br>
               3. We ship the item to your address.<br>
               4. Return the item in the provided packaging before your rental period ends.</p>
          </div>
        </div>
        <div class="accordion">
          <button class="accordion-btn">
            <span>RENT FOR MORE THAN 7 DAYS</span>
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-content">
            <p>Need the item for longer than 7 days? No problem — just reach out to us at <a href="mailto:contact@sasos.dk">contact@sasos.dk</a> and we will arrange a custom rental period for you.</p>
          </div>
        </div>
        <div class="accordion">
          <button class="accordion-btn">
            <span>TERMS AND CONDITIONS</span>
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-content">
            <p>All rented items must be returned in the same condition they were received. A cleaning fee will be charged upon return of the item. Any damage beyond normal wear may incur additional charges.</p>
          </div>
        </div>
      </div>

      <button class="swap-btn">SWAP NOW</button>

      <div class="also-viewing">
        <p>Andre kigger på</p>
        <div class="also-viewing-grid" id="also-viewing-grid"></div>
      </div>
    </div>
  `;

  // Rental period toggle
  document.querySelectorAll('.rental-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rental-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('product-price').textContent = btn.dataset.price + ' DKK';
    });
  });

  // Accordion toggle
  document.querySelectorAll('.accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const accordion = btn.parentElement;
      const isOpen = accordion.classList.contains('open');
      document.querySelectorAll('.accordion').forEach((a) => {
        a.classList.remove('open');
        a.querySelector('.accordion-icon').textContent = '+';
      });
      if (!isOpen) {
        accordion.classList.add('open');
        btn.querySelector('.accordion-icon').textContent = '−';
      }
    });
  });

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
