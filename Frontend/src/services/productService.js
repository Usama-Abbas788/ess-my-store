import api from "./apiService";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
export const getProducById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post("/products", formData);
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await api.post(
    `/products/${id}?_method=PUT`,
    formData,
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
