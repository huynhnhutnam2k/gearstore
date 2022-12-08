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
      const res = await axios.get("category");
      set(() => ({ isLoading: false, listCategory: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  addCategory: async (name, token) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.post(
        "category",
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
      await axios.delete("category/" + id, {
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
