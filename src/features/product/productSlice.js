import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "app/url";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getOneProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getOneProductAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const getAllProductsAction = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const res = await axios.get(`${url}/product`);
      return res?.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);
export const getOneProductAction = createAsyncThunk(
  "product/getOneProduct",
  async (id) => {
    try {
      const res = await axios.get(`${url}/product/${id}`);
      return res?.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export default productSlice.reducer;
