import { create } from "zustand";
import * as API from "../api/auth";

const storedToken = localStorage.getItem("token") || "";
const storedEmail = localStorage.getItem("LoggedInEmail") || "";
const storedUserId = localStorage.getItem("userId") || "";


export const authStore = create((set, get) => ({
    username: "",
    email: storedEmail,
    password: "",
    token: storedToken,
    userId: storedUserId,
    error: "",

    setUsername: (name) => set({ username: name }),
    setPassword: (word) => set({ password: word }),
    setEmail: (email) => set({ email: email }),
    clearError: () => set({ error: "" }),

    registerUser: async () => {
        const { username, password, email } = get();
        if (!username || !email || !password) {
            set({ error: "all fields must be filled" })
            return;
        }

        set({ error: "" })

        try {
            const res = await API.registerUser({ username, password, email });
            console.log("verification code sent to :", email);
            localStorage.setItem("LoggedInEmail", email)

            set({ password: "", name: "" });
        } catch (err) {
            console.error("Registration error:", err);
            const errorMessage =
                typeof err.response?.data === "string"
                    ? err.response.data.replace(/"/g, "")
                    : err.response?.data?.message || "Registration failed!";

            set({ error: errorMessage, username: "", password: "", email: "" });
        }

    },

    verifyEmail: async (code) => {
        const email = localStorage.getItem("LoggedInEmail");

        const data = { email, code };
        console.log(data);


        try {
            const res = await API.verifyEmail(data);
            console.log(res);

            set({ email: "" });
        } catch (err) {
            console.error("Email verification error:", err);
            const errorMessage =
                typeof err.response?.data === "string"
                    ? err.response.data.replace(/"/g, "")
                    : err.response?.data?.message || "Verificaion failed!";

            set({ error: errorMessage, email: "" });
        }


    },


    // In your authStore
    resendVerificationCode: async () => {
        const { email } = get();
        if (!email) {
            set({ error: "No email found to resend to" });
            return;
        }

        set({ error: "" });

        try {
            await API.resendVerificationCode({ email });
            console.log("Verification code resent to:", email);
        } catch (err) {
            console.error("Resend error:", err);
            const errorMessage =
                typeof err.response?.data === "string"
                    ? err.response.data.replace(/"/g, "")
                    : err.response?.data?.message || "Failed to resend code!";
            set({ error: errorMessage });
        }
    },

    clearVerificationState: () => {
        set({
            error: "",
            // Clear any other verification-related state if needed
        });
    },

    loginUser: async () => {
        const { email, password } = get();
        if (!email || !password) {
            set({ error: "all fields must be filled" })
            return;
        }

        set({ error: "" })

        try {
            const res = await API.loginUser({ email, password });
            set({ password: "", name: "", token: res });
            localStorage.setItem("storedToken", res)
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage =
                typeof err.response?.data === "string"
                    ? err.response.data.replace(/"/g, "")
                    : err.response?.data?.message || "Login failed!";

            set({ error: errorMessage, username: "", password: "", email: "" });
        }

    },


}))

