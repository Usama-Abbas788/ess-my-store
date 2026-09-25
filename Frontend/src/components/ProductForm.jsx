import { useState } from "react";

const categories = [
  "electronics",
  "jewelry",
  "men's clothing",
  "women's clothing",
];

function ProductForm({
  product = null,
  onSubmit,
  isPending = false,
  error = null,
}) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    image: null,
    stock: product?.stock || "",
  });

  const [imagePreview, setImagePreview] = useState(
    product?.image || "",
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm sm:p-8"
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error?.response?.data?.message ||
            "Something went wrong."}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="5"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Stock
          </label>

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-gray-900"
          required
        >
          <option value="">Select a category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Image
        </label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-700"
        />

        {imagePreview && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Image Preview
            </p>

            <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 p-3">
              <img
                src={imagePreview}
                alt={formData.title || "Product preview"}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? product
            ? "Updating Product..."
            : "Adding Product..."
          : product
            ? "Update Product"
            : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;