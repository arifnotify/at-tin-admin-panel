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
  data: { orderStatus: string }
) => {
  const token = localStorage.getItem("token");

  const res = await api.patch(
    `/orders/${id}/status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
