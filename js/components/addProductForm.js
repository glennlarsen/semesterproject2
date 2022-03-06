import displayMessage from "./displayMessage.js";
import { uploadAnImage, imageValidation, titleValidation, priceValidation, descriptionValidation, productAdded } from "../constants/messages.js";
import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export function addProductForm() {

    const addHeader = document.querySelector(".add-header");
    const addFormContainer = document.querySelector(".add-form-container");

    addHeader.innerHTML = `<h1>My Products</h1>
    <a href="#addProductForm" role="button" data-bs-toggle="modal" class="btn-green btn-add-product"><i class="fa-solid fa-plus"></i><span>Add Product</span></a>`

    addFormContainer.innerHTML = `
    <div id="addProductForm" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <h4 class="modal-title">Add Product</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
      <form>
      <div id="message-container__add"></div>
      <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input type="number" class="form-control" id="price">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea rows="4" cols="50" class="form-control" id="description"></textarea>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="check" id="featured">
            <label class="form-check-label" for="featured">
              Featured
            </label>
          </div>
          </div>
          <div class="input-group mb-3">
            <input type="file" name="files" class="form-control" id="imageUpload">
            <label class="input-group-text" for="imageUpload">Upload</label>
            <div id="addDisplay_image"></div>
          </div>
      <button type="submit" class="btn-green">Add</button>
      </form>
      </div>
      </div>
      </div>
      </div>`

    const modal = document.querySelector("#addProductForm");
    const modalClose = document.querySelector("#addProductForm .btn-close");
    const addForm = document.querySelector("#addProductForm form");
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const message = document.querySelector("#message-container__add");
    const featured = document.querySelector("#featured");
    const imageUpload = document.querySelector("#imageUpload");
    const imagePreview = document.querySelector("#addDisplay_image");

    modalClose.onclick = function () {
        addForm.reset();
        imagePreview.style.backgroundImage = "";
        imagePreview.innerHTML = uploadAnImage;
        message.innerHTML = "";
    }

    modal.onclick = ("click", (e) => {
        if (e.target.classList.contains("modal")) {
            addForm.reset();
            imagePreview.style.backgroundImage = "";
            imagePreview.innerHTML = uploadAnImage;
            message.innerHTML = "";
        }
    });

    imagePreview.innerHTML = uploadAnImage;

    imageUpload.addEventListener('change', function () {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const uploaded_image = reader.result;
            imagePreview.style.backgroundImage = `url(${uploaded_image})`;
            imagePreview.innerHTML = "";
        });
        reader.readAsDataURL(this.files[0]);
    });

    addForm.addEventListener("submit", submitAddForm);

    function submitAddForm(event) {
        event.preventDefault();

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = price.value;
        const descriptionValue = description.value.trim();
        const featuredValue = featured.checked;
        const imageUploadValue = imageUpload.files[0];

        const notValidImage = imageUpload.files.length === 0 || imageUploadValue.size > 200000000 || imageUploadValue.type !== "image/jpeg" && imageUploadValue.type !== "image/jpg" && imageUploadValue.type !== "image/png";

        //Validation of inputs
        if (notValidImage) {
            return displayMessage("warning", imageValidation, "#message-container__add");
        }

        if (titleValue.length === 0 || titleValue.length > 40) {
            return displayMessage("warning", titleValidation, "#message-container__add");
        }

        if (priceValue <= 0) {
            return displayMessage("warning", priceValidation, "#message-container__add");
        }

        if (descriptionValue.length < 10) {
            return displayMessage("warning", descriptionValidation, "#message-container__add");
        }


        addProduct(titleValue, priceValue, descriptionValue, featuredValue, imageUploadValue);
    }

    async function addProduct(title, price, description, featured, image) {
        const url = baseUrl + "products";

        const data = { title: title, price: price, description: description, featured: featured };

        const formData = new FormData();
        formData.append("files.image", image, image.name);
        formData.append("data", JSON.stringify(data));

        const token = getToken();

        const options = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();


            if (json.created_at) {
                displayMessage("success", productAdded, "#message-container__add");
                addForm.reset();
                imagePreview.style.backgroundImage = "";
                imagePreview.innerHTML = uploadAnImage;

                setTimeout(function () {
                    location.href = "myproducts.html";
                }, 2000)
                
            }

            if (json.error) {
                displayMessage("warning", json.message, "#message-container__add");
            }

        } catch (error) {
            displayMessage("warning", "An error occured", "#message-container__add");
        }
    }



}