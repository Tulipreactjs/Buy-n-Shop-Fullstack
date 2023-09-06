import { instance } from "./connect";

export const getCategories = async () => {
  const res = await instance.get("/api/v1/categories");
  return res;
};

export const getIsFeaturedProducts = async () => {
  const res = await instance.get("/api/v1/products/featured/product");
  return res;
};

export const getProductByCondition = async () => {
  const res = await instance.get("/api/v1/products/condition/");

  return res;
};

export const getProductByCategory = async (categoryName) => {
  const res = await instance.get(`/api/v1/products/${categoryName}`);

  return res;
};

export const getOneProduct = async (slugTitle) => {
  const res = await instance.get(`/api/v1/products/title/${slugTitle}`);

  return res;
};

export const getAllProducts = async () => {
  const res = await instance.get(`/api/v1/products`);

  return res;
};

export const likeProduct = async (productId, userId, token) => {
  const res = await instance.put(`/api/v1/products/${productId}/like`, userId, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

export const disLikeProduct = async (productId, userId, token) => {
  const res = await instance.put(
    `/api/v1/products/${productId}/dislike`,
    userId,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};

export const registerUser = async (username, email, password) => {
  const res = await instance.post("/api/v1/auth/register", {
    username,
    email,
    password,
  });

  return res;
};

export const loginUser = async (username, password) => {
  const res = await instance.post("/api/v1/auth/login", {
    username,
    password,
  });

  return res;
};

/// ORDERS

export const createOrder = async (order, token) => {
  const res = await instance.post("/api/v1/orders/create", order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const getUserOrders = async (token) => {
  const res = await instance.get("/api/v1/orders/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const getAllUserOrders = async (token) => {
  const res = await instance.get("/api/v1/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const getOrderDetail = async (orderId, token) => {
  const res = await instance.get(`/api/v1/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
