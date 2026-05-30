"use client";

import {
  getCategory,
  getMainCategories,
  updateCategory,
} from "@/src/services/category.service";

import { useParams } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

export default function EditSubCategoryPage() {
  const params =
    useParams();

  const [name, setName] =
    useState("");

  const [parentId, setParentId] =
    useState("");

  const [mainCategories,
    setMainCategories] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const [
          category,
          mains,
        ] = await Promise.all([
          getCategory(
            params.id as string
          ),
          getMainCategories(),
        ]);

        setName(
          category.name
        );

        setParentId(
          category.parentId
        );

        setMainCategories(
          mains
        );

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
            parentId,
          }
        );

        alert(
          "Sub Category Updated"
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
          Edit Sub Category
        </h1>

        {/* Name */}

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
          placeholder="Sub Category Name"
        />

        {/* Parent */}

        <select
          value={parentId}
          onChange={(e) =>
            setParentId(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        >

          <option value="">
            Select Main Category
          </option>

          {mainCategories.map(
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
            handleUpdate
          }
          className="bg-green-600 text-white px-5 py-3 rounded mt-5"
        >
          Update Sub Category
        </button>

      </div>

    </div>
  );
}