import api from "./api";

// 🔥 GET ALL ORDERS (ADMIN)
export const getOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔥 GET SINGLE ORDER
export const getOrder = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔥 UPDATE ORDER STATUS
export const updateOrderStatus = async (
  id: string,
  orderStatus: string
) => {
  const token = localStorage.getItem("token");

  const res = await api.patch(
    `/orders/${id}/status`,
    { orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
