"use client";

import { useState } from "react";
import { createCategory } from "@/src/services/category.service";

export default function CreateMainCategoryPage() {
  const [name, setName] =
    useState("");

  const handleCreate =
    async () => {
      await createCategory({
        name,
        parentId: null,
      });

      window.location.href =
        "/categories";
    };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Create Main Category
      </h1>

      <input
        className="border p-3 w-full"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleCreate
        }
        className="bg-blue-600 text-white px-5 py-3 mt-4"
      >
        Create
      </button>

    </div>
  );
}