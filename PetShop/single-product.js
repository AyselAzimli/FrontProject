document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())

    .then(product => {

      document.getElementById("selling-product").innerHTML = `
        <div class="container my-md-5 py-5">
          <div class="row g-md-5">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-md-9" >
                  <div class="swiper product-large-slider">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <img src="${product.image}" class="img-fluid" alt="${product.title}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mt-5">
              <div class="product-info">
                <div class="element-header">
                  <h2 class="display-6">${product.title}</h2>
                  <div class="rating-container d-flex gap-0 align-items-center">
                    <span class="rating secondary-font">
                      ${CreateRateElement(product.rating.rate)}
                      ${product.rating.rate}
                    </span>
                  </div>
                </div>

                <div class="product-price pt-3 pb-3">
                  <strong class="text-primary display-6 fw-bold">$${product.price.toFixed(2)}</strong>
                </div>

                <p>${product.description}</p>

                <div class="cart-wrap">
                  <div class="product-quantity pt-2">
                    <div class="stock-number text-dark"><em>${product.rating.count} in stock</em></div>
                    <div class="stock-button-wrap">
                      <div class="input-group product-qty align-items-center w-25">
                        <input type="text" id="quantity" name="quantity" class="form-control input-number text-center p-2 mx-1" value="1">
                      </div>

                      <div class="d-flex flex-wrap pt-4">
                        <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" id="addToCartBtn">
                          <h5 class="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a href="#" class="btn-wishlist px-4 pt-3 ">
                          <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="meta-product pt-4">
                  <div class="meta-item d-flex align-items-baseline">
                    <h6 class="item-title fw-bold no-margin pe-2">Category:</h6>
                    <ul class="select-list list-unstyled d-flex">
                      <li class="select-item"><a href="#">${product.category}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      document.getElementById("addToCartBtn").addEventListener("click", function (event) {
        event.preventDefault();
        const quantity = parseInt(document.getElementById("quantity").value);

        let cart = JSON.parse(localStorage.getItem("cart"));
        let cartTotal = parseFloat(localStorage.getItem("cartTotal"));

        for (let i = 0; i < quantity; i++) {
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price
          });
          cartTotal += product.price;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", cartTotal.toFixed(2));

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
