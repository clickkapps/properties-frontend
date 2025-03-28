import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL
console.log("baseUrl", baseURL)

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const token = localStorage.getItem("accessToken");

if(token){
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default apiClient