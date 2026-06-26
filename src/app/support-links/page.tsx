"use client";

import {
  getSupportLinks,
  updateSupportLinks,
} from "@/src/services/support-link.service";

import { SupportLink } from "@/src/types/support-link";

import { useEffect, useState } from "react";

export default function SupportLinksPage() {
  const [form, setForm] =
    useState<SupportLink>({
      whatsapp: "",
      phone: "",
      facebook: "",
      instagram: "",
      messenger: "",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data =
        await getSupportLinks();

      if (data) setForm(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res =
        await updateSupportLinks(
          form,
        );

      console.log("UPDATED:", res);

      alert(
        "Support Links Updated Successfully",
      );
    } catch (err: any) {
      console.log(
        "FAILED:",
        err?.response?.data,
      );

      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Support Links
      </h1>

      <div className="space-y-4">

        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="WhatsApp"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Phone"
        />

        <input
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Facebook"
        />

        <input
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Instagram"
        />

        <input
          name="messenger"
          value={form.messenger}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Messenger"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading
            ? "Saving..."
            : "Save"}
        </button>

      </div>

    </div>
  );
}