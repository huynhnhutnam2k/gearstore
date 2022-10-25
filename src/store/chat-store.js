import axios from "axios";
import create from "zustand";

export const useChatStore = create((set) => ({
  contacts: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  isError: false,
  getAllContact: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("http://localhost:3001/user");
      console.log(res);
      set(() => ({ isLoading: false, contacts: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  setCurrentChat: (chat) => {
    set(() => ({ currentChat: chat }));
  },
  getMessage: async (body) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get(`http://localhost:3001/message`, body);
      set(() => ({ isLoading: false, messages: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
}));
