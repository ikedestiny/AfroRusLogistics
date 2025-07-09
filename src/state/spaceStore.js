import { create } from "zustand";
import * as API from "../api/space";

export const spaceStore = create((set, get) => ({
    all: [],
    error: null,
    loading: false,

    setAll: (spaces) => set({ all: spaces }),

    fetchAll: async () => {
        set({ loading: true, error: null });
        try {
            const response = await API.getAll();
            console.log(response);
            set({ all: response.data, loading: false });
        } catch (error) {
            set({
                error: error.message || "Failed to fetch spaces",
                loading: false
            });
        }
    },

    addAvailableSpaceForDoc: async (details) => {
        set({ loading: true, error: null });
        try {
            const result = await API.addAvailableSpaceForDoc(details);
            console.log(result);
            await get().fetchAll(); // Refresh the list after adding
            set({ loading: false });
            return result;
        } catch (error) {
            set({
                error: error.message || "Failed to add available space for doc",
                loading: false
            });
            throw error;
        }
    },

    addNeededSpaceForDoc: async (details) => {
        set({ loading: true, error: null });
        try {
            const result = await API.addNeededSpaceForDoc(details);
            console.log(result);
            await get().fetchAll(); // Refresh the list after adding
            set({ loading: false });
            return result;
        } catch (error) {
            set({
                error: error.message || "Failed to add needed space for doc",
                loading: false
            });
            throw error;
        }
    },

    addAvailableSpaceForLoad: async (details) => {
        set({ loading: true, error: null });
        try {
            const result = await API.addAvailableSpaceForLoad(details);
            console.log(result);
            await get().fetchAll(); // Refresh the list after adding
            set({ loading: false });
            return result;
        } catch (error) {
            set({
                error: error.message || "Failed to add available space for load",
                loading: false
            });
            throw error;
        }
    },

    addNeededSpaceForLoad: async (details) => {
        set({ loading: true, error: null });
        try {
            const result = await API.addNeededSpaceForLoad(details);
            console.log(result);
            await get().fetchAll(); // Refresh the list after adding
            set({ loading: false });
            return result;
        } catch (error) {
            set({
                error: error.message || "Failed to add needed space for load",
                loading: false
            });
            throw error;
        }
    },

    // Utility function to clear errors
    clearError: () => set({ error: null }),
}));