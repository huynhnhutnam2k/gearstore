import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()
const products = localStorage
  ? JSON.parse(localStorage.getItem("products"))
  : [];
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: products,
    product: null,
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        localStorage &&
          localStorage.setItem("products", JSON.stringify(state.products));
      })
      .addCase(getAllProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getAProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getForCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getForCategory.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const getAllProduct = createAsyncThunk("product/getAll", async () => {
  try {
    const res = await axios.get("http://localhost:3001/product");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${id}`);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getForCategory = createAsyncThunk(
  "product/getForCategory",
  async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product?categoryId=${categoryId}`
      );
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/search",
  async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product/search/${keyword}`
      );
      localStorage &&
        localStorage.setItem("products", JSON.stringify(res.data));
      // document.location.href = `/search/${keyword}`;
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export default productSlice.reducer;
