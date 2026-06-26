import api from "./api";
import { SupportLink } from "../types/support-link";

// GET
export const getSupportLinks = async () => {
  const res = await api.get<SupportLink>(
    "/support-links",
  );

  return res.data;
};

// UPDATE
export const updateSupportLinks = async (
  data: SupportLink,
) => {
  try {
    const res = await api.patch(
      "/support-links",
      data,
    );

    return res.data;
  } catch (error: any) {
    console.log(
      "UPDATE ERROR:",
      error?.response?.data,
    );

    throw error;
  }
};