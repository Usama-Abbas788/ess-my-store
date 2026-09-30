const persistantMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  localStorage.setItem(
    "cart",
    JSON.stringify(state.cart.items),
  );

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

  return result;
};

export default persistantMiddleware;