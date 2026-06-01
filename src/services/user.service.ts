import api from "./api";

// GET USERS
export const getUsers =
  async () => {
    const response =
      await api.get("/users");

    return response.data;
  };

// BLOCK USER
export const blockUser =
  async (
    phone: string,
    reason: string,
  ) => {
    const response =
      await api.patch(
        "/users/block",
        {
          phone,
          reason,
        },
      );

    return response.data;
  };

// UNBLOCK USER
export const unblockUser =
  async (
    phone: string,
  ) => {
    const response =
      await api.patch(
        "/users/unblock",
        {
          phone,
        },
      );

    return response.data;
  };