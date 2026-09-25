import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import useProductQuery from "../hooks/useProductQuery";
import useUpdateProductMutation from "../hooks/useUpdateProductMutation";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isPending, isError, error } = useProductQuery(id);
  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateProductMutation();
  const product = response?.data;

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-red-600">
          {error?.message || "Failed to load product."}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleSubmit = (formData) => {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (formData.image) {
      data.append("image", formData.image);
    }
    mutate(
      {
        id,
        formData: data,
      },
      {
        onSuccess: () => {
          navigate("/admin/products");
        },
      },
    );
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>

          <p className="mt-2 text-gray-600">Update the product information.</p>
        </div>

        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isPending={isUpdating}
          error={isUpdateError ? updateError : null}
        />

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="mt-4 w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}

export default EditProduct;
