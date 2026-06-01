"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBanner } from "@/src/services/banner.service";
import { uploadImage } from "@/src/services/upload.service";
export default function CreateBannerPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(false);

  // IMAGE UPLOAD
  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);

      console.log("UPLOAD RESPONSE:", res);

      // IMPORTANT FIX (backend key mismatch safe)
      setImage(
        res.url ||
        res.image ||
        res.imageUrl ||
        res.secure_url
      );
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE BANNER
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title,
        image,
        status,
      };

      console.log("FINAL PAYLOAD:", payload);

      const res = await createBanner(payload);

      console.log("CREATE RESPONSE:", res);

      alert("Banner Created Successfully");

      router.push("/banners");
    } catch (err: any) {
      console.log("ERROR:", err?.response?.data || err);
      alert("Create Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Create Banner
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Banner Title"
          className="border p-3 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={handleUpload}
        />

        {image && (
          <img
            src={image}
            className="w-full h-[200px] object-cover"
          />
        )}

        <select
          value={String(status)}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="border p-3 w-full"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3"
        >
          {loading ? "Creating..." : "Create Banner"}
        </button>

      </form>

    </div>
  );
}