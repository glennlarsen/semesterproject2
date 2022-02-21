import { defaultShipping, freeShipping } from "../constants/keys.js";
import { getExistingBasket } from "../utils/storage.js"

export function renderTotal() {
    let totalPrice = 0;
    let shipping = defaultShipping;

    const basket = getExistingBasket();
    const totalContainer = document.querySelector(".total-container");


basket.forEach(product => {

 totalPrice += parseFloat(product.price)*product.numberOfUnits;

if (totalPrice > 100) {
    shipping = freeShipping;
}

totalContainer.innerHTML = `Total: <span>$${totalPrice.toFixed(2)}</span>
                            <div>Shipping:${shipping}</div>`;

});
}