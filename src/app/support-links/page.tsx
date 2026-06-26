"use client";

import { getSupportLinks, updateSupportLinks } from "@/src/services/support-link.service";
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

      if (data) {
        setForm(data);
      }
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

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await updateSupportLinks(
          form,
        );

        alert(
          "Support Links Updated Successfully",
        );
      } catch (err) {
        console.log(err);

        alert(
          "Update Failed",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Support Links
      </h1>

      <div className="space-y-4">

        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={
            handleChange
          }
          placeholder="WhatsApp Link"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={
            handleChange
          }
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="facebook"
          value={form.facebook}
          onChange={
            handleChange
          }
          placeholder="Facebook URL"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="instagram"
          value={form.instagram}
          onChange={
            handleChange
          }
          placeholder="Instagram URL"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="messenger"
          value={form.messenger}
          onChange={
            handleChange
          }
          placeholder="Messenger URL"
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={
            handleSubmit
          }
          disabled={
            loading
          }
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}