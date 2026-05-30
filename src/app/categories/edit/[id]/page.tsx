"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  updateCategory,
} from "@/src/services/category.service";

import api from "@/src/services/api";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [cats, res] = await Promise.all([
      getCategories(),
      api.get(`/categories/${id}`),
    ]);

    setCategories(cats);
    setName(res.data.name);
    setParentId(res.data.parentId || "");
  };

  const handleUpdate = async () => {
    await updateCategory(id as string, {
      name,
      parentId: parentId || null,
    });

    alert("Updated Successfully");
    window.location.href = "/categories";
  };

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-4">
        Edit Category
      </h1>

      {/* NAME */}
      <input
        className="w-full border p-3 mb-4 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* PARENT */}
      <select
        className="w-full border p-3 mb-4 rounded"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      >
        <option value="">Main Category</option>

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
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Category
      </button>

    </div>
  );
}