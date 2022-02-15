

export function renderFeatured(featuredToRender) {

    const featuredContainer = document.querySelector(".products-container");

    featuredContainer.innerHTML = "";

    featuredToRender.forEach(featured => {

        featuredContainer.innerHTML += `<div class="product d-flex flex-column align-items-center">
                                        <img src="http://localhost:1337${featured.image.formats.large.url}" />
                                        <h3>${featured.title}</h3>
                                        <span>$${featured.price}</span>
                                        <a class="btn-green">Buy</a>
                                        </div>`;
    });
} 