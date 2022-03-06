import { getExistingBasket } from "../utils/storage.js";
import { saveBasket } from "../utils/storage.js";
import createMenu from "./createMenu.js";

export function handleClick() {

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const addedToBasket = document.querySelector(".details a");

    const currentBasket = getExistingBasket();

    const productExists = currentBasket.find(function (bask) {
        return bask.id === id;

    });

    if (!productExists) {
        const product = { id: id, title: title, price: price, image: image };

        currentBasket.push({
            ...product,
            numberOfUnits: 1,
        });
        saveBasket(currentBasket);

        addedToBasket.innerHTML = `<i class="fa-solid fa-check"></i> Added to Basket`;
        addedToBasket.style.pointerEvents = "none";
        setTimeout(function () {
            addedToBasket.innerHTML = "Add to Basket";
            addedToBasket.style.pointerEvents = "auto";
        }, 2000)

    }
    else {
        currentBasket.findIndex(function (product) {
            if (product.id === id) {
                return product.numberOfUnits++;
            }
        });
        saveBasket(currentBasket);

        addedToBasket.innerHTML = `<i class="fa-solid fa-check"></i> Added to Basket`;
        addedToBasket.style.pointerEvents = "none";
        setTimeout(function () {
            addedToBasket.innerHTML = "Add to Basket";
            addedToBasket.style.pointerEvents = "auto";
        }, 2000)

    }
    createMenu();

}