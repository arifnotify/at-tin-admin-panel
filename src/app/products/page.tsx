"use client";

import {   deleteProduct,
  getProducts,} from "@/src/services/product.service";
import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";



interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category?: {
    name: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {
      try {
        const data =
          await getProducts();

        console.log(data);

        setProducts(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete =
    async (id: string) => {
      try {
        await deleteProduct(id);

        setProducts((prev) =>
          prev.filter(
            (product) =>
              product._id !== id,
          ),
        );
      } catch (err) {
        console.log(err);
      }
    };

  // FILTER
  const filteredProducts =
    products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase(),
        ),
    );

  // LOADING
  if (loading) {
    return (
      <div>
        Loading Products...
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Product..."
        className="w-full border p-3 rounded-xl mb-5"
        onChange={(e) =>
          setSearch(
            e.target.value,
          )
        }
      />

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map(
              (product) => (
                <tr
                  key={product._id}
                  className="border-t"
                >

                  {/* IMAGE */}
                  <td className="p-4">

                    <Image
                      src={
                        product
                          .images?.[0] ||
                        "https://via.placeholder.com/60"
                      }
                      alt={
                        product.name
                      }
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />

                  </td>

                  {/* NAME */}
                  <td className="p-4">

                    {product.name}

                  </td>

                  {/* CATEGORY */}
                  <td className="p-4">

                    {product.category
                      ?.name ||
                      "No Category"}

                  </td>

                  {/* PRICE */}
                  <td className="p-4">

                    ${product.price}

                  </td>

                  {/* STOCK */}
                  <td className="p-4">

                    {product.stock}

                  </td>

                  {/* DELETE */}
                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          product._id,
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ),
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}