import api from "./api";

// MAIN CATEGORIES
export const getMainCategories =
  async () => {
    const response =
      await api.get(
        "/categories/main",
      );

    return response.data;
  };

// SUBCATEGORIES
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