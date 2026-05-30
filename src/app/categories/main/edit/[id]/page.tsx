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

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory =
    async () => {
      try {
        const data =
          await getCategory(
            params.id as string
          );

        setName(data.name);
      } catch (error) {
        console.error(error);
      }
    };

  const handleUpdate =
    async () => {
      try {
        await updateCategory(
          params.id as string,
          {
            name,
            parentId: null,
          }
        );

        alert(
          "Main Category Updated"
        );

        window.location.href =
          "/categories";
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="max-w-xl mx-auto p-6">

      <div className="bg-white shadow rounded-xl p-6">

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
          className="w-full border p-3 rounded"
          placeholder="Category Name"
        />

        <button
          onClick={
            handleUpdate
          }
          className="bg-blue-600 text-white px-5 py-3 rounded mt-5"
        >
          Update Category
        </button>

      </div>

    </div>
  );
}