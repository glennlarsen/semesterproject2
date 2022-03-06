import { handleClick } from "../components/handleClick.js";

export function renderProduct(product) {

    const detailsContainer = document.querySelector(".details-container");

    document.title = `Secrets of Thailand | ${product.title}`;

    detailsContainer.innerHTML =
        `
    <a href="##" onClick="history.go(-1); return false;" class="btn-back">Previous Page</a>
    <div class="details">
    <div>
    <img src="http://localhost:1337${product.image.url}" alt="${product.title}" />
    </div>
    <div class="product-text">
    <h1>${product.title}</h1>
    <span>$${product.price}</span>
    <div class="reverse-button">
    <a class="btn-green" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="http://localhost:1337${product.image.formats.thumbnail.url}">Add to cart</a>
    <p>${product.description}</p>
    </div>
    </div>
    </div>
    `;

    const cartButton = document.querySelector(".details a");

    cartButton.addEventListener("click", handleClick);
}