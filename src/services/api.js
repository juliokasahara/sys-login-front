import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.12.107:8080/api", // rota do back-end
});

export default api;