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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="text-3xl">📦</div>
          <div>
            <h1 className="text-3xl font-bold">Create Product</h1>
            <p className="text-gray-600 mt-1 text-[15px]">
              Fill in the details below to add a new product to your inventory.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Product Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🏷️</span>
              <label className="font-medium">Product Title <span className="text-red-500">*</span></label>
            </div>
            <input
              type="text"
              placeholder="Enter product title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📝</span>
              <label className="font-medium">Description <span className="text-red-500">*</span></label>
            </div>
            <textarea
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Main Category */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📋</span>
              <label className="font-medium">Main Category <span className="text-red-500">*</span></label>
            </div>
            <select
              value={mainCategory}
              onChange={handleMainCategory}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📚</span>
              <label className="font-medium">SubCategory <span className="text-red-500">*</span></label>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select SubCategory</option>
              {subCategories.map((item) => (
                <option key={item._id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">💰</span>
              <label className="font-medium">Price <span className="text-red-500">*</span></label>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter price"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-3 flex items-center">USD</span>
            </div>
          </div>

          {/* Discount Price */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🏷️</span>
              <label className="font-medium">Discount Price</label>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter discount price"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
              <span className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-3 flex items-center">USD</span>
            </div>
          </div>

          {/* Stock */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📦</span>
              <label className="font-medium">Stock</label>
            </div>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🏷️</span>
              <label className="font-medium">Brand</label>
            </div>
            <input
              type="text"
              placeholder="Enter brand"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">📍</span>
              <label className="font-medium">Location</label>
            </div>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Upload Images */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🖼️</span>
              <label className="font-medium">Upload Images</label>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">☁️</div>
              <p className="text-gray-600">Drag & drop images here</p>
              <p className="text-gray-400 my-2">or</p>
              <label className="cursor-pointer inline-block bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg font-medium">
                Choose Files
                <input type="file" multiple className="hidden" onChange={handleUpload} />
              </label>
              <p className="text-xs text-gray-400 mt-4">JPG, PNG up to 5MB each</p>
            </div>

            {images.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, i) => (
                  <img key={i} src={img} className="w-20 h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-10">
          <button className="flex-1 py-3.5 border border-gray-300 rounded-xl text-gray-700 font-medium">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-medium"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
