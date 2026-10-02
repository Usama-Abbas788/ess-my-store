const persistantMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  if (action.type.startsWith("cart/")) {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart.items),
    );
  }

  return result;
};

export default persistantMiddleware;