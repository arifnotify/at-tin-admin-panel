"use client";

import {
  useEffect,
  useState,
} from "react";


import {   getMainCategories,
  getSubCategories, } from "@/src/services/category.service";
import { Category } from "@/src/types/category";
import { uploadImage } from "@/src/services/upload.service";
import { createProduct } from "@/src/services/product.service";

export default function CreateProductPage() {
  // STATES
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
    category,
    setCategory,
  ] = useState("");

  const [
    mainCategory,
    setMainCategory,
  ] = useState("");

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

  // FETCH MAIN CATEGORIES
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

  // FETCH SUBCATEGORIES
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

  // CATEGORY CHANGE
  const handleMainCategory =
    async (
      e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value =
        e.target.value;

      setMainCategory(value);

      await fetchSubCategories(
        value,
      );
    };

  // IMAGE UPLOAD
  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const files =
        e.target.files;

      if (!files) return;

      try {
        setLoading(true);

        const uploadedImages: string[] =
          [];

        for (
          let i = 0;
          i < files.length;
          i++
        ) {
          const res =
            await uploadImage(
              files[i],
            );

          uploadedImages.push(
            res.url,
          );
        }

        setImages(
          uploadedImages,
        );
      } catch (err) {
        console.log(err);

        alert(
          "Upload Failed",
        );
      } finally {
        setLoading(false);
      }
    };

  // CREATE PRODUCT
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
          "Product Created",
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
    <div className="max-w-5xl">

      <h1 className="text-3xl font-bold mb-6">
        Create Product
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">

        {/* TITLE */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Product Title
          </label>

          <input
            type="text"
            placeholder="Product title"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setTitle(
                e.target.value,
              )
            }
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-xl h-[120px]"
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
          />

        </div>

        {/* CATEGORY */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* MAIN CATEGORY */}
          <div>

            <label className="block mb-2 font-medium">
              Main Category
            </label>

            <select
              className="w-full border p-3 rounded-xl"
              onChange={
                handleMainCategory
              }
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

            <label className="block mb-2 font-medium">
              SubCategory
            </label>

            <select
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setCategory(
                  e.target.value,
                )
              }
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
                      item._id
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
        <div className="grid grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              placeholder="Price"
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setPrice(
                  e.target.value,
                )
              }
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Discount Price
            </label>

            <input
              type="number"
              placeholder="Discount Price"
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setDiscountPrice(
                  e.target.value,
                )
              }
            />

          </div>

        </div>

        {/* STOCK */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block mb-2 font-medium">
              Stock
            </label>

            <input
              type="number"
              placeholder="Stock"
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setStock(
                  e.target.value,
                )
              }
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Brand
            </label>

            <input
              type="text"
              placeholder="Brand"
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setBrand(
                  e.target.value,
                )
              }
            />

          </div>

        </div>

        {/* LOCATION */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Location
          </label>

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setLocation(
                e.target.value,
              )
            }
          />

        </div>

        {/* IMAGE */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Upload Images
          </label>

          <input
            type="file"
            multiple
            onChange={
              handleUpload
            }
          />

        </div>

        {/* IMAGE PREVIEW */}
        <div className="flex gap-3 flex-wrap mb-6">

          {images.map(
            (image) => (
              <img
                key={image}
                src={image}
                alt="product"
                className="w-[100px] h-[100px] object-cover rounded-xl"
              />
            ),
          )}

        </div>

        {/* BUTTON */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Create Product"}
        </button>

      </div>

    </div>
  );
}