import http from "./config";

const products = {
  create: (data) => http.post("/product", data),
  get: () => http.get("/products", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete(`/product/${id}`),
  update: (data) => http.put("/product", data),
  getPro: (id) => http.get(`/product/${id}`),
};
export default products;
