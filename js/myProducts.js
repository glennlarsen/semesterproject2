import createMenu from "./components/createMenu.js";
import createAdminMenu from "./components/createAdminMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { renderMyProducts } from "./ui/renderMyProducts.js";
import displayMessage from "./components/displayMessage.js";
import { addProductForm } from "./components/addProductForm.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

const productsUrl = baseUrl + "products";
const loading = document.querySelector(".loader");

createMenu();

createAdminMenu();

(async function () {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        renderMyProducts(json);
        addProductForm();

    }
    catch (error) {
        displayMessage("warning", error, ".products-container");
    }
    finally {
        loading.style.display = "none";
    }

})();








