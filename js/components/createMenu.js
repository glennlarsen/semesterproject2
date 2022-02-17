import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {

    const { pathname } = document.location;

    const username = getUsername();

    let authLink = `<a href="#loginModal" role="button" data-bs-toggle="modal" class="nav-link">Login</a>`;

    if (username) {
        authLink = `<a href="dashboard.html" class="nav-link ${pathname === "/dashboard.html" || pathname === "/add.html" || pathname === "/edit.html" ? "active" : ""}"><i class="fa-solid fa-user"></i> ${username}</a>`;
    }

    const container = document.querySelector(".menu-container");

    container.innerHTML = `
                           <nav class="navbar navbar-expand-lg navbar-light bg-light">
                           <div class="container">
                             <button
                               class="navbar-toggler"
                               type="button"
                               data-bs-toggle="collapse"
                               data-bs-target="#navbarSupportedContent"
                               aria-controls="navbarSupportedContent"
                               aria-expanded="false"
                               aria-label="Toggle navigation"
                             >
                               <span class="navbar-toggler-icon"></span>
                             </button>
                             <a class="navbar-brand" href="/"
                               ><img src="./logo/logo.png" alt="Secrets of Thailand Logo"
                             /></a>
                             <a href="basket.html" class="nav-link nav-link__mobile ${pathname === "/basket.html" ? "active" : ""}"
                               ><i class="fa-solid fa-bag-shopping"></i
                             ></a>
                             <div class="collapse navbar-collapse" id="navbarSupportedContent">
                               <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                                 <li class="nav-item">
                                   <a href="/" class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" aria-current="page">Home</a>
                                 </li>
                                 <li class="nav-item">
                                   <a href="shop.html" class="nav-link ${pathname === "/shop.html" ? "active" : ""}">Shop</a>
                                 </li>
                                 <li class="nav-item">
                                   ${authLink}
                                 </li>
                                 <li class="nav-item">
                                   <a href="basket.html" class="nav-link nav-link__cart ${pathname === "/basket.html" ? "active" : ""}"
                                     ><span>Basket</span> <i class="fa-solid fa-bag-shopping"></i
                                   ></a>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </nav>

                         <div id="loginModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Login</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                <form>
                <div class="message-container"></div>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="email" class="form-control" id="username">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn-green">Submit</button>
              </form>
                </div>
            </div>
        </div>
    </div>
             `;

    logoutButton();

}