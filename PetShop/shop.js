let cart = [];
let cartTotal = 0;
let productsList = [];
let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage();
  const productContainer = document.getElementById("productCont");

  const filterLess50 = document.getElementById("lessThan50");
  const filterMore50 = document.getElementById("moreThan50");
  const menClothing = document.getElementById("menClothing");
  const womenClothing = document.getElementById("womenClothing");
  const jewelery = document.getElementById("jewelery");
  const electronics = document.getElementById("electronics");
  const basket = document.getElementById("basket");
  const basketIcon = document.getElementById("basketIcon");
  const sortSelect = document.getElementById("sortSelect");


  let isFiltering = false;
  let page = 0;
  const PAGE_SIZE = 8;
  let isLoading = false;

  async function loadNextPage() {
    if (isLoading) return;
    isLoading = true;

    const url =
      `https://fakestoreapi.com/products?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`;
    const data = await fetch(url).then(r => r.json());


    productContainer.insertAdjacentHTML(
      'beforeend',
      data.map(buildItem).join('')
    );
    attachCartListeners();

    page++;
    isLoading = false;
  }

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    if (!isFiltering && doc.scrollTop + window.innerHeight >= doc.scrollHeight - 150) {
      loadNextPage();
    }
  });

  loadNextPage();

  menClothing.addEventListener('click', (event) => {
    isFiltering = true;
    event.preventDefault();
    productContainer.innerHTML = " ";
    emptyStringMenCategory = "";

    productsList.forEach(product => {
      if (product.category == "men's clothing") {
        emptyStringMenCategory += buildItem(product);
      }
      productContainer.innerHTML = emptyStringMenCategory;
    })
  });

  womenClothing.addEventListener('click', (event) => {
    isFiltering = true;
    event.preventDefault();
    productContainer.innerHTML = " ";
    emptyStringWomenCategory = "";

    productsList.forEach(product => {
      if (product.category == "women's clothing") {
        emptyStringWomenCategory += buildItem(product);
      }
      productContainer.innerHTML = emptyStringWomenCategory;
    })
  });

  jewelery.addEventListener('click', (event) => {
    isFiltering = true;
    event.preventDefault();
    productContainer.innerHTML = " ";
    emptyStringJeweleryCategory = "";

    productsList.forEach(product => {
      if (product.category == "jewelery") {
        emptyStringJeweleryCategory += buildItem(product);
      }
      productContainer.innerHTML = emptyStringJeweleryCategory;
    })
  });

  electronics.addEventListener('click', (event) => {
    isFiltering = true;
    event.preventDefault();
    productContainer.innerHTML = " ";
    emptyStringElectronicsCategory = "";

    productsList.forEach(product => {
      if (product.category == "electronics") {
        emptyStringElectronicsCategory += buildItem(product);
      }
      productContainer.innerHTML = emptyStringElectronicsCategory;
    })
  });

  basketIcon.addEventListener("click", (event) => {
    event.preventDefault();
    renderBasket();
  });

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {

      productContainer.innerHTML = " ";
      data.forEach(product => {
        productsList.push(
          {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
              rate: product.rating.rate,
              count: product.rating.count
            }
          }
        );

        allProducts.push(
          {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
              rate: product.rating.rate,
              count: product.rating.count
            }
          }
        );

        productContainer.innerHTML += `
        <div class="col-md-3 my-3"  >
                <div class="swiper-wrapper">
          <div class="swiper-slide">
        <div class="card position-relative">
                <a href="single-product.html?id=${product.id}"><img src="${product.image}" class="img-fluid rounded-4" alt="image"></a>
                <div class="card-body p-0">
                  <a href="single-product.html">
                    <h3 class="card-title pt-4 m-0"> ${product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title}</h3>
                  </a>

                  <div class="card-text">
                  ${CreateRateElement(product.rating.rate)}
                    <span class="rating secondary-font">
                      
                      ${product.rating.rate}</span>

                    <h3 class="secondary-font text-primary">$ ${product.price}</h3>

                    <div class="d-flex flex-wrap mt-3">
                       <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                        <h5 class="text-uppercase m-0">Add to Cart</h5>
                      </a>
                      
                      <a href="#" class="btn-wishlist px-4 pt-3 ">
                        <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                      </a>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div> 
                  </div>
                  </div>`

      });

      document.querySelectorAll(".btn-cart").forEach(button => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          const id = this.getAttribute("data-id"); // Get the product ID from button
          const product = productsList.find(p => p.id == id); // Find product by ID
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price
          });
          cartTotal += product.price;

          console.log(cartTotal);
          saveCartToLocalStorage();
        });
      });
    });

  //Sorting Elements extra thing tooo :)

  sortSelect.addEventListener('change', (event) => {

    isFiltering = true;
    const value = sortSelect.value;
    if (value === "lowToHigh") {
      productContainer.innerHTML = " ";

      emptyStringSortPriceAsc = "";
      SortByPriceAsc(allProducts).forEach(product => {
        emptyStringSortPriceAsc += buildItem(product);
      })
      productContainer.innerHTML = emptyStringSortPriceAsc;

    }
    else if (value === "highToLow") {
      productContainer.innerHTML = " ";

      emptyStringSortPriceDesc = "";
      SortByPriceAsc(allProducts).reverse().forEach(product => {
        emptyStringSortPriceDesc += buildItem(product);
      })
      productContainer.innerHTML = emptyStringSortPriceDesc;
    }
    else if (value === "highestRate") {
      productContainer.innerHTML = " ";

      emptyStringSortRateAsc = "";
      SortByRatingAsc(allProducts).forEach(product => {
        emptyStringSortRateAsc += buildItem(product);
      })
      productContainer.innerHTML = emptyStringSortRateAsc;

    }
    else if (value === "lowestRate") {
      productContainer.innerHTML = " ";

      emptyStringSortRateDesc = "";
      SortByRatingAsc(allProducts).reverse().forEach(product => {
        emptyStringSortRateDesc += buildItem(product);
      })
      productContainer.innerHTML = emptyStringSortRateDesc;
    }
    document.querySelectorAll(".btn-cart").forEach(button => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const id = this.getAttribute("data-id"); // Get the product ID from button
        const product = productsList.find(p => p.id == id); // Find product by ID
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price
        });
        cartTotal += product.price;

        console.log(cartTotal);
        saveCartToLocalStorage();
      });
    });
  });

  const searchMark = document.getElementById("searchMark");
  const inputSearchBar = document.getElementById("inputSearchBar");

  searchMark.addEventListener("click", (event) => {
    event.preventDefault();
    isFiltering = true;//bunu eleyiremki infinte scroll olmasin
    const inputValue = inputSearchBar.value.toLowerCase();
    productContainer.innerHTML = ""; 

    productsList.forEach(product => {
      if (product.title.toLowerCase().includes(inputValue)) {
        productContainer.innerHTML += `
        <div class="col-md-3 my-3">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
          <div class="card position-relative">
            <a href="single-product.html"><img src="${product.image}" class="img-fluid rounded-4" alt="image"></a>
            <div class="card-body p-0">
              <a href="single-product.html">
                <h3 class="card-title pt-4 m-0">${product.title}</h3>
              </a>
              <div class="card-text">
                ${CreateRateElement(product.rating.rate)}
                <span class="rating secondary-font">${product.rating.rate}</span>
                <h3 class="secondary-font text-primary">$ ${product.price}</h3>
                <div class="d-flex flex-wrap mt-3">
                  <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                    <h5 class="text-uppercase m-0">Add to Cart</h5>
                  </a>
                  <a href="#" class="btn-wishlist px-4 pt-3 ">
                    <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                  </a>
                </div>
              </div>
              </div>
              </div>
              </div>
            </div>
          </div>`;
      }
    });
    saveCartToLocalStorage();
  });

  filterLess50.addEventListener('click', (event) => {
    isFiltering = true;
    event.preventDefault();
    productContainer.innerHTML = " ";
    let emptyString2 = "";
    productsList.forEach(product => {
      if (product.price <= 50) {
        emptyString2 += `
  <div class="col-md-3 my-3">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="card position-relative">
          <a href="single-product.html">
            <img src="${product.image}" class="img-fluid rounded-4" alt="image">
          </a>
          <div class="card-body p-0">
            <a href="single-product.html">
              <h3 class="card-title pt-4 m-0">${product.title}</h3>
            </a>
            <div class="card-text">
              ${CreateRateElement(product.rating.rate)}
              <span class="rating secondary-font">${product.rating.rate}</span>
              <h3 class="secondary-font text-primary">$ ${product.price}</h3>
              <div class="d-flex flex-wrap mt-3">
                <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                  <h5 class="text-uppercase m-0">Add to Cart</h5>
                </a>
                <a href="#" class="btn-wishlist px-4 pt-3">
                  <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

      }
    });
    productContainer.innerHTML = emptyString2;
    saveCartToLocalStorage();

  });

  filterMore50.addEventListener('click', (event) => {
    event.preventDefault();
    isFiltering = true;
    productContainer.innerHTML = " ";
    let emptyString3 = "";
    productsList.forEach(product => {
      if (Number(product.price) > 50) {
        emptyString3 += `
  <div class="col-md-3 my-3">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="card position-relative">
          <a href="single-product.html">
            <img src="${product.image}" class="img-fluid rounded-4" alt="image">
          </a>
          <div class="card-body p-0">
            <a href="single-product.html">
              <h3 class="card-title pt-4 m-0">${product.title}</h3>
            </a>
            <div class="card-text">
              ${CreateRateElement(product.rating.rate)}
              <span class="rating secondary-font">${product.rating.rate}</span>
              <h3 class="secondary-font text-primary">$ ${product.price}</h3>
              <div class="d-flex flex-wrap mt-3">
                <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                  <h5 class="text-uppercase m-0">Add to Cart</h5>
                </a>
                <a href="#" class="btn-wishlist px-4 pt-3">
                  <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

      }
    });
    productContainer.innerHTML = emptyString3;
    saveCartToLocalStorage();

  });

  basket.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const idToDelete = Number(event.target.dataset.id);
  const indexToRemove = cart.findIndex(item => item.id === idToDelete);

  if (indexToRemove !== -1) {
    cart.splice(indexToRemove, 1); 
    cartTotal = cart.reduce((sum, p) => sum + p.price, 0);
    saveCartToLocalStorage();
    renderBasket();
  }
});

});

function CreateRateElement(rate) {
  let rateElements = '';
  let primary = Math.floor(rate);
  let dif = rate - primary;
  for (let i = 0; i < primary; i++) {
    rateElements += '<iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>';
  }

  if (dif > 0) {
    rateElements += '<iconify-icon icon="clarity:half-star-solid" class="text-primary"></iconify-icon>';
  }

  let empty = 5 - Math.ceil(rate);
  for (let i = 0; i < empty; i++) {
    rateElements += '<iconify-icon icon="clarity:star-line" class="text-primary"></iconify-icon>';
  }
  return rateElements;
};

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartTotal", cartTotal.toString());
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  const storedTotal = localStorage.getItem("cartTotal");

  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  if (storedTotal) {
    cartTotal = parseFloat(storedTotal);
  }
}

function attachCartListeners() {
  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", { once: true }, function (event) {
      event.preventDefault();
      const id = this.getAttribute("data-id");
      const product = productsList.find(p => p.id == id);
      if (!product) return;
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price
      });
      cartTotal += product.price;
      saveCartToLocalStorage();
    });
  });
}

function buildItem(product) {
  return `
    <div class="col-md-3 my-6">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="card position-relative">
            <a href="single-product.html?id=${product.id}">
              <img src="${product.image}" class="img-fluid rounded-4" alt="image">
            </a>
            <div class="card-body p-0">
              <a href="single-product.html">
                <h3 class="card-title pt-4 m-0">${product.title}</h3>
              </a>
              <div class="card-text">
                ${CreateRateElement(product.rating.rate)}
                <span class="rating secondary-font">${product.rating.rate}</span>
                <h3 class="secondary-font text-primary">$ ${product.price}</h3>
                <div class="d-flex flex-wrap mt-3">
                  <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                    <h5 class="text-uppercase m-0">Add to Cart</h5>
                  </a>
                  <a href="#" class="btn-wishlist px-4 pt-3">
                    <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function SortByPriceAsc(list) { //buble sort edrem
  let n = list.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (list[j].price > list[j + 1].price) {

        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

function SortByRatingAsc(list) {
  let n = list.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (list[j].rating.rate > list[j + 1].rating.rate) {

        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

function renderBasket() {
  basket.innerHTML = `
    <div class="order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Your cart</span>
        <span class="badge bg-primary rounded-circle pt-2">${cart.length}</span>
      </h4>
      <ul class="list-group mb-3">
        ${cart.map(p => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${p.title}</span>
            <div>
              <span>$${p.price.toFixed(2)}</span>
              <button class="btn-delete btn btn-sm btn-danger ms-2" data-id="${p.id}">&times;</button>
            </div>
          </li>`).join("")}
        <li class="list-group-item d-flex justify-content-between">
          <strong>Total</strong>
          <strong>$${cartTotal.toFixed(2)}</strong>
        </li>
      </ul>
      <button class="w-100 btn btn-primary btn-lg">Continue to checkout</button>
    </div>`;
}
