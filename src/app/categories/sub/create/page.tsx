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

  const [
    parentCategory,
    setParentCategory,
  ] = useState("");

  const [
    categories,
    setCategories,
  ] = useState<any[]>([]);

  useEffect(() => {
    getMainCategories().then(
      setCategories,
    );
  }, []);

  const handleCreate =
    async () => {
      try {
        await createCategory({
          name,
          parentCategory,
        });

        alert(
          "Sub Category Created",
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
        Create Sub Category
      </h1>

      <input
        value={name}
        onChange={(e) =>
          setName(
            e.target.value,
          )
        }
        placeholder="Sub Category"
        className="border p-3 w-full rounded mb-4"
      />

      <select
        value={
          parentCategory
        }
        onChange={(e) =>
          setParentCategory(
            e.target.value,
          )
        }
        className="border p-3 w-full rounded"
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
          ),
        )}
      </select>

      <button
        onClick={
          handleCreate
        }
        className="bg-green-600 text-white px-5 py-3 rounded mt-4"
      >
        Create
      </button>

    </div>
  );
}