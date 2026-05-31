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

  const [
    parentCategory,
    setParentCategory,
  ] = useState("");

  const [
    mainCategories,
    setMainCategories,
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

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

        setParentCategory(
          category.parentCategory?._id ||
            category.parentCategory ||
            ""
        );

        setMainCategories(
          mains
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        await updateCategory(
          params.id as string,
          {
            name,
            parentCategory,
          }
        );

        alert(
          "Sub Category Updated"
        );

        window.location.href =
          "/categories";
      } catch (error: any) {
        console.log(
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-xl mx-auto p-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-5">
          Edit Sub Category
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <select
          value={
            parentCategory
          }
          onChange={(e) =>
            setParentCategory(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
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
          disabled={
            loading
          }
          className="bg-green-600 text-white px-5 py-3 rounded-lg mt-5"
        >
          {loading
            ? "Updating..."
            : "Update Sub Category"}
        </button>

      </div>

    </div>
  );
}