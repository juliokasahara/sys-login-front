import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.2.2:8080/api", // rota do back-end ip expecial para emulador 10.0.2.2
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;