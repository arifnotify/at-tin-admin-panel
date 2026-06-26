import { SupportLink } from "../types/support-link";
import api from "./api";

export const getSupportLinks = async () => {
  const response = await api.get<SupportLink>(
    "/support-links",
  );

  return response.data;
};

export const updateSupportLinks = async (
  data: SupportLink,
) => {
  const response = await api.post(
    "/support-links/admin/update",
    data,
  );

  return response.data;
};