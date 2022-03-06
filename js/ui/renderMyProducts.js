import { baseUrl, baseUrlImage } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../components/displayMessage.js";
import { noProducts, imageValidation, titleValidation, priceValidation, descriptionValidation, productDeleted, productUpdated } from "../constants/messages.js";

const token = getToken();

export function renderMyProducts(productsToRender) {

    const productsContainer = document.querySelector(".products-container");

    productsContainer.innerHTML = "";

    if (productsToRender.length === 0) {
        productsContainer.innerHTML = noProducts;
    }

    productsToRender.forEach(product => {

        const image = baseUrlImage + product.image.url;
        let featuredStatus = "featured-banner";

        if (product.featured) {
            featuredStatus = "featured-banner featured-banner__show";
        }

        productsContainer.innerHTML += `<div class="product my-product d-flex flex-column align-items-center">
                                        <div class="image-container">
                                        <a href="details.html?id=${product.id}">
                                        <img src="${image}" alt="${product.title}" />
                                        <div class="${featuredStatus}">Featured</div>
                                        </div>
                                        <h3>${product.title}</h3>
                                        </a>
                                        <span>$${product.price}</span>
                                        <div class="flex-buttons">
                                        <a href="#editProductForm" data-id="${product.id}" id="edit-product-btn" role="button" data-bs-toggle="modal" class="btn-green btn-edit">Edit</a>
                                        <a href="#deleteProductForm" role="button" data-bs-toggle="modal" data-id="${product.id}" class="btn-green btn-delete" id="delete-product-btn">Delete</a>
                                        </div>
                                        </div>
                                        
        <div id="deleteProductForm" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this product forever?</p>
              </div>
              <div class="modal-footer">
                <button id="deleteForever" type="button" class="btn-confirm btn-red" data-bs-dismiss="modal">Delete forever</button>
                <button id="keepProduct" type="button" class="btn-confirm btn-green">keep Product</button>
              </div>
            </div>
          </div>
        </div>`;

    });

    const deleteButton = document.querySelectorAll("#delete-product-btn");
    deleteButton.forEach(btn => btn.addEventListener("click", (event) => deleteProduct(event)));

    const editButton = document.querySelectorAll("#edit-product-btn");
    editButton.forEach(btn => btn.addEventListener("click", (event) => editProduct(event)));

}

function deleteProduct(event) {

    const id = event.target.dataset.id;

    const deleteForever = document.querySelector("#deleteForever");
    const keepProduct = document.querySelector("#keepProduct");

    keepProduct.onclick = function () {
        location.reload();
    }


    deleteForever.onclick = function () {

        (async function () {


            const url = baseUrl + "products/" + id;

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                displayMessage("success", productDeleted, ".products-container");
                setTimeout(function () {
                    productsContainer.innerHTML = "";
                    location = "myproducts.html";
                }, 2000);


            } catch (error) {
                displayMessage("warning", error, ".products-container");
            }
        })();

    }


}

function editProduct(event) {

    const modal = document.querySelector("#editProductForm");
    const modalClose = document.querySelector("#editProductForm .btn-close");
    const editForm = document.querySelector("#editProductForm form");
    const title = document.querySelector("#editTitle");
    const price = document.querySelector("#editPrice");
    const description = document.querySelector("#editDescription");
    const message = document.querySelector("#message-container__edit");
    const featured = document.querySelector("#editFeatured");
    const imageUpload = document.querySelector("#editImageUpload");
    const imagePreview = document.querySelector("#editDisplay_image");
    const id = event.target.dataset.id;



    (async function () {

        const url = baseUrl + "products/" + id;

        try {
            const response = await fetch(url);
            const json = await response.json();

            title.value = json.title;
            price.value = json.price;
            description.value = json.description;
            featured.checked = json.featured;

            imagePreview.style.backgroundImage = `url(${baseUrlImage}${json.image.url})`;

            imageUpload.addEventListener('change', function () {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const uploaded_image = reader.result;
                    imagePreview.style.backgroundImage = `url(${uploaded_image})`;
                });
                reader.readAsDataURL(this.files[0]);
            });

            modalClose.onclick = function () {
                imagePreview.style.backgroundImage = `url(${baseUrlImage}${json.image.url})`;
                editForm.reset(imageUpload);
                message.innerHTML = "";
            }

            modal.onclick = ("click", (e) => {
                if (e.target.classList.contains("modal")) {
                    imagePreview.style.backgroundImage = `url(${baseUrlImage}${json.image.url})`;
                    editForm.reset(imageUpload);
                    message.innerHTML = "";
                }
            });


        } catch (error) {
            displayMessage("warning", error, ".products-container");
        }
    })();

    editForm.addEventListener("submit", submitEditForm);

    function submitEditForm(event) {
        event.preventDefault();

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = price.value;
        const descriptionValue = description.value.trim();
        const featuredValue = featured.checked;
        const imageUploadValue = imageUpload.files[0];

        //Validation of inputs
        const notValidImage = imageUpload.files.length === 0 || imageUploadValue.size > 200000000 || imageUploadValue.type !== "image/jpeg" && imageUploadValue.type !== "image/jpg" && imageUploadValue.type !== "image/png";

        if (imageUploadValue) {
            if (notValidImage) {
                return displayMessage("warning", imageValidation, "#message-container__edit");
            }
        }

        if (titleValue.length === 0 || titleValue.length > 40) {
            return displayMessage("warning", titleValidation, "#message-container__edit");
        }

        if (priceValue <= 0) {
            return displayMessage("warning", priceValidation, "#message-container__edit");
        }

        if (descriptionValue.length < 10) {
            return displayMessage("warning", descriptionValidation, "#message-container__edit");
        }


        updateProduct(titleValue, priceValue, descriptionValue, featuredValue, imageUploadValue);
    }

    async function updateProduct(title, price, description, featured, image) {
        const url = baseUrl + "products/" + id;

        let formData = new FormData();
        let data = "";

        if (image) {
            data = { title: title, price: price, description: description, featured: featured };

            formData.append("files.image", image, image.name);
            formData.append("data", JSON.stringify(data));
            console.log(formData);
        } else {
            data = { title: title, price: price, description: description, featured: featured };
            formData.append("data", JSON.stringify(data));
        }

        const options = {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();

            if (json.updated_at) {
                displayMessage("success", productUpdated, "#message-container__edit");

                setTimeout(function () {
                    location.href = "myproducts.html";
                }, 2000)
            }

            if (json.error) {
                displayMessage("warning", json.message, "#message-container__edit");
            }
        } catch (error) {
            displayMessage("warning", "An error occurred", "#message-container__edit");
        }
    }


}








