const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  if (
    action.type.startsWith("cart/")
  ) {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart.items),
    );
  }

  if (
    action.type.startsWith("auth/")
  ) {
    localStorage.setItem(
      "users",
      JSON.stringify(state.auth.users),
    );

    if (state.auth.currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(state.auth.currentUser),
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  return result;
};

export default persistenceMiddleware;