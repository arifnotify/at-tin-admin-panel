import api from "./api";

export const getCoupons =
  async () => {
    const res =
      await api.get(
        "/coupons/admin",
      );

    return res.data;
  };