const initialCart = ()=>{
  const savedCart = localStorage.getItem('cart');
  return savedCart? JSON.parse(savedCart) : [];
}
const initialState = initialCart();
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD TO CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        },
      ];
    }
    case "INCREASE QUANTITY": {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    }
    case "DECREASE QUANTITY": {
      return state
        .map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }
    case "REMOVE FROM CART": {
      return state.filter((item) => item.id !== action.payload.id);
    }
    default:
      return state;
  }
}
export default cartReducer;
