import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        className="flex h-56 items-center justify-center bg-gray-100 p-6 sm:h-64"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full max-w-full object-contain transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
          {product.title}
        </h2>

        <div className="mt-auto pt-4">
          <p className="text-xl font-bold text-gray-900">
            ${product.price}
          </p>

          <Link
            to={`/products/${product.id}`}
            className="mt-4 block rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;