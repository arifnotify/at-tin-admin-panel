"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";
import { uploadImage } from "@/src/services/upload.service";
import { createBanner } from "@/src/services/banner.service";



export default function CreateBannerPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [image,
    setImage] =
    useState("");

  const [formData,
    setFormData] =
    useState({
      title: "",
      link: "",
      status: true,
    });

  // IMAGE UPLOAD
  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      const res =
        await uploadImage(
          file,
        );

      setImage(res.url);
    };

  // SUBMIT
  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createBanner({
          ...formData,
          image,
        });

        alert(
          "Banner Created",
        );

        router.push(
          "/banners",
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Create Banner
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-2xl shadow space-y-5"
      >

        <input
          type="text"
          placeholder="Banner Title"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({
              ...formData,
              title:
                e.target
                  .value,
            })
          }
        />

        <input
          type="text"
          placeholder="Link (optional)"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({
              ...formData,
              link:
                e.target
                  .value,
            })
          }
        />

        <input
          type="file"
          onChange={
            handleUpload
          }
        />

        {image && (
          <img
            src={image}
            className="w-full h-[200px] object-cover rounded-xl"
          />
        )}

        <button
          className="bg-black text-white px-6 py-3 rounded-xl"
          disabled={
            loading
          }
        >
          {loading
            ? "Saving..."
            : "Create Banner"}
        </button>

      </form>

    </div>
  );
}