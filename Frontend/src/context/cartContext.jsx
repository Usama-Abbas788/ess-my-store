import { createContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

export const CartContext = createContext();
export function CartProvider({ children }) {
  const [ cart, dispatch ] = useReducer(cartReducer, [], () =>
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.price,0);
  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
