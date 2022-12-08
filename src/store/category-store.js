import create from "zustand";
import axios from "axios";
export const useCategoryStore = create((set) => ({
  listCategory: [],
  category: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  resetState: () => {
    set(() => ({ isLoading: false, isSuccess: false, isError: false }));
  },
  getListCategory: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("https://gearstorev2.onrender.com/category");
      set(() => ({ isLoading: false, listCategory: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  addCategory: async (name, token) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.post(
        "https://gearstorev2.onrender.com/category",
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      set(() => ({ isLoading: false, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  deleteCategory: async (id, token) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.delete("https://gearstorev2.onrender.com/category/" + id, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      set(() => ({ isLoading: false, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
}));
