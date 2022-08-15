import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    sort: "",
    filterPrice: null,
  },
  reducers: {
    newKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    newSort: (state, action) => {
      state.sort = action.payload;
    },
    newFilterPrice: (state, action) => {
      state.filterPrice = action.payload;
    },
  },
});
export const { newKeyword, newSort, newFilterPrice } = searchSlice.actions;
export default searchSlice.reducer;
