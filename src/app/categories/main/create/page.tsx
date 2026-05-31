"use client";

import { useState } from "react";
import { createCategory } from "@/src/services/category.service";

export default function CreateMainCategoryPage() {
  const [name, setName] =
    useState("");

  const handleCreate =
    async () => {
      try {
        await createCategory({
          name,
          parentCategory: null,
        });

        alert(
          "Category Created",
        );

        window.location.href =
          "/categories";
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Create Main Category
      </h1>

      <input
        value={name}
        onChange={(e) =>
          setName(
            e.target.value,
          )
        }
        placeholder="Category Name"
        className="border p-3 w-full rounded"
      />

      <button
        onClick={
          handleCreate
        }
        className="bg-blue-600 text-white px-5 py-3 rounded mt-4"
      >
        Create
      </button>

    </div>
  );
}