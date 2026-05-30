"use client";

import Link from "next/link";
import {
  deleteCategory,
  getCategories,
} from "@/src/services/category.service";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      const data =
        await getCategories();

      setCategories(data);
    };

  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Delete Category?"
        );

      if (!confirmDelete) return;

      await deleteCategory(id);

      loadCategories();
    };

  const mainCategories =
    categories.filter(
      (item) =>
        !item.parentId
    );

  const subCategories =
    categories.filter(
      (item) =>
        item.parentId
    );

  return (
    <div className="p-6">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <div className="flex gap-3">

          <Link
            href="/categories/main/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Main Category
          </Link>

          <Link
            href="/categories/sub/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Sub Category
          </Link>

        </div>

      </div>

      {/* MAIN */}

      <div className="bg-white rounded-xl shadow p-5 mb-10">

        <h2 className="text-xl font-bold mb-4">
          Main Categories
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th>Name</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {mainCategories.map(
              (item) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {
                      item.name
                    }
                  </td>

                  <td className="flex gap-3">

                    <Link
                      href={`/categories/main/edit/${item._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* SUB */}

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-4">
          Sub Categories
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th>Name</th>

              <th>Parent</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {subCategories.map(
              (item) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {
                      item.name
                    }
                  </td>

                  <td>
                    {
                      item.parentId
                    }
                  </td>

                  <td className="flex gap-3">

                    <Link
                      href={`/categories/sub/edit/${item._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}