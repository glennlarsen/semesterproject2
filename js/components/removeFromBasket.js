import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";
import { updateBasket } from "./updateBasket.js"; 
import createMenu from "./createMenu.js";


export function removeFromBasket() {

    const currentBasket = getExistingBasket();

    const id = this.dataset.id;

    const newBasket = currentBasket.filter(bask => bask.id !== id);
        saveBasket(newBasket);

        updateBasket();
        createMenu();
}