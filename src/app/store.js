import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import searchReducre from "components/search/searchSlice";
import orderReducer from "./orderSlice";
import stateDevideReducer from "./stateDevide";
import userReducer from "features/users/userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import promotionReducer from "./promotionSlice";
import categoryReducer from "./categorySlice";
import otpReducer from "./otpSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducre,
    order: orderReducer,
    stateDevide: stateDevideReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    promotion: promotionReducer,
    otp: otpReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
