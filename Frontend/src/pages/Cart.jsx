import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/cartContext";

function Cart() {
  const { cart, cartCount, cartTotal } = useContext(CartContext);
  if (cart.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-600">
            Add some products to your cart to get started.
          </p>

          <Link
            to="/home"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Cart Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Cart Summary
            </h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;