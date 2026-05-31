"use client";

import {
  getCategory,
  updateCategory,
} from "@/src/services/category.service";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMainCategoryPage() {
  const params = useParams();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory =
    async () => {
      try {
        const data =
          await getCategory(
            params.id as string
          );

        setName(data.name);
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        await updateCategory(
          params.id as string,
          {
            name,
            parentCategory: null,
          }
        );

        alert(
          "Main Category Updated"
        );

        window.location.href =
          "/categories";
      } catch (error: any) {
        console.log(
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-xl mx-auto p-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-5">
          Edit Main Category
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={
            handleUpdate
          }
          disabled={
            loading
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-5"
        >
          {loading
            ? "Updating..."
            : "Update Category"}
        </button>

      </div>

    </div>
  );
}