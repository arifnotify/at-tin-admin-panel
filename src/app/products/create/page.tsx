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
  PackageCheck,
  Tag,
  Layers3,
  Boxes,
  MapPin,
  DollarSign,
  Sparkles,
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-5">

          <div>

            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-sm mb-4">

              <Sparkles size={16} />

              Premium Product Panel

            </div>

            <h1 className="text-5xl font-black text-white leading-tight">
              Create New Product
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Add your products with beautiful details & images
            </p>

          </div>

          <div className="hidden lg:flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/30">

            <PackageCheck
              size={50}
              className="text-white"
            />

          </div>

        </div>

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

          {/* Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px]" />

          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/20 blur-[120px]" />

          {/* HEADER */}
          <div className="relative border-b border-white/10 p-8">

            <h2 className="text-3xl font-bold text-white">
              Product Information
            </h2>

            <p className="text-slate-400 mt-2">
              Fill all product details carefully
            </p>

          </div>

          {/* FORM */}
          <div className="relative p-8 md:p-10">

            {/* TITLE */}
            <div className="mb-7">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">

                <Tag size={18} />

                Product Title

              </label>

              <input
                type="text"
                placeholder="Enter product title..."
                className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mb-7">

              <label className="text-sm font-semibold text-slate-300 mb-3 block">
                Description
              </label>

              <textarea
                placeholder="Write amazing product description..."
                className="w-full h-[160px] rounded-2xl bg-white/5 border border-white/10 p-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all resize-none"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
              />

            </div>

            {/* CATEGORY */}
            <div className="grid md:grid-cols-2 gap-6 mb-7">

              {/* MAIN CATEGORY */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">

                  <Layers3 size={18} />

                  Main Category

                </label>

                <select
                  value={mainCategory}
                  onChange={
                    handleMainCategory
                  }
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
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

              {/* SUBCATEGORY */}
              <div>

                <label className="text-sm font-semibold text-slate-300 mb-3 block">
                  Sub Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value,
                    )
                  }
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
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
            <div className="grid md:grid-cols-2 gap-6 mb-7">

              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">

                  <DollarSign
                    size={18}
                  />

                  Price

                </label>

                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="text-sm font-semibold text-slate-300 mb-3 block">
                  Discount Price
                </label>

                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
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
            <div className="grid md:grid-cols-2 gap-6 mb-7">

              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">

                  <Boxes size={18} />

                  Stock

                </label>

                <input
                  type="number"
                  placeholder="Stock amount"
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value,
                    )
                  }
                />

              </div>

              <div>

                <label className="text-sm font-semibold text-slate-300 mb-3 block">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Brand name"
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
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
            <div className="mb-7">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">

                <MapPin size={18} />

                Location

              </label>

              <input
                type="text"
                placeholder="Product location"
                className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
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

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-4">

                <ImagePlus
                  size={18}
                />

                Upload Images

              </label>

              <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-cyan-400/30 rounded-[30px] p-12 cursor-pointer bg-gradient-to-br from-cyan-500/5 to-blue-500/5 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all overflow-hidden">

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-cyan-500/5" />

                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 mb-5">

                  <ImagePlus
                    size={38}
                    className="text-white"
                  />

                </div>

                <h3 className="text-white font-bold text-xl">
                  Click to Upload
                </h3>

                <p className="text-slate-400 mt-2 text-center">
                  PNG, JPG, WEBP supported
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
              <div className="mb-10">

                <h3 className="text-white font-bold text-xl mb-5">
                  Uploaded Images
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

                  {images.map(
                    (image) => (
                      <div
                        key={image}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                      >

                        <img
                          src={image}
                          alt="product"
                          className="w-full h-[180px] object-cover group-hover:scale-110 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />

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
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white text-lg font-bold shadow-[0_15px_40px_rgba(6,182,212,0.4)] hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : "🚀 Create Product"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
