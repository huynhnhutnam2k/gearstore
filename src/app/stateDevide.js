import { createSlice } from "@reduxjs/toolkit";

export const stateDevide = createSlice({
  name: "stateDevide",
  initialState: {
    isMobile: false,
    isCheckedMenu: false,
  },
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsCheckedMenu: (state, action) => {
      state.isCheckedMenu = action.payload;
    },
  },
});

export const { setIsMobile, setIsCheckedMenu } = stateDevide.actions;
export default stateDevide.reducer;
