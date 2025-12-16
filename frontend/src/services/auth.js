import {jwtDecode} from "jwt-decode";


export function userToken () {
    const token = localStorage.getItem("token");
    if(!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Token invalido", error);
        return null;
    }
}

export function autenticado () {
    const user = userToken();
    if(!user) return false;

    if (user.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return false;
    }

    return true;
}

export function userId () {
    const user = userToken();
    return user ? user.id : null;
}

export function logout() {
    localStorage.removeItem("token");
}