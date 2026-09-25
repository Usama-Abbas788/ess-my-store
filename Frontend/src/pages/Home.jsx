import useProductsQuery from "../hooks/useProductsQuery";
import ProductCard from "../components/ProductCard";
import { useRef } from "react";

function Home() {
  const { data: response, isPending, isError, error } = useProductsQuery();
  const productsSectionRef = useRef(null);
  const products = response?.data || [];

  return (
    <main>
      {/* Static Hero Section */}
      <section className="bg-amber-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Welcome to MyStore
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
            Discover amazing products at great prices. Browse our collection and
            find something you'll love.
          </p>

          <button
            onClick={() =>
              productsSectionRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="cursor-pointer mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            Browse Products
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section
        ref={productsSectionRef}
        className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Our Products
            </h2>

            <p className="mt-2 text-gray-600">Explore our latest collection.</p>
          </div>

          {isPending && (
            <div className="flex min-h-[30vh] items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Loading products...
              </h2>
            </div>
          )}

          {isError && (
            <div className="flex min-h-[30vh] items-center justify-center">
              <h2 className="text-xl font-semibold text-red-600">
                Error: {error?.message || "Unable to load products"}
              </h2>
            </div>
          )}

          {!isPending && !isError && products.length === 0 && (
            <div className="flex min-h-[30vh] items-center justify-center">
              <h2 className="text-lg font-semibold text-gray-700">
                No products found.
              </h2>
            </div>
          )}

          {!isPending && !isError && products.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
