export const selectCart = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );