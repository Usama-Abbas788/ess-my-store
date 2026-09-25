import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE FROM CART",
      payload: {
        id: item.id,
      },
    });
  };

  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE QUANTITY",
      payload: {
        id: item.id,
      },
    });
  };

  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE QUANTITY",
      payload: {
        id: item.id,
      },
    });
  };

  return (
    <article className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 p-4 sm:h-28 sm:w-28 sm:shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="line-clamp-2 font-semibold text-gray-900">
          {item.title}
        </h2>

        <p className="mt-2 font-bold text-gray-900">
          ${item.price}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-6 text-center font-semibold text-gray-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <p className="text-lg font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={removeFromCart}
          className="cursor-pointer w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default CartItem;