"use client";

import {
  createCategory,
  getMainCategories,
} from "@/src/services/category.service";

import {
  useEffect,
  useState,
} from "react";

export default function CreateSubCategoryPage() {
  const [name, setName] =
    useState("");

  const [parentId, setParentId] =
    useState("");

  const [categories, setCategories] =
    useState<any[]>([]);

  useEffect(() => {
    getMainCategories().then(
      setCategories
    );
  }, []);

  const handleCreate =
    async () => {
      await createCategory({
        name,
        parentId,
      });

      window.location.href =
        "/categories";
    };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Create Sub Category
      </h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Sub Category"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <select
        className="border p-3 w-full"
        value={parentId}
        onChange={(e) =>
          setParentId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Main Category
        </option>

        {categories.map(
          (item) => (
            <option
              key={
                item._id
              }
              value={
                item._id
              }
            >
              {
                item.name
              }
            </option>
          )
        )}
      </select>

      <button
        onClick={
          handleCreate
        }
        className="bg-green-600 text-white px-5 py-3 mt-4"
      >
        Create
      </button>

    </div>
  );
}