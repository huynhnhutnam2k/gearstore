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
      const res = await axios.get("http://localhost:3001/category");
      set(() => ({ isLoading: false, listCategory: res.data }));
    } catch (error) {
      // console.log(error);
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  addCategory: async (name, token) => {
    set(() => ({ isLoading: true }));
    try {
      await axios.post(
        "http://localhost:3001/category",
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
      await axios.delete("http://localhost:3001/category/" + id, {
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
