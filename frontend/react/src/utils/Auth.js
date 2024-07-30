import axios from "axios";

export const user = ["ROLE_USER", "ROLE_ADMIN"];
export const admin = ["ROLE_ADMIN"];

export const isLoggedIn = async () => {
    let isLoggedIn = false;
    await axios.get("http://localhost:8080/whoami/username")
        .then(() => isLoggedIn = true).catch(() => isLoggedIn = false);

    return isLoggedIn;
}

export const username = async () => {
    let username = "";
    await axios.get("http://localhost:8080/whoami/username")
        .then((response) => username = response.data).catch(() => username = "");

    return username;
}

export const role = async () => {
    let role = "";
    await axios.get("http://localhost:8080/whoami/role")
        .then((response) => role = response.data).catch(() => role = "");

    return role;
}

export const isUser = async () => {
    return ["ROLE_USER", "ROLE_ADMIN"].includes(await role());
}

export const isAdmin = async () => {
    return "ROLE_ADMIN" === await role();
}