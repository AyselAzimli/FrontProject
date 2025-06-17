let cart = [];// bos listdi hansiki sebetdeki elementleri json kimim saxliyacaq
let cartTotal = 0;//sebetin umumi total meblegi
let productsList = [];

document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage();
  const filterLess50=document.getElementById("lessThan50");
  const filterMore50=document.getElementById("moreThan50");

  const basket = document.getElementById("basket");//sebetin icidi div 
  const basketIcon = document.getElementById("basketIcon");//ustune basanda bas vermelidir her sey

  const productContainer = document.getElementById("productCont");



  basketIcon.addEventListener("click", (event) => {
    event.preventDefault();
    basket.innerHTML = "";
    let html = `
      <div class="order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Your cart</span>
          <span class="badge bg-primary rounded-circle pt-2">${cart.length}</span>
        </h4>
        <ul class="list-group mb-3">`;

    cart.forEach(p => {
      html += `
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div><h6 class="my-0">${p.title}</h6></div>
          <span class="text-body-secondary">$${p.price.toFixed(2)}</span>
        </li>`;
    });

    html += `
        <li class="list-group-item d-flex justify-content-between">
          <span class="fw-bold">Total (USD)</span>
          <strong>$${cartTotal.toFixed(2)}</strong>
        </li>
        </ul>
        <button class="w-100 btn btn-primary btn-lg" type="button">
          Continue to checkout
        </button>
      </div>`;

    basket.innerHTML = html;
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

        productContainer.innerHTML += `
        <div class="card position-relative">
                <a href="single-product.html"><img src="${product.image}" class="img-fluid rounded-4" alt="image"></a>
                <div class="card-body p-0">
                  <a href="single-product.html">
                    <h3 class="card-title pt-4 m-0">${product.title}</h3>
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

  const searchMark = document.getElementById("searchMark");
  const inputSearchBar = document.getElementById("inputSearchBar");

  searchMark.addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = inputSearchBar.value.toLowerCase();
    productContainer.innerHTML = "";  // Now productContainer is defined

    productsList.forEach(product => {
      if (product.title.toLowerCase().includes(inputValue)) {
        productContainer.innerHTML += `
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
          </div>`;
      }
    });
    saveCartToLocalStorage();
  });


  filterLess50.addEventListener('click',(event) =>{
      event.preventDefault();
      productContainer.innerHTML = " ";
      let emptyString2="";
      productsList.forEach(product =>{
        if(product.price<=50){
          emptyString2+=`
        <div class="card position-relative">
                <a href="single-product.html"><img src="${product.image}" class="img-fluid rounded-4" alt="image"></a>
                <div class="card-body p-0">
                  <a href="single-product.html">
                    <h3 class="card-title pt-4 m-0">${product.title}</h3>
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


                  </div>`;
        }
      });
      productContainer.innerHTML=emptyString2;
      saveCartToLocalStorage();

  });


  filterMore50.addEventListener('click',(event) =>{
      event.preventDefault();
      productContainer.innerHTML = " ";
      let emptyString3="";
      productsList.forEach(product =>{
        if(Number(product.price)>50){
          emptyString3+=`
        <div class="card position-relative">
                <a href="single-product.html"><img src="${product.image}" class="img-fluid rounded-4" alt="image"></a>
                <div class="card-body p-0">
                  <a href="single-product.html">
                    <h3 class="card-title pt-4 m-0">${product.title}</h3>
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


                  </div>`;
        }
      });
      productContainer.innerHTML=emptyString3;
      saveCartToLocalStorage();

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



