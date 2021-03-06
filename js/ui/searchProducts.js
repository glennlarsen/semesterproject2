import { renderProducts } from "./renderProducts.js";

export function searchProducts(products) {
    const search = document.querySelector(".search");

    search.onkeyup = function () {
        const searchValue = this.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (product) {
            if (product.title.toLowerCase().includes(searchValue)) {
                return true;
            }
            if (product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        });
        renderProducts(filteredProducts);
    };
}