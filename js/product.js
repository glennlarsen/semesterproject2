import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { renderProduct } from "./ui/renderProduct.js";


const loading = document.querySelector(".loader");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get("id");

const newUrl = baseUrl + "products/" + id

console.log(newUrl);

async function getProduct() {
    try {
      const response = await fetch(newUrl);
  
      const json = await response.json();

      console.log(json);
  
      renderProduct(json);
  
    } catch (error) {
        displayMessage("warning", "An error occurred", ".details-container");
    }
    finally {
        loading.style.display = "none";
    }
  }

  getProduct();