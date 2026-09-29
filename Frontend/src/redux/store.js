import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "../reducers/cartReducer";
import loggerMiddleware from "./loggerMiddleware";
import cartMiddleware from "./cartMiddleware";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer,applyMiddleware(loggerMiddleware,cartMiddleware));

export default store;