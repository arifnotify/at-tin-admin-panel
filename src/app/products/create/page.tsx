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
    <div className="min-h-screen bg-[#07111f] py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="mb-10">

          <h1 className="text-5xl font-black text-white">
            Create Product
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Add your product details with premium dashboard UI
          </p>

        </div>

        {/* MAIN WRAPPER */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-[#0d1728] border border-white/10 rounded-[35px] p-8 shadow-2xl">

            {/* TITLE */}
            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Product Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition"
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

              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Description
              </label>

              <textarea
                placeholder="Write product description..."
                className="w-full h-[160px] rounded-2xl bg-[#111c31] border border-white/10 p-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition resize-none"
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

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Main Category
                </label>

                <select
                  value={mainCategory}
                  onChange={
                    handleMainCategory
                  }
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option className="text-black" value="">
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
                        className="text-black"
                      >
                        {item.name}
                      </option>
                    ),
                  )}

                </select>

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  SubCategory
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value,
                    )
                  }
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option className="text-black" value="">
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
                        className="text-black"
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

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Discount Price
                </label>

                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
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

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Stock quantity"
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Brand name"
                  className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
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

              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Location
              </label>

              <input
                type="text"
                placeholder="Product location"
                className="w-full h-14 rounded-2xl bg-[#111c31] border border-white/10 px-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
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
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold text-lg hover:scale-[1.01] transition-all duration-300 shadow-[0_10px_40px_rgba(6,182,212,0.35)]"
            >
              {loading
                ? "Creating..."
                : "Create Product"}
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* IMAGE UPLOAD CARD */}
            <div className="bg-[#0d1728] border border-white/10 rounded-[35px] p-6 shadow-2xl">

              <h2 className="text-2xl font-bold text-white mb-2">
                Product Images
              </h2>

              <p className="text-gray-400 mb-6">
                Upload high quality product images
              </p>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 rounded-[30px] h-[250px] cursor-pointer bg-[#111c31] hover:border-cyan-400 transition overflow-hidden">

                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl text-white shadow-xl mb-5">
                  +
                </div>

                <h3 className="text-white font-bold text-lg">
                  Upload Images
                </h3>

                <p className="text-gray-400 mt-2 text-sm">
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

            {/* PREVIEW */}
            <div className="bg-[#0d1728] border border-white/10 rounded-[35px] p-6 shadow-2xl">

              <h2 className="text-2xl font-bold text-white mb-5">
                Preview Images
              </h2>

              {images.length ===
              0 ? (
                <div className="h-[250px] rounded-3xl bg-[#111c31] flex items-center justify-center text-gray-500">
                  No Images Uploaded
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">

                  {images.map(
                    (image) => (
                      <div
                        key={image}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#111c31]"
                      >

                        <img
                          src={image}
                          alt="product"
                          className="w-full h-[150px] object-cover hover:scale-110 transition duration-500"
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
