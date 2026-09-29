const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem(
    "cart",
    JSON.stringify(store.getState().cart),
  );

  return result;
};

export default cartMiddleware;