import { useNavigate } from "react-router-dom";
import useProductsQuery from "../hooks/useProductsQuery";
import useDeleteProductMutation from "../hooks/useDeleteProductMutation";
import { useState } from "react";
import Dialog from "../components/Dialogue";

function AdminProducts() {
  const { data: response, isPending, isError, error } = useProductsQuery();
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteProductMutation();
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const products = response?.data || [];
  const handleDelete = (id) => {
    setDeletedProductId(id);

    deleteProduct(id, {
      onSuccess: () => {
        setDeletedProductId(null);
        setShowDialog(true);
      },
      onError: () => {
        setDeletedProductId(null);
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-red-600">
          {error?.message || "Failed to load products."}
        </p>
      </div>
    );
  }

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Products</h1>

          <p className="mt-2 text-gray-600">
            Manage the products in your store.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Your store is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-600">
              There are no products in your store yet. Add your first product to
              start building your inventory.
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/products/add")}
              className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <button
              type="button"
              onClick={() => navigate("/admin/products/add")}
              className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Add more products
            </button>
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 object-contain"
                        />

                        <span className="max-w-xs text-sm font-medium text-gray-900">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${product.price}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/products/${product.id}/edit`)
                          }
                          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          disabled={
                            isDeleting && deletedProductId === product.id
                          }
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting && deletedProductId === product.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Dialog
        isOpen={showDialog}
        title="Product Deleted"
        message="The product has been deleted successfully."
        onClose={() => setShowDialog(false)}
      />
    </main>
  );
}

export default AdminProducts;
