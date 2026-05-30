"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
} from "@/src/services/category.service";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleCreate = async () => {
    await createCategory({
      name,
      parentId: parentId || null,
    });

    alert("Category Created");
    window.location.href = "/categories";
  };

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-4">
        Create Category
      </h1>

      {/* NAME */}
      <input
        className="w-full border p-3 mb-4 rounded"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* PARENT */}
      <select
        className="w-full border p-3 mb-4 rounded"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      >
        <option value="">
          Main Category (Optional)
        </option>

        {categories
          .filter((c) => !c.parentId)
          .map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {/* BUTTON */}
      <button
        onClick={handleCreate}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create Category
      </button>

    </div>
  );
}