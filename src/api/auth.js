import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8082/auth/",
    headers: {
        "Content-Type": "application/json"
    }
});

export const emailVerify = axios.create({
    baseURL: "http://localhost:8084/email/",
    headers: {
        "Content-Type": "application/json"
    }
});



export const registerUser = async (user) => {
    try {
        const response = await api.post("register", user);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error;
    }
};

export const verifyEmail = async (emailAndCode) => {
    try {
        const response = await emailVerify.post("verify-code", emailAndCode);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error;
    }
};


//returns jwt
export const loginUser = async (user) => {
    try {
        const response = await api.post("login", user);
        return await response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};

