"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {   getProductById,
  updateProduct, } from "@/src/services/product.service";
import {   getMainCategories,
  getSubCategories, } from "@/src/services/category.service";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  // FORM STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState<string[]>([]);

  // CATEGORY STATES
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [category, setCategory] = useState(""); // subcategory

  // LOADING
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // LOAD DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [product, mains] = await Promise.all([
        getProductById(id),
        getMainCategories(),
      ]);

      setMainCategories(mains);

      // PREFILL PRODUCT
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImages(product.images);

      // category mapping
      setCategory(product.category?._id);

      // if product has main category
      if (product.category?.parentId) {
        setSelectedMain(product.category.parentId);

        const subs = await getSubCategories(
          product.category.parentId
        );

        setSubCategories(subs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // MAIN CATEGORY CHANGE
  const handleMainChange = async (id: string) => {
    setSelectedMain(id);

    const subs = await getSubCategories(id);
    setSubCategories(subs);

    setCategory(""); // reset subcategory
  };

  // IMAGE UPLOAD
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setSaving(true);

      const uploaded: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const res = await uploadImage(files[i]);
        uploaded.push(res.url);
      }

      setImages([...images, ...uploaded]);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // REMOVE IMAGE
  const removeImage = (img: string) => {
    setImages(images.filter((i) => i !== img));
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateProduct(id, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category, // subcategory id
        images,
      });

      alert("Product updated successfully");

      window.location.href = "/products";
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">

        {/* NAME */}
        <input
          className="w-full border p-3 rounded-xl mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="w-full border p-3 rounded-xl mb-4 h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* PRICE */}
        <input
          type="number"
          className="w-full border p-3 rounded-xl mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* STOCK */}
        <input
          type="number"
          className="w-full border p-3 rounded-xl mb-4"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {/* MAIN CATEGORY */}
        <select
          className="w-full border p-3 rounded-xl mb-4"
          value={selectedMain}
          onChange={(e) => handleMainChange(e.target.value)}
        >
          <option value="">Select Main Category</option>

          {mainCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SUB CATEGORY */}
        <select
          className="w-full border p-3 rounded-xl mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>

          {subCategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          multiple
          className="mb-4"
          onChange={handleUpload}
        />

        {/* IMAGE PREVIEW */}
        <div className="flex gap-3 flex-wrap mb-6">

          {images.map((img) => (
            <div key={img} className="relative">

              <img
                src={img}
                className="w-[100px] h-[100px] object-cover rounded-xl"
              />

              <button
                onClick={() => removeImage(img)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2"
              >
                X
              </button>

            </div>
          ))}

        </div>

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {saving ? "Updating..." : "Update Product"}
        </button>

      </div>

    </div>
  );
}

function uploadImage(arg0: File) {
    throw new Error("Function not implemented.");
}
