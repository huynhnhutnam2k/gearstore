import create from "zustand";
import axios from "axios";
export const promotions =
  localStorage && localStorage.getItem("promotions")
    ? JSON.parse(localStorage.getItem("promotions"))
    : [];
export const usePromotionStore = create((set) => ({
  promotion: {},
  promotions: promotions,
  isSuccess: false,
  isError: false,
  isLoading: false,
  create: async (body) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.post(
        "https://gearstorev2.onrender.com/promotion",
        body
      );
      set(() => ({ promotion: res.data, isSuccess: true, isLoading: false }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  fetch: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("https://gearstorev2.onrender.com/promotion");
      localStorage &&
        localStorage.setItem("promotions", JSON.stringify(res.data));
      set(() => ({ promotions: res.data, isLoading: false }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  update: async (id, body) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.put("http://localhost:3001/promotion/" + id, body);
      set(() => ({ isLoading: false, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  delete: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.delete(`https://gearstorev2.onrender.com/promotion/${id}`);
      set(() => ({ isLoading: false, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  get: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get(`http://localhost:3001/promotion/${id}`);
      set(() => ({ promotion: res.data, isLoading: false }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  resetState: () => {
    set(() => ({ isLoading: false, isError: false, isSuccess: false }));
  },
}));
