import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()
const products =
  localStorage && localStorage.getItem("products")
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
  reducers: {
    resetState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.msg = "";
    },
  },
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
        state.isLoading = false;
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
      })
      .addCase(reviewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviewProduct.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.isLoading = false;
      })
      .addCase(reviewProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
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
        `http://localhost:3001/product/search?keyword=${keyword}`
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
export const reviewProduct = createAsyncThunk(
  "product/review",
  async ({ review, id }) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/product/review/" + id,
        review
      );
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const { resetState } = productSlice.actions;
export default productSlice.reducer;
