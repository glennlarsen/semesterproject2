import createMenu from "./components/createMenu.js";
import createAdminMenu from "./components/createAdminMenu.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

createAdminMenu();


