import createMenu from "./components/createMenu.js";
import createAdminMenu from "./components/createAdminMenu.js";
import { getToken } from "./utils/storage.js";

const token = getToken();
const dashboardContainer = document.querySelector(".dashboard-container");

if (!token) {
    location.href = "/";
}

dashboardContainer.innerHTML = `
<div class="mt-4">
<h1>Dashboard</h1>
<p>Welcome to your Dashboard!</p>
<p>
  From this page you can add, edit and delete products from your
  shop. This includes titles, descriptions, images prices and toggle
  featured products. Logout by clicking the logout button in the
  admin menu.
</p>
</div>`;

createMenu();
createAdminMenu();


