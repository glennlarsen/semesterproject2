import { renderBasket } from "../ui/renderBasket.js";
import { renderTotal } from "../ui/renderTotal.js";
import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";

export function updateBasket() {

    const basket = getExistingBasket();

    renderBasket();
    renderTotal();
    saveBasket(basket);
}