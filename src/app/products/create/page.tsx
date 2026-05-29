"use client";

import { useEffect, useState } from "react";

import {
  getMainCategories,
  getSubCategories,
} from "@/src/services/category.service";

import { Category } from "@/src/types/category";

import { uploadImages } from "@/src/services/upload.service";

import { createProduct } from "@/src/services/product.service";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-100 to-violet-100 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <div className="inline-block bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/40 mb-5">

            <span className="text-pink-600 font-bold tracking-wide">
              ✨ BEAUTIFUL PRODUCT PANEL
            </span>

          </div>

          <h1 className="text-6xl font-black bg-gradient-to-r from-pink-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">

            Create Product

          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Add your amazing product with modern colorful UI
          </p>

        </div>

        {/* MAIN CONTAINER */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            {/* TITLE */}
            <div className="mb-6">

              <label className="block text-sm font-bold text-pink-600 mb-3">
                Product Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                className="w-full h-16 rounded-3xl bg-white border-2 border-pink-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
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

              <label className="block text-sm font-bold text-violet-600 mb-3">
                Description
              </label>

              <textarea
                placeholder="Write beautiful product description..."
                className="w-full h-[180px] rounded-3xl bg-white border-2 border-violet-100 p-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-200 transition resize-none"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* CATEGORY */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">

              <div>

                <label className="block text-sm font-bold text-sky-600 mb-3">
                  Main Category
                </label>

                <select
                  value={mainCategory}
                  onChange={
                    handleMainCategory
                  }
                  className="w-full h-16 rounded-3xl bg-white border-2 border-sky-100 px-6 text-gray-700 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200"
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

              <div>

                <label className="block text-sm font-bold text-orange-500 mb-3">
                  SubCategory
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value,
                    )
                  }
                  className="w-full h-16 rounded-3xl bg-white border-2 border-orange-100 px-6 text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
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
            <div className="grid md:grid-cols-2 gap-5 mb-6">

              <div>

                <label className="block text-sm font-bold text-emerald-600 mb-3">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full h-16 rounded-3xl bg-white border-2 border-emerald-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block text-sm font-bold text-rose-500 mb-3">
                  Discount Price
                </label>

                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full h-16 rounded-3xl bg-white border-2 border-rose-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-200"
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
            <div className="grid md:grid-cols-2 gap-5 mb-6">

              <div>

                <label className="block text-sm font-bold text-indigo-600 mb-3">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Stock quantity"
                  className="w-full h-16 rounded-3xl bg-white border-2 border-indigo-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block text-sm font-bold text-fuchsia-600 mb-3">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Brand name"
                  className="w-full h-16 rounded-3xl bg-white border-2 border-fuchsia-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-200"
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
            <div className="mb-8">

              <label className="block text-sm font-bold text-cyan-600 mb-3">
                Location
              </label>

              <input
                type="text"
                placeholder="Product location"
                className="w-full h-16 rounded-3xl bg-white border-2 border-cyan-100 px-6 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-200"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* BUTTON */}
            <button
              onClick={
                handleCreate
              }
              disabled={loading}
              className="w-full h-16 rounded-3xl bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 text-white text-xl font-black shadow-[0_15px_50px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              {loading
                ? "Creating Product..."
                : "🚀 Create Product"}
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* IMAGE UPLOAD */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

              <h2 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-2">

                Upload Images

              </h2>

              <p className="text-gray-500 mb-6">
                Add beautiful product images
              </p>

              <label className="flex flex-col items-center justify-center rounded-[35px] border-2 border-dashed border-pink-300 bg-gradient-to-br from-pink-50 via-violet-50 to-sky-50 h-[280px] cursor-pointer hover:scale-[1.02] transition overflow-hidden">

                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center text-white text-5xl shadow-2xl mb-5">

                  +

                </div>

                <h3 className="text-2xl font-bold text-gray-700">
                  Upload Files
                </h3>

                <p className="text-gray-500 mt-2">
                  PNG, JPG, WEBP
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

            {/* PREVIEW */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

              <h2 className="text-3xl font-black bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-5">

                Preview

              </h2>

              {images.length ===
              0 ? (
                <div className="h-[250px] rounded-[30px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-gray-500 font-medium">
                  No Images Uploaded
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">

                  {images.map(
                    (image) => (
                      <div
                        key={image}
                        className="overflow-hidden rounded-[25px] bg-white border border-white shadow-lg"
                      >

                        <img
                          src={image}
                          alt="product"
                          className="w-full h-[160px] object-cover hover:scale-110 transition duration-500"
                        />

                      </div>
                    ),
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
