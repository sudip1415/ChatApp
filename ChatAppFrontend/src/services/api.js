import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Attach Authorization header if a token exists
Api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    } catch (e) {
        // localStorage may be unavailable in some environments; safely ignore
    }
    return config;
});


const API_URL = 'http://localhost:8080/api/message';

export const fetchConversation = async (sender, receiver) => {
    const res = await axios.get(`${API_URL}/conversation`, {
        params: { sender, receiver },
    });
    return res.data;
};

export default Api;

