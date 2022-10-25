import axios from "axios";
import create from "zustand";

const userInfo = localStorage
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const useAuthStore = create((set) => ({
  userInfo: userInfo,
  isLoading: false,
  isError: false,
  login: async (user) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.post("http://localhost:3001/user/login", user);
      localStorage &&
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      window.location.href = "/";
      set(() => ({
        isLoading: false,
      }));
    } catch (error) {
      set(() => ({ isError: true, isLoading: false }));
    }
  },
  logout: async () => {
    set(() => ({ isLoading: true }));
    try {
      localStorage && localStorage.removeItem("userInfo");
      window.location.href = "/login";
      set(() => ({ isLoading: false, userInfo: null }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
}));
