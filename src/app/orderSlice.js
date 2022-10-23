import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const orderItem = localStorage
  ? JSON.parse(localStorage.getItem("orderItem"))
  : [];
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orders: [],
    orderItem: orderItem,
    addSuccess: false,
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    addOrderItem: (state, action) => {
      state.orderItem = [...state.orderItem, action.payload];
      localStorage &&
        localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
    },
    updateOrderItem: (state, action) => {
      state.orderItem = state.orderItem.map((item) => {
        if (item.product === action.payload.product) {
          // console.log(action.payload);
          return action.payload;
        }
        return item;
      });
      localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
    },
    removeOrderItem: (state, action) => {
      state.orderItem = state.orderItem.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
    },
    removeAllOrderItem: (state) => {
      state.orderItem = [];
      localStorage &&
        localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
    },
    resetState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.addSuccess = false;
      // localStorage.removeItem("orderItem");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addSuccess = true;
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async ({ order, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3001/order", order, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchOrder = createAsyncThunk("order/fetchId", async (email) => {
  try {
    const res = await axios.get(`http://localhost:3001/order/${email}`);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});
export const {
  addOrder,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  removeAllOrderItem,
  resetState,
} = orderSlice.actions;
export default orderSlice.reducer;
