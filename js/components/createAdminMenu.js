import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";


export default function createAdminMenu() {

const { pathname } = document.location;

const username = getUsername();

const subMenuContainer = document.querySelector(".admin-menu-container");

subMenuContainer.innerHTML = `
                              <a href="dashboard.html" class="nav-link ${pathname === "/dashboard.html" ? "active" : ""}">Dashboard</a>
                              <a href="add.html" class="nav-link ${pathname === "/add.html" ? "active" : ""}">Add Products</a>
                              <a href="edit.html" class="nav-link ${pathname === "/edit.html" ? "active" : ""}">Edit Products</a>
                              <button id="logout">Logout ${username}</button>
                              `;


logoutButton();

}