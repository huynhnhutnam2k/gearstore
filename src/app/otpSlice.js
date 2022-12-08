import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const email = localStorage.getItem("email")
  ? localStorage.getItem("email")
  : null;
export const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otp: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isChangeSuccess: false,
    email: email,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(confirmOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(confirmOTP.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(changePassord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassord.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isChangeSuccess = true;
      })
      .addCase(changePassord.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const forgotPassword = createAsyncThunk(
  "otp/getOTP",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://gearstorev2.onrender.com/otp", {
        email: email,
      });
      localStorage && localStorage.setItem("email", email);
      return res?.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmOTP = createAsyncThunk(
  "otp/confirm",
  async (otp, { getState, rejectWithValue }) => {
    try {
      const { email } = getState().otp;
      const body = {
        email,
        otp,
      };
      const res = await axios.post(
        "https://gearstorev2.onrender.com/user/reset",
        body
      );
      return res?.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const changePassord = createAsyncThunk(
  "otp/changePassword",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "https://gearstorev2.onrender.com/user/reset",
        body
      );
      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const { setEmail, reset } = otpSlice.actions;
export default otpSlice.reducer;
