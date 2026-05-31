"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  deleteCategory,
  getCategories,
} from "@/src/services/category.service";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Are you sure you want to delete this category?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteCategory(id);

        alert(
          "Category Deleted Successfully"
        );

        loadCategories();
      } catch (error) {
        console.error(error);
      }
    };

  // MAIN CATEGORIES
  const mainCategories =
    categories.filter(
      (item) =>
        !item.parentCategory
    );

  // SUB CATEGORIES
  const subCategories =
    categories.filter(
      (item) =>
        item.parentCategory
    );

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500">
            Manage Main & Sub Categories
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/categories/main/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            + Main Category
          </Link>

          <Link
            href="/categories/sub/create"
            className="bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            + Sub Category
          </Link>

        </div>

      </div>

      {/* MAIN CATEGORY TABLE */}

      <div className="bg-white shadow rounded-xl p-5 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Main Categories
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {mainCategories.map(
              (item) => (
                <tr
                  key={item._id}
                  className="border-b"
                >
                  <td className="py-4">
                    {item.name}
                  </td>

                  <td className="py-4">

                    <div className="flex gap-3">

                      <Link
                        href={`/categories/main/edit/${item._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* SUB CATEGORY TABLE */}

      <div className="bg-white shadow rounded-xl p-5">

        <h2 className="text-xl font-bold mb-5">
          Sub Categories
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Parent Category
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {subCategories.map(
              (item) => (
                <tr
                  key={item._id}
                  className="border-b"
                >
                  <td className="py-4">
                    {item.name}
                  </td>

                  <td className="py-4">
                    {item
                      .parentCategory
                      ?.name || "-"}
                  </td>

                  <td className="py-4">

                    <div className="flex gap-3">

                      <Link
                        href={`/categories/sub/edit/${item._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

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