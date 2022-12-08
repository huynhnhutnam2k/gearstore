import axios from "axios";
import create from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  product: {},
  keyword: "",
  msg: "",
  isLoading: false,
  isLoadingDel: false,
  isSuccess: false,
  isError: false,
  setKeyword: (e) => {
    set(() => ({ keyword: e }));
  },
  resetState: () => {
    set(() => ({ isLoading: false, isError: false, isSuccess: false }));
  },
  fetch: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("https://gearstorev2.onrender.com/product");
      set(() => ({ isLoading: false, products: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
      console.log(error);
    }
  },
  searchProduct: async () => {
    set(() => ({ isLoading: true }));
    try {
      const keyword = useProductStore.getState().keyword;
      const res = await axios.get(
        `https://gearstorev2.onrender.com/product/search/${keyword}`
      );
      set(() => ({ isLoading: false, products: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  addProduct: async (product, token) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.post(
        "https://gearstorev2.onrender.com/product",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      set(() => ({ isLoading: false, product: res.data, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
      console.log(error);
    }
  },
  getAProduct: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get(
        `https://gearstorev2.onrender.com/product/${id}`
      );
      set(() => ({ isLoading: false, product: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  updateAProduct: async (id, product, token) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.put(
        `https://gearstorev2.onrender.com/product/${id}`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      set(() => ({ isLoading: false, msg: res.data, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  deleteAProduct: async (id, token) => {
    set(() => ({ isLoadingDel: false }));
    try {
      const res = await axios.delete(
        `https://gearstorev2.onrender.com/product/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      set(() => ({ isLoadingDel: false, msg: res.data, isSuccess: true }));
    } catch (error) {
      set(() => ({ isLoadingDel: false, isError: true }));
    }
  },
  sort: (keyword) => {
    const { products } = useProductStore.getState();
    switch (keyword) {
      case "pricedecre":
        return set(() => ({
          products: products.sort((a, b) => a.price - b.price),
        }));
      case "priceincre":
        return set(() => ({
          products: products.sort((a, b) => b.price - a.price),
        }));
      default:
        return set(() => ({
          products: products.sort((a, b) => {
            const i = new Date(a.createdAt);
            const o = new Date(b.createdAt);
            return i - o;
          }),
        }));
    }
  },
}));
