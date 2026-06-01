import api from "./api";

// ALL USERS
export const getUsers =
  async () => {
    const response =
      await api.get("/users");

    return response.data;
  };

// SINGLE USER
export const getUserById =
  async (id: string) => {
    const response =
      await api.get(
        `/users/${id}`,
      );

    return response.data;
  };

// BLOCK USER
export const blockUser =
  async (id: string) => {
    const response =
      await api.patch(
        `/users/${id}/block`,
      );

    return response.data;
  };

// UNBLOCK USER
export const unblockUser =
  async (id: string) => {
    const response =
      await api.patch(
        `/users/${id}/unblock`,
      );

    return response.data;
  };