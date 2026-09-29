import { Link, useNavigate, useParams } from "react-router-dom";
import usePtoductQuery from "../hooks/useProductQuery";
import { useDispatch } from "react-redux";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: response, isPending, isError, error } = usePtoductQuery(id);
  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <h2 className="text-lg font-semibold text-gray-700 sm:text-xl">
          Loading product...
        </h2>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600 sm:text-xl">
            Error: {error?.message || "Unable to load product"}
          </h2>

          <Link
            to="/home"
            className="mt-4 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }
  const product = response?.data;
  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <h2 className="text-lg font-semibold text-gray-700 sm:text-xl">
          Product not found.
        </h2>
      </main>
    );
  }
  const addToCart = () => {
    dispatch({
      type: "ADD TO CART",
      payload: product,
    });
    navigate("/cart");
  };
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Products
        </Link>

        <div className="grid gap-8 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          <div className="flex min-h-80 items-center justify-center rounded-lg bg-gray-100 p-6 sm:min-h-96">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 max-w-full object-contain sm:max-h-96"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              ${product.price}
            </p>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              {product.description}
            </p>

            <p className="mt-6 text-sm font-medium capitalize text-gray-500">
              Category: {product.category}
            </p>

            <button
              onClick={addToCart}
              type="button"
              className="mt-8 w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 sm:w-fit"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
export default ProductDetail;
