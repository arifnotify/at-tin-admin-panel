import api from "./api";

// CREATE PRODUCT
export const createProduct =
  async (data: any) => {
    const response =
      await api.post(
        "/products",
        data,
      );

    return response.data;
  };

// GET PRODUCTS
export const getProducts =
  async () => {
    const response =
      await api.get(
        "/products",
      );

    return response.data;
  };

// DELETE PRODUCT
export const deleteProduct =
  async (id: string) => {
    const response =
      await api.delete(
        `/products/${id}`,
      );

    return response.data;
  };