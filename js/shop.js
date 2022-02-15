import createMenu from "./components/createMenu.js";
import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import displayMessage from "./components/displayMessage.js";

const productsUrl = baseUrl + "products";
const loading = document.querySelector(".loader");

createMenu();

async function getProducts() {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        console.log(json);

        renderProducts(json);

    }
    catch (error) {
        displayMessage("warning", error, ".products-container");
    }
    finally {
        loading.style.display = "none";
    }
}

getProducts();