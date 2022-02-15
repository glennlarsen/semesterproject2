
export function renderProducts(productsToRender) {

    const productsContainer = document.querySelector(".products-container");

    productsContainer.innerHTML = "";

    productsToRender.forEach(product => {

        productsContainer.innerHTML += `<div class="product d-flex flex-column align-items-center">
                                        <img src="http://localhost:1337${product.image.formats.large.url}" />
                                        <h3>${product.title}</h3>
                                        <span>$${product.price}</span>
                                        <a class="btn-green">Buy</a>
                                        </div>`;
    });
} 