import api from "./api";

// GET ALL ORDERS
export const getOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// GET SINGLE ORDER
export const getOrder = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// UPDATE STATUS
export const updateOrderStatus = async (
  id: string,
  orderStatus: string
) => {
  const token = localStorage.getItem("token");

  const res = await api.patch(
    `/orders/${id}/status`,
    {
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ASSIGN RIDER
export const assignRider = async (
  orderId: string,
  riderId: string
) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    "/orders/assign-rider",
    {
      orderId,
      riderId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// TRACKING
export const getTracking = async (
  orderId: string
) => {
  const res = await api.get(
    `/orders/${orderId}/tracking`
  );

  return res.data;
};