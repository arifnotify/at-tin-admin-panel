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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");

  const [mainCategory, setMainCategory] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const data = await getMainCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMainCategories();
  }, []);

  const fetchSubCategories = async (parentId: string) => {
    try {
      const data = await getSubCategories(parentId);
      setSubCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMainCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMainCategory(value);
    setCategory("");
    setSubCategories([]);
    if (value) await fetchSubCategories(value);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setLoading(true);
      const res = await uploadImages(files);
      const imageUrls = res.map((item: any) => item.url);
      setImages(imageUrls);
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await createProduct({
        title,
        description,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        brand,
        location,
        category,
        images,
      });
      alert("Product Created Successfully");
      window.location.href = "/products";
    } catch (err) {
      console.error(err);
      alert("Create Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            📦
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
            <p className="text-gray-500 mt-1">
              Fill in the details below to add a new product to your inventory.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Product Title */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
              🏷️
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product title"
                className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
              📝
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter product description"
                className="w-full border border-gray-200 rounded-2xl px-5 py-3 h-32 focus:outline-none focus:border-blue-500 resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                📋
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={mainCategory}
                  onChange={handleMainCategory}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                📚
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SubCategory <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select SubCategory</option>
                  {subCategories.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                💰
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="absolute right-5 top-4 text-gray-500 font-medium">USD</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                🏷️
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter discount price"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                  <span className="absolute right-5 top-4 text-gray-500 font-medium">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock & Brand */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                📦
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                🏷️
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  placeholder="Enter brand"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
              📍
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Images */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
              🖼️
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-blue-400 transition">
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  ☁️
                </div>
                <p className="text-gray-600">Drag & drop images here</p>
                <p className="text-gray-400 my-2">or</p>
                <label className="cursor-pointer inline-block border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3 rounded-2xl text-sm font-medium">
                  Choose Files
                  <input type="file" multiple className="hidden" onChange={handleUpload} />
                </label>
                <p className="text-xs text-gray-400 mt-4">JPG, PNG up to 5MB each</p>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-28 h-28 object-cover rounded-2xl border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-12 pt-8 border-t">
          <button className="px-8 py-3 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
            ✕ Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
