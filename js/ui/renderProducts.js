import { baseUrlImage } from "../settings/api.js";
import { noProducts } from "../constants/messages.js";

export function renderProducts(productsToRender) {

    const productsContainer = document.querySelector(".products-container");

    productsContainer.innerHTML = "";

    if (productsToRender.length === 0) {
        productsContainer.innerHTML = noProducts;
    }

    productsToRender.forEach(product => {

        const image = baseUrlImage + product.image.url;

        productsContainer.innerHTML += `<div class="product d-flex flex-column align-items-center">
                                        <img src="${image}" alt="${product.title}" />
                                        <a href="details.html?id=${product.id}"><h3>${product.title}</h3>
                                        <span>$${product.price}</span>
                                        <a href="details.html?id=${product.id}" class="btn-green">Buy</a>
                                        </div>`;
    });
} 