import axios from "axios";
import create from "zustand";
// const option = ["pending", "processing", "shipping", "completed", "cancelled"];
const option = [
  {
    value: "pending",
    display: "Chờ xác nhận",
  },
  {
    value: "processing",
    display: "Chờ lấy hàng",
  },
  {
    value: "shipping",
    display: "Đang giao",
  },
  {
    value: "completed",
    display: "Hoàn tất",
  },
  {
    value: "cancelled",
    display: "Đã hủy",
  },
];
// const option = [
//   "Chờ xác nhận",
//   "Chờ lấy hàng",
//   "Đang giao",
//   "Hoàn tất",
//   "Đã hủy",
// ];
export const useOrderStore = create((set, get) => ({
  orders: [],
  order: {},
  sort: "",
  search: "",
  status: option,
  isLoading: false,
  isError: false,
  isSuccess: false,
  msg: "",
  resetState: () => {
    set(() => ({ isLoading: false, isError: false, isSuccess: false }));
  },
  setSearch: (e) => {
    set(() => ({ search: e }));
  },
  setSort: (e) => {
    set(() => ({ sort: e }));
  },
  sortOrder: async () => {
    const { sort, fetchAll } = useOrderStore.getState();
    const order = await fetchAll();
    console.log(order);
    switch (sort) {
      case "pending":
        return set(() => ({
          orders: order.filter((item) => item.status === "pending"),
        }));
      case "processing":
        return set(() => ({
          orders: order.filter((item) => item.status === "processing"),
        }));
      case "shipping":
        return set(() => ({
          orders: order.filter((item) => item.status === "shipping"),
        }));
      case "completed":
        return set(() => ({
          orders: order.filter((item) => item.status === "completed"),
        }));
      default:
        return set(() => ({
          orders: order.filter((item) => item.status === "cancelled"),
        }));
    }
  },
  fetchAll: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("https://gearstorev2.onrender.com/order");
      const { sort } = useOrderStore.getState();
      if (sort !== "") {
        switch (sort) {
          case "pending":
            return set(() => ({ isLoading: false, orders: res.data.pending }));
          case "processing":
            return set(() => ({
              isLoading: false,
              orders: res.data.processing,
            }));
          case "shipping":
            return set(() => ({ isLoading: false, orders: res.data.shipping }));
          case "completed":
            return set(() => ({
              isLoading: false,
              orders: res.data.completed,
            }));
          default:
            return set(() => ({
              isLoading: false,
              orders: res.data.cancelled,
            }));
        }
      } else {
        set(() => ({ isLoading: false, orders: res.data.full }));
      }
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  getOrderForUser: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get(
        `https://gearstorev2.onrender.com/order/${id}`
      );
      set(() => ({ isLoading: false, order: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  getOrderDetail: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get(
        `https://gearstorev2.onrender.com/order/${id}`
      );
      set(() => ({ isLoading: false, order: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
    }
  },
  editOrder: async (id, order, token) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.put(
        `https://gearstorev2.onrender.com/order/${id}`,
        order,
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
  deleteOrder: async (id, token) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.delete(
        `https://gearstorev2.onrender.com/order/${id}`,
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
}));
