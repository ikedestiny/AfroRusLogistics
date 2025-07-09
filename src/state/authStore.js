import { create } from "zustand";
import * as API from "../api/auth";

// Helper function for secure storage
const safeStorage = {
    get: (key) => {
        try {
            return localStorage.getItem(key) || "";
        } catch (error) {
            console.error("LocalStorage access error:", error);
            return "";
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error("LocalStorage set error:", error);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("LocalStorage remove error:", error);
        }
    }
};

export const authStore = create((set, get) => ({
    username: "",
    email: safeStorage.get("email") || "",
    password: "",
    token: safeStorage.get("token") || "",
    userId: safeStorage.get("userId") || "",
    error: "",
    isLoading: false,

    // Setters
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setEmail: (email) => set({ email }),
    clearError: () => set({ error: "" }),

    // Actions
    registerUser: async () => {
        const { username, password, email } = get();

        if (!username || !email || !password) {
            set({ error: "All fields must be filled" });
            return;
        }

        set({ isLoading: true, error: "" });

        try {
            await API.registerUser({ username, password, email });
            safeStorage.set("email", email);
            set({ password: "", username: "", isLoading: false });
        } catch (err) {
            console.error("Registration error:", err);
            const errorMessage = err.response?.data?.message ||
                (typeof err.response?.data === "string"
                    ? err.response.data.replace(/"/g, "")
                    : "Registration failed!");

            set({
                error: errorMessage,
                username: "",
                password: "",
                email: "",
                isLoading: false
            });
        }
    },

    verifyEmail: async (code) => {
        const email = safeStorage.get("email");
        if (!email) {
            set({ error: "No email found for verification" });
            return;
        }

        set({ isLoading: true, error: "" });

        try {
            const { token, userId } = await API.verifyEmail({ email, code });
            safeStorage.set("token", token);
            safeStorage.set("userId", userId);
            set({
                token,
                userId,
                email: "",
                isLoading: false
            });
        } catch (err) {
            console.error("Email verification error:", err);
            const errorMessage = err.response?.data?.message ||
                "Verification failed!";
            set({
                error: errorMessage,
                isLoading: false
            });
        }
    },

    resendVerificationCode: async () => {
        const email = safeStorage.get("email");
        if (!email) {
            set({ error: "No email found to resend to" });
            return;
        }

        set({ isLoading: true, error: "" });

        try {
            await API.resendVerificationCode({ email });
            set({ isLoading: false });
        } catch (err) {
            console.error("Resend error:", err);
            const errorMessage = err.response?.data?.message ||
                "Failed to resend code!";
            set({
                error: errorMessage,
                isLoading: false
            });
        }
    },

    loginUser: async () => {
        const { email, password } = get();
        if (!email || !password) {
            set({ error: "All fields must be filled" });
            return;
        }

        set({ isLoading: true, error: "" });

        try {
            const { token, userId } = await API.loginUser({ email, password });
            safeStorage.set("token", token);
            safeStorage.set("userId", userId);
            safeStorage.set("email", email);
            set({
                token,
                userId,
                password: "",
                isLoading: false
            });
        } catch (err) {
            console.error("Login error:", err);
            set({
                error: err,
                password: "",
                isLoading: false
            });
        }
    },

    logout: () => {
        safeStorage.remove("token");
        safeStorage.remove("userId");
        safeStorage.remove("email");
        set({
            email: "",
            password: "",
            token: "",
            userId: "",
            username: ""
        });
    },

    clearVerificationState: () => {
        set({ error: "" });
    }
}));