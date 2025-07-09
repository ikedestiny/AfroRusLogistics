import axios from 'axios';
import { authStore } from '../state/authStore';

// Determine base URL based on environment
const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment
    ? '/api/space/'  // Uses Vite proxy in development
    : 'http://localhost:8083/space/';  // Direct connection in production

// Create axios instance
export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor (unchanged)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || authStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor (unchanged)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authStore.getState().logout();
        }
        const errorMessage = error.response?.data?.message ||
            error.response?.data ||
            error.message;
        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data
        });
    }
);

// API functions (modified endpoint paths)
export const addAvailableSpaceForDoc = (details) =>
    api.post("doc-space-available", details);

export const addNeededSpaceForDoc = (details) =>
    api.post("doc-space-needed", details);

export const addAvailableSpaceForLoad = (details) =>
    api.post("load-space-available", details);

export const addNeededSpaceForLoad = (details) =>
    api.post("load-space-needed", details);

export const getAll = () => api.get('all');