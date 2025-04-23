import axios from "axios";
import {appStorage} from "@/lib/storage.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

//  Intercept every request and attach token dynamically
apiClient.interceptors.request.use(
    (config) => {
        const token = appStorage.getAccessToken();
        if (token) {
            config.headers['Authorization'] =  `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiClient