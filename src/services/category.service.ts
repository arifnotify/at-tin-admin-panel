import api from "./api";

// GET MAIN CATEGORIES
export const getMainCategories =
  async () => {
    const response =
      await api.get(
        "/categories/main",
      );

    return response.data;
  };

// GET SUBCATEGORIES
export const getSubCategories =
  async (
    parentId: string,
  ) => {
    const response =
      await api.get(
        `/categories/subcategories/${parentId}`,
      );

    return response.data;
  };