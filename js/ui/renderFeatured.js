

export function renderFeatured(featuredToRender) {

    const featuredContainer = document.querySelector(".products-container");

    featuredContainer.innerHTML = "";

    featuredToRender.forEach(featured => {

        featuredContainer.innerHTML += `<div class="product d-flex flex-column align-items-center">
                                        <img src="http://localhost:1337${featured.image.formats.large.url}" />
                                        <a href="details.html?id=${featured.id}"><h3>${featured.title}</h3></a>
                                        <span>$${featured.price}</span>
                                        <a href="details.html?id=${featured.id}" class="btn-green">Buy</a>
                                        </div>`;
    });
} 