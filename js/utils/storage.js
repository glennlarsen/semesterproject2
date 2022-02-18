import { tokenKey, userKey, basketKey } from "../constants/keys.js";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
}

export function getExistingBasket() {
    const value = localStorage.getItem(basketKey);

    if(!value) {
        return [];
    }

    return JSON.parse(value);

}

export function saveBasket(basket) {
    saveToStorage(basketKey, basket);
}

export function clearItem(key) {
    localStorage.removeItem(key);
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}