document.addEventListener("DOMContentLoaded", function () {
  const productContHome = document.getElementById("productContHome");

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {

      productContHome.innerHTML = " ";

      data.forEach(product => {
        productContHome.innerHTML += `
        <div class="col-md-3 my-3">
      <div class="card position-relative h-100">
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
            <h3 class="secondary-font text-primary">$${product.price}</h3>
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
    </div>`;

      });
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

