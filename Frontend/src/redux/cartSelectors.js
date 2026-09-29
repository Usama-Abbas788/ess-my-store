export const selectCart = (state) => state.cart;

export const selectCartCount = (state) =>
  state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

export const selectCartTotal = (state) =>
  state.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );