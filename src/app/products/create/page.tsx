"use client";

import { useEffect, useState } from "react";
import {
  getMainCategories,
  getSubCategories,
} from "@/src/services/category.service";

import { Category } from "@/src/types/category";

import { uploadImages } from "@/src/services/upload.service";

import { createProduct } from "@/src/services/product.service";

import {
  ImagePlus,
  Package2,
  Tag,
  Boxes,
  MapPin,
  BadgeDollarSign,
} from "lucide-react";

export default function CreateProductPage() {
  // =========================
  // STATES
  // =========================

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [
    discountPrice,
    setDiscountPrice,
  ] = useState("");

  const [stock, setStock] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [
    mainCategory,
    setMainCategory,
  ] = useState("");

  const [category, setCategory] =
    useState("");

  const [images, setImages] =
    useState<string[]>([]);

  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const [
    subCategories,
    setSubCategories,
  ] = useState<Category[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH MAIN CATEGORIES
  // =========================

  useEffect(() => {
    fetchMainCategories();
  }, []);

  const fetchMainCategories =
    async () => {
      try {
        const data =
          await getMainCategories();

        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

  // =========================
  // FETCH SUBCATEGORIES
  // =========================

  const fetchSubCategories =
    async (
      parentId: string,
    ) => {
      try {
        const data =
          await getSubCategories(
            parentId,
          );

        setSubCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

  // =========================
  // HANDLE MAIN CATEGORY
  // =========================

  const handleMainCategory =
    async (
      e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value =
        e.target.value;

      setMainCategory(value);

      setCategory("");

      setSubCategories([]);

      if (value) {
        await fetchSubCategories(
          value,
        );
      }
    };

  // =========================
  // HANDLE IMAGE UPLOAD
  // =========================

  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const files =
        e.target.files;

      if (!files) return;

      try {
        setLoading(true);

        const res =
          await uploadImages(
            files,
          );

        const imageUrls =
          res.map(
            (item: any) =>
              item.url,
          );

        setImages(imageUrls);
      } catch (err) {
        console.log(err);

        alert(
          "Upload Failed",
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // CREATE PRODUCT
  // =========================

  const handleCreate =
    async () => {
      try {
        setLoading(true);

        await createProduct({
          title,
          description,

          price:
            Number(price),

          discountPrice:
            Number(
              discountPrice,
            ),

          stock:
            Number(stock),

          brand,
          location,
          category,
          images,
        });

        alert(
          "Product Created Successfully",
        );

        window.location.href =
          "/products";
      } catch (err) {
        console.log(err);

        alert(
          "Create Failed",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Create Product
            </h1>

            <p className="text-slate-500 mt-2">
              Add your new product with details
            </p>

          </div>

          <div className="hidden md:flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border">

            <Package2
              size={24}
              className="text-indigo-600"
            />

            <span className="font-semibold text-slate-700">
              Product Panel
            </span>

          </div>

        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* TOP BAR */}
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6">

            <h2 className="text-2xl font-bold text-white">
              Product Information
            </h2>

            <p className="text-indigo-100 mt-1">
              Fill all required fields carefully
            </p>

          </div>

          {/* FORM */}
          <div className="p-8">

            {/* TITLE */}
            <div className="mb-6">

              <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">

                <Tag
                  size={18}
                />

                Product Title

              </label>

              <input
                type="text"
                placeholder="Enter product title"
                className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">

              <label className="block mb-3 text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                placeholder="Write product description..."
                className="w-full p-5 rounded-2xl border border-slate-300 h-[150px] focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* CATEGORY */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              {/* MAIN CATEGORY */}
              <div>

                <label className="block mb-3 text-sm font-semibold text-slate-700">
                  Main Category
                </label>

                <select
                  value={mainCategory}
                  onChange={
                    handleMainCategory
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  <option value="">
                    Select Category
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
                        {item.name}
                      </option>
                    ),
                  )}

                </select>

              </div>

              {/* SUBCATEGORY */}
              <div>

                <label className="block mb-3 text-sm font-semibold text-slate-700">
                  Sub Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value,
                    )
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  <option value="">
                    Select SubCategory
                  </option>

                  {subCategories.map(
                    (item) => (
                      <option
                        key={
                          item._id
                        }
                        value={
                          item.name
                        }
                      >
                        {item.name}
                      </option>
                    ),
                  )}

                </select>

              </div>

            </div>

            {/* PRICE */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">

                  <BadgeDollarSign
                    size={18}
                  />

                  Price

                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block mb-3 text-sm font-semibold text-slate-700">
                  Discount Price
                </label>

                <input
                  type="number"
                  placeholder="Enter discount price"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  value={
                    discountPrice
                  }
                  onChange={(e) =>
                    setDiscountPrice(
                      e.target.value,
                    )
                  }
                />

              </div>

            </div>

            {/* STOCK & BRAND */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">

                  <Boxes
                    size={18}
                  />

                  Stock

                </label>

                <input
                  type="number"
                  placeholder="Stock quantity"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block mb-3 text-sm font-semibold text-slate-700">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Brand name"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  value={brand}
                  onChange={(e) =>
                    setBrand(
                      e.target.value,
                    )
                  }
                />

              </div>

            </div>

            {/* LOCATION */}
            <div className="mb-6">

              <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">

                <MapPin
                  size={18}
                />

                Location

              </label>

              <input
                type="text"
                placeholder="Product location"
                className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-8">

              <label className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-700">

                <ImagePlus
                  size={18}
                />

                Upload Product Images

              </label>

              <label className="border-2 border-dashed border-indigo-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50 transition">

                <ImagePlus
                  size={50}
                  className="text-indigo-500 mb-4"
                />

                <p className="font-semibold text-slate-700">
                  Click to Upload Images
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  PNG, JPG, WEBP Supported
                </p>

                <input
                  type="file"
                  multiple
                  onChange={
                    handleUpload
                  }
                  className="hidden"
                />

              </label>

            </div>

            {/* IMAGE PREVIEW */}
            {images.length >
              0 && (
              <div className="mb-8">

                <h3 className="font-semibold text-slate-700 mb-4">
                  Uploaded Images
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                  {images.map(
                    (image) => (
                      <div
                        key={image}
                        className="relative group overflow-hidden rounded-2xl border bg-slate-100"
                      >

                        <img
                          src={image}
                          alt="product"
                          className="w-full h-[140px] object-cover group-hover:scale-105 transition duration-300"
                        />

                      </div>
                    ),
                  )}

                </div>

              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={
                handleCreate
              }
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : "Create Product"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
