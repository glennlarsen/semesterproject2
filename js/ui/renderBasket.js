import { getExistingBasket } from "../utils/storage.js"
import { noBasket } from "../constants/messages.js";
import { removeFromBasket } from "../components/removeFromBasket.js";
import { incrementNumberOfUnits } from "../components/incrementNumberOfUnits.js";
import { decrementNumberOfUnits } from "../components/decrementNumberOfUnits.js";

export function renderBasket() {

    const basket = getExistingBasket();

    const basketContainer = document.querySelector(".basket-list");
    const checkoutContainer = document.querySelector(".checkout");

    basketContainer.innerHTML = "";

    if (basket.length === 0) {
        basketContainer.innerHTML = noBasket;
        checkoutContainer.style.display = "none";
    }


    basket.forEach(product => {

        let price = product.price * product.numberOfUnits;

        basketContainer.innerHTML += `<li class="basket-product d-flex align-items-center">
                                      <div class="basket-thumbnail">
                                      <a href="details.html?id=${product.id}"><img src="${product.image}" alt="${product.title}" /></a>
                                      </div>
                                      <div class="basket-text">
                                      <a href="details.html?id=${product.id}"><h5>${product.title}</h5></a>
                                      <span>$${price.toFixed(2)}</span>
                                      <button class="remove-product" data-id="${product.id}">X</button>
                                      <div class="number"><span class="decrement" data-id="${product.id}"><i class="fa-solid fa-minus"></i></span> ${product.numberOfUnits} <span class="increment" data-id="${product.id}"><i class="fa-solid fa-plus"></i></span></div>
                                      </div>
                                      </li>`

    });

    const removeButton = document.querySelectorAll(".basket-product button");
    const incrementButton = document.querySelectorAll(".increment");
    const decrementButton = document.querySelectorAll(".decrement");


    incrementButton.forEach(button => {
        button.addEventListener("click", incrementNumberOfUnits, false);
    });

    decrementButton.forEach(button => {
        button.addEventListener("click", decrementNumberOfUnits, false);
    });


    if (basket.length !== 0) {
        removeButton.forEach(button => {
            button.addEventListener("click", removeFromBasket, false);
        });

    }
}