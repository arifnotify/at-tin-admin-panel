import api from "./api";

export const getOrders =
  async () => {
    const res =
      await api.get(
        "/orders/admin"
      );

    return res.data;
  };

export const getSingleOrder =
  async (id: string) => {
    const res =
      await api.get(
        `/orders/${id}`
      );

    return res.data;
  };

export const updateOrderStatus =
  async (
    id: string,
    orderStatus: string
  ) => {
    const res =
      await api.patch(
        `/orders/${id}/status`,
        {
          orderStatus,
        }
      );

    return res.data;
  };
