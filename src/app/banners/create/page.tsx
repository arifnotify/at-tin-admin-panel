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

  const [title, setTitle] =
    useState("");

  const [image, setImage] =
    useState("");

  const [status, setStatus] =
    useState(true);

  // IMAGE UPLOAD
  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      try {
        const file =
          e.target.files?.[0];

        if (!file) return;

        const res =
          await uploadImage(
            file
          );

        console.log(res);

        setImage(
          res.url
        );
      } catch (error) {
        console.log(error);
      }
    };

  // CREATE
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        console.log({
          title,
          image,
          status,
        });

        await createBanner({
          title,
          image,
          status,
        });

        alert(
          "Banner Created"
        );

        router.push(
          "/banners"
        );
      } catch (error: any) {
        console.log(error);

        console.log(
          error?.response
            ?.data
        );

        alert(
          JSON.stringify(
            error?.response
              ?.data
          )
        );
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
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >

        <input
          type="text"
          placeholder="Banner Title"
          className="w-full border p-3 rounded-xl"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
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
            alt=""
            className="w-full h-[200px] object-cover rounded-xl"
          />
        )}

        <select
          value={
            String(
              status
            )
          }
          onChange={(e) =>
            setStatus(
              e.target.value ===
                "true"
            )
          }
          className="w-full border p-3 rounded-xl"
        >

          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>

        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Creating..."
            : "Create Banner"}
        </button>

      </form>

    </div>
  );
}