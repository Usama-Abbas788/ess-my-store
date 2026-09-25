import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import useCreateProductMutation from "../hooks/useCreateProductMutation";

function AddProduct() {
  const navigate = useNavigate();

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useCreateProductMutation();

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

    mutate(data, {
      onSuccess: () => {
        navigate("/admin/products");
      },
    });
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new product to your store inventory.
          </p>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          isPending={isPending}
          error={isError ? error : null}
        />
      </div>
    </main>
  );
}

export default AddProduct;