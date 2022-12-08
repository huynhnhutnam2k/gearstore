import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: userInfo,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isRegisterSuccess: false,
    isRegisterError: false,
    msg: "",
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage &&
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      document.location.href = "/";
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.msg = "";
    },
    resetPromotion: (state) => {
      state.isRegisterError = false;
      state.isRegisterSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.msg = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userInfo = action.payload.user;
        // state.msg = action.payload.message;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changeInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload;
        state.isSuccess = true;
      })
      .addCase(changeInfo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload;
      })
      .addCase(registerPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegisterSuccess = true;
      })
      .addCase(registerPromotion.rejected, (state) => {
        state.isRegisterError = true;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.msg = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.msg = action.payload;
        state.isLoading = false;
      });
  },
});
export const loginAction = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://gearstorev2.onrender.com/user/login`,
        user
      );
      if (res) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        document.location.href = "/";
        return res.data;
      }
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://gearstorev2.onrender.com/user/register",
        user
      );
      return res?.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "https://gearstorev2.onrender.com/user/logout",
  async () => {
    try {
      localStorage &&
        JSON.parse(localStorage.getItem("userInfo")) &&
        localStorage.removeItem("userInfo");
      document.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeInfo = createAsyncThunk(
  "user/changeInfo",
  async ({ body, token }) => {
    try {
      const res = await axios.put(
        `https://gearstorev2.onrender.com/user/changeInfo`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const registerPromotion = createAsyncThunk(
  "user/registerPromotion",
  async (email) => {
    try {
      const res = await axios.post(
        "https://gearstorev2.onrender.com/user/take",
        {
          email,
        }
      );
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const { login, reset, resetPromotion } = userSlice.actions;
export default userSlice.reducer;
