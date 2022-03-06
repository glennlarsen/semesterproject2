import { baseUrl } from "./settings/api.js";
import { renderFeatured } from "./ui/renderFeatured.js";
import { createHero } from "./components/createHero.js";
import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";

const featuredUrl = baseUrl + "products?featured=true";
const heroUrl = baseUrl + "home";
const loading = document.querySelector(".loader");

createMenu();

(async function getHero() {

    try {
        const response = await fetch(heroUrl);
        const json = await response.json();

        createHero(json);

    }
    catch (error) {
        displayMessage("warning", "An error occurred", ".hero-banner");
    }
}());

(async function getFeatured() {

    try {
        const response = await fetch(featuredUrl);
        const json = await response.json();

        renderFeatured(json);

    }
    catch (error) {
        displayMessage("warning", "An error occurred", ".products-container");
    }
    finally {
        loading.style.display = "none";
    }
}());

