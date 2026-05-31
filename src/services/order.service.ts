import api from "./api";

// GET ALL ORDERS
export const getOrders =
  async () => {
    const response =
      await api.get("/orders");

    return response.data;
  };

// GET SINGLE ORDER
export const getOrderById =
  async (id: string) => {
    const response =
      await api.get(
        `/orders/${id}`,
      );

    return response.data;
  };

// UPDATE STATUS
export const updateOrderStatus =
  async (
    id: string,
    status: string,
  ) => {
    const response =
      await api.patch(
        `/orders/${id}/status`,
        {
          status,
        },
      );

    return response.data;
  };