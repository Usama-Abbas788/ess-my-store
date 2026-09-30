import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import persistantMiddleware from "./persistantMiddleware";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistantMiddleware),
});

export default store;