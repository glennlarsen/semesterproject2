import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";
import { updateBasket } from "./updateBasket.js";
import createMenu from "./createMenu.js";

//Change number of units for an item
export function incrementNumberOfUnits() {

    const currentBasket = getExistingBasket();
    const id = this.dataset.id;

    currentBasket.findIndex(function (product) {
        if (product.id === id) {
            return product.numberOfUnits++;
        }
    });
    saveBasket(currentBasket);
    updateBasket();
    createMenu();
}