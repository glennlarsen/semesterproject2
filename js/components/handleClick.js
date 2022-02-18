import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";

export function handleClick() {

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentBasket = getExistingBasket();

    const productExists = currentBasket.find(function (bask) {
        return bask.id === id;
    });

    if (!productExists) {
        const product = { id: id, title: title, price: price, image: image };

        currentBasket.push(product);
        saveBasket(currentBasket);
    }
    else {
        const newBasket = currentBasket.filter(bask => bask.id !== id);
        saveBasket(newBasket);
    }

}