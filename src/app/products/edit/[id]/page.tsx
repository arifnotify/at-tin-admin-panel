"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getProductById,
  updateProduct,
} from "@/src/services/product.service";

import {
  getMainCategories,
  getSubCategories,
} from "@/src/services/category.service";

import { uploadImages } from "@/src/services/upload.service";

import { Category } from "@/src/types/category";

export default function EditProductPage() {
  const { id } = useParams();

  // SAME STATES AS CREATE
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
  const [pageLoading, setPageLoading] = useState(true);

  // LOAD PRODUCT + CATEGORIES
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [product, mains] = await Promise.all([
        getProductById(id as string),
        getMainCategories(),
      ]);

      setCategories(mains);

      // PREFILL (IMPORTANT)
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setDiscountPrice(product.discountPrice || "");
      setStock(product.stock);
      setBrand(product.brand);
      setLocation(product.location);
      setImages(product.images || []);

      setCategory(product.category?._id);

      if (product.category?.parentId) {
        setMainCategory(product.category.parentId);

        const subs = await getSubCategories(
          product.category.parentId
        );

        setSubCategories(subs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  // MAIN CATEGORY CHANGE
  const handleMainCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setMainCategory(value);
    setCategory("");
    setSubCategories([]);

    if (value) {
      const data = await getSubCategories(value);
      setSubCategories(data);
    }
  };

  // IMAGE UPLOAD (same as create)
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setLoading(true);

      const res = await uploadImages(files);
      const imageUrls = res.map((item: any) => item.url);

      setImages([...images, ...imageUrls]);
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE PRODUCT (ONLY DIFFERENCE FROM CREATE)
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateProduct(id as string, {
        title,
        description,
        price: Number(price),
        discountPrice: Number(discountPrice) || undefined,
        stock: Number(stock),
        brand,
        location,
        category,
        images,
      });

      alert("Product Updated Successfully");
      window.location.href = "/products";
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-10">Loading product...</div>;
  }

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <div className="bg-white rounded-3xl shadow p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">
          Edit Product
        </h1>

        <div className="space-y-7">

          {/* TITLE */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Product Title"
          />

          {/* DESCRIPTION */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-2xl h-32"
            placeholder="Description"
          />

          {/* CATEGORY */}
          <div className="grid grid-cols-2 gap-6">

            <select
              value={mainCategory}
              onChange={handleMainCategory}
              className="w-full border p-3 rounded-2xl"
            >
              <option value="">Main Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-3 rounded-2xl"
            >
              <option value="">Sub Category</option>
              {subCategories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

          </div>

          {/* PRICE */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Price"
          />

          {/* DISCOUNT */}
          <input
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Discount Price"
          />

          {/* STOCK */}
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Stock"
          />

          {/* BRAND */}
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Brand"
          />

          {/* LOCATION */}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-3 rounded-2xl"
            placeholder="Location"
          />

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={handleUpload}
          />

          <div className="flex gap-3 flex-wrap mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 object-cover rounded-xl"
              />
            ))}
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>

      </div>
    </div>
  );
}
