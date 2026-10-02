import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import persistantMiddleware from "./persistantMiddleware";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistantMiddleware),
});

export default store;