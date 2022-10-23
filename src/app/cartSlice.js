import { createSlice } from "@reduxjs/toolkit";
const cartStore = JSON.parse(localStorage.getItem("cartStore")) || [];
const total = cartStore.reduce((a, b) => a + b.total, 0);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: cartStore,
    total: total,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      localStorage &&
        localStorage.setItem("cartStore", JSON.stringify(state.cart));
      state.total = state.cart.reduce((a, b) => a + b.total, 0);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartStore", JSON.stringify(state.cart));
      state.total = state.cart.reduce((a, b) => a + b.total, 0);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.total = action.payload.reduce((acc, cur) => acc + cur.price, 0);
    },
    updateCart: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.product === action.payload.product) {
          return action.payload;
        }
        return item;
      });
      localStorage.setItem("cartStore", JSON.stringify(state.cart));
      state.total = state.cart.reduce((acc, cur) => acc + cur.total, 0);
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cartStore");
    },
  },
});

export const { addToCart, removeFromCart, setCart, updateCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
