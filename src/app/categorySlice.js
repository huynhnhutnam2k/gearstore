import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const res = await axios.get("https://gearstorev2.onrender.com/category");
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default categorySlice.reducer;
