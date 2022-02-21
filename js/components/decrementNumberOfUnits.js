import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";
import { updateBasket } from "./updateBasket.js";
import createMenu from "./createMenu.js"; 

//Change number of units for an item
export function decrementNumberOfUnits() {

    let currentBasket = getExistingBasket();
    const id = this.dataset.id;

    currentBasket.findIndex(function (product) {
        if (product.id === id) {
            if (product.numberOfUnits <= 1) {
                currentBasket = currentBasket.filter(bask => bask.id !== id);
                saveBasket(currentBasket);
            } else {
                return product.numberOfUnits--;
            }

        }
    });
    saveBasket(currentBasket);
    updateBasket();
    createMenu();

}