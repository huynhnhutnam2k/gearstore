import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "app/url";
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: userInfo,
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.msg = action.payload.message;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const loginAction = createAsyncThunk("user/login", async (user) => {
  try {
    const res = await axios.post(`${url}/user/login`, user);
    if (res) {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      document.location.href = "/";
      return res.data;
    }
  } catch (error) {
    console.log(error.response);
  }
});

export default userSlice.reducer;
