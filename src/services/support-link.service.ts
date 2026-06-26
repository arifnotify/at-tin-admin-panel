import { SupportLink } from "../types/support-link";
import api from "./api";

// ==========================
// GET SUPPORT LINKS
// ==========================
export const getSupportLinks =
  async () => {
    const response =
      await api.get<SupportLink>(
        "/support-links",
      );

    return response.data;
  };

// ==========================
// UPDATE SUPPORT LINKS
// ==========================
export const updateSupportLinks =
  async (
    data: SupportLink,
  ) => {
    const response =
      await api.patch(
        "/support-links",
        data,
      );

    return response.data;
  };