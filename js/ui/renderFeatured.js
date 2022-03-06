import { baseUrlImage } from "../settings/api.js";

export function renderFeatured(featuredToRender) {

    const featuredContainer = document.querySelector(".products-container");

    featuredContainer.innerHTML = "";

    featuredToRender.forEach(featured => {

        const image = baseUrlImage + featured.image.url;

        featuredContainer.innerHTML += `<div class="product d-flex flex-column align-items-center">
                                        <img src="${image}" alt="${featured.title}" />
                                        <a href="details.html?id=${featured.id}"><h3>${featured.title}</h3></a>
                                        <span>$${featured.price}</span>
                                        <a href="details.html?id=${featured.id}" class="btn-green">Buy</a>
                                        </div>`;
    });
} 