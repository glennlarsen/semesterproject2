


export function renderProduct(product) {
    
    const detailsContainer = document.querySelector(".details-container");

    document.title = `Secrets of Thailand | ${product.title}`;

    detailsContainer.innerHTML = 
    `
    <div class="details">
    <div>
    <img src="http://localhost:1337${product.image.formats.large.url}" />
    </div>
    <div class="product-text">
    <h1>${product.title}</h1>
    <span>$${product.price}</span>
    <div class="reverse-button">
    <a class="btn-green">Add to cart</a>
    <p>${product.description}</p>
    </div>
    </div>
    </div>
    `;
}