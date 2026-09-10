import { create } from "zustand";
import axios from "axios";

const API = "/api";

// ─── Portfolio Store (Zustand) ─────────────────────────────────────────────────
const usePortfolioStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  projects: [],
  skills: [],
  isLoading: false,
  error: null,
  contactStatus: null, // null | "sending" | "success" | "error"
  contactError: null,

  // ── Actions ────────────────────────────────────────────────────────────────
  fetchProjects: async (featuredOnly = false) => {
    set({ isLoading: true, error: null });
    try {
      const url = featuredOnly
        ? `${API}/projects?featured=true`
        : `${API}/projects`;
      const { data } = await axios.get(url);
      set({ projects: data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Impossible de charger les projets.",
        isLoading: false,
      });
    }
  },

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API}/skills`);
      set({ skills: data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Impossible de charger les compétences.",
        isLoading: false,
      });
    }
  },

  sendContact: async (formData) => {
    set({ contactStatus: "sending", contactError: null });
    try {
      await axios.post(`${API}/contact`, formData);
      set({ contactStatus: "success" });
      setTimeout(() => set({ contactStatus: null }), 4000);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.errors?.join(" ") ||
        "Erreur d'envoi. Réessaie.";
      set({ contactStatus: "error", contactError: msg });
    }
  },

  clearError: () => set({ error: null }),
}));

export default usePortfolioStore;
