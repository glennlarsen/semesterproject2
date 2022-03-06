import { clearItem } from "../utils/storage.js";
import { tokenKey, userKey } from "../constants/keys.js";

export default function logoutButton() {
    const button = document.querySelector("#logout");

    if (button) {
        button.onclick = function () {
            clearItem(userKey);
            clearItem(tokenKey);
            location.href = "/";
        };
    }
}