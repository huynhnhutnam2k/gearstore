import create from "zustand";
import axios from "axios";
export const useCategoryStore = create((set) => ({
  listCategory: [],
  isLoading: false,
  isError: false,
  getListCategory: async () => {
    set((state) => ({ isLoading: true }));
    try {
      const res = await axios.get("http://localhost:3001/category");
      console.log("helo");
      set(() => ({ isLoading: false, listCategory: res.data }));
    } catch (error) {
      console.log(error);
      set(() => ({ isLoading: false, isError: true }));
    }
  },
}));
