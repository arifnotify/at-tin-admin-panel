import api from "./api";

export const getOrders = () =>
  api.get("/orders").then((res) => res.data);

export const getOrder = (id: string) =>
  api.get(`/orders/${id}`).then((res) => res.data);

export const updateStatus = (id: string, data: any) =>
  api.patch(`/orders/${id}/status`, data);
