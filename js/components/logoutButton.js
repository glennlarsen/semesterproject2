import { clearItem } from "../utils/storage.js";
import { tokenKey, userKey } from "../constants/keys.js";

export default function logoutButton() {
    const button = document.querySelector("#logout");

    if (button) {
        button.onclick = function () {
            const doLogout = confirm("Are you sure?");

            if (doLogout) {
                clearItem(userKey);
                clearItem(tokenKey);
                location.href = "/";
            }
        };
    }
}