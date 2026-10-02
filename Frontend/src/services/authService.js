import api from "./apiService";

export const register = async (userData) => {
  const response = await api.post("/register", userData);

  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);

  return response.data;
};
export const getUser = async () => {
  const response = await api.get("/user");

  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", {
    email,
  });

  return response.data;
};
export const resetPassword = async (resetData) => {
  const response = await api.post("/reset-password", resetData);

  return response.data;
};
export const logout = async () => {
  const response = await api.post("/logout");

  return response.data;
};
export const refreshToken = async () => {
  const response = await api.post("/refresh");

  return response.data;
};