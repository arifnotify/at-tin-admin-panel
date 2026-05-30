"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  deleteCategory,
} from "@/src/services/category.service";

import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    await deleteCategory(id);
    loadCategories();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Categories
        </h1>

        <Link
          href="/categories/create"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + Create Category
        </Link>
      </div>

      {/* TABLE */}
      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">

              <td className="p-3">
                {cat.name}
              </td>

              <td className="p-3">
                {cat.parentId
                  ? "Sub Category"
                  : "Main Category"}
              </td>

              <td className="p-3 flex gap-2">

                <Link
                  href={`/categories/edit/${cat._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}