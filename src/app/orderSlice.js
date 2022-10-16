import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./url";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orderItem: [],
    addSuccess: false,
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    changePayment: (state, action) => {
      state.order = action.payload;
    },
    addOrderItem: (state, action) => {
      state.orderItem = [...state.orderItem, action.payload];
      localStorage &&
        localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
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
        state.msg = action.payload?.message;
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload.message;
      });
  },
});
export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async (order, token) => {
    try {
      const res = await axios.post(
        `${url}/order`,
        order
        // {
        //   headers: {
        //     token: `Bearer ${token}`,
        //     " Content-type": "application/json",
        //   },
        // }
      );
      return res?.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);
export const { addOrder, changePayment, addOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
