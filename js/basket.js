import createMenu from "./components/createMenu.js";
import { getExistingBasket } from "./utils/storage.js"
import { noBasket } from "./constants/keys.js";
import { renderTotal } from "./ui/renderTotal.js";



createMenu();

const basket = getExistingBasket();

const basketContainer = document.querySelector(".basket-list");
const checkoutContainer = document.querySelector(".checkout");

if (basket.length === 0) {
    basketContainer.innerHTML = noBasket;
    checkoutContainer.style.display = "none";
}

basket.forEach(product => {

    basketContainer.innerHTML += `<li class="basket-product d-flex">
                                  <div class="basket-thumbnail">
                                  <a href="details.html?id=${product.id}"><img src="${product.image}" /></a>
                                  </div>
                                  <div class="basket-text">
                                  <a href="details.html?id=${product.id}"><h5>${product.title}</h5></a>
                                  <span>$${product.price}</span>
                                  </div>
                                  </li>`
});

renderTotal();

