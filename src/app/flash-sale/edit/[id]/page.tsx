"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getProducts } from "@/src/services/product.service";

import {
  getFlashSaleById,
  updateFlashSale,
} from "@/src/services/flash-sale.service";

export default function EditFlashSalePage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [allProducts, setAllProducts] = useState<any[]>([]);

  const [selectedProducts, setSelectedProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [isActive, setIsActive] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sale, products] =
        await Promise.all([
          getFlashSaleById(
            params.id as string,
          ),
          getProducts(),
        ]);

      setAllProducts(products);

      setTitle(sale.title);

      setStartTime(
        new Date(sale.startTime)
          .toISOString()
          .slice(0, 16),
      );

      setEndTime(
        new Date(sale.endTime)
          .toISOString()
          .slice(0, 16),
      );

      setIsActive(sale.isActive);

      setSelectedProducts(
        sale.products.map(
          (item: any) => ({
            product:
              item.product._id ||
              item.product,

            productData:
              item.product,

            salePrice:
              item.salePrice,

            oldPrice:
              item.oldPrice,
          }),
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (
    productId: string,
  ) => {
    setSelectedProducts(
      selectedProducts.filter(
        (item) =>
          item.product !==
          productId,
      ),
    );
  };

  const addProduct = (
    product: any,
  ) => {
    const exists =
      selectedProducts.find(
        (item) =>
          item.product ===
          product._id,
      );

    if (exists) {
      alert(
        "Product already added",
      );
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      {
        product:
          product._id,

        productData:
          product,

        salePrice:
          product.price,

        oldPrice:
          product.price,
      },
    ]);
  };

  const updateSalePrice = (
    productId: string,
    value: number,
  ) => {
    setSelectedProducts(
      selectedProducts.map(
        (item) =>
          item.product ===
          productId
            ? {
                ...item,
                salePrice: value,
              }
            : item,
      ),
    );
  };

  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        const payload = {
          title,
          startTime,
          endTime,
          isActive,

          products:
            selectedProducts.map(
              (item) => ({
                product:
                  item.product,

                salePrice:
                  Number(
                    item.salePrice,
                  ),
              }),
            ),
        };

        await updateFlashSale(
          params.id as string,
          payload,
        );

        alert(
          "Flash Sale Updated",
        );

        router.push(
          "/flash-sale",
        );
      } catch (error: any) {
        console.log(error);

        alert(
          error?.response
            ?.data
            ?.message ||
            "Update Failed",
        );
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Edit Flash Sale
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        {/* Flash Sale Info */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value,
                )
              }
              className="border p-3 rounded-xl"
              placeholder="Title"
            />

            <select
              value={String(
                isActive,
              )}
              onChange={(e) =>
                setIsActive(
                  e.target.value ===
                    "true",
                )
              }
              className="border p-3 rounded-xl"
            >
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>

            <input
              type="datetime-local"
              value={
                startTime
              }
              onChange={(e) =>
                setStartTime(
                  e.target.value,
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) =>
                setEndTime(
                  e.target.value,
                )
              }
              className="border p-3 rounded-xl"
            />

          </div>

        </div>

        {/* Selected Products */}

        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-2xl font-bold mb-5">

            Selected Products

            <span className="ml-2 text-blue-600">
              (
              {
                selectedProducts.length
              }
              )
            </span>

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {selectedProducts.map(
              (item) => (
                <div
                  key={
                    item.product
                  }
                  className="border rounded-xl p-4"
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        item
                          .productData
                          ?.images?.[0]
                      }
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover border"
                    />

                    <div>

                      <h3 className="font-bold">
                        {
                          item
                            .productData
                            ?.name
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        Old Price:
                        ৳
                        {
                          item.oldPrice
                        }
                      </p>

                    </div>

                  </div>

                  <input
                    type="number"
                    value={
                      item.salePrice
                    }
                    onChange={(
                      e,
                    ) =>
                      updateSalePrice(
                        item.product,
                        Number(
                          e
                            .target
                            .value,
                        ),
                      )
                    }
                    className="border p-2 rounded mt-4 w-full"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeProduct(
                        item.product,
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded mt-3"
                  >
                    Remove
                  </button>

                </div>
              ),
            )}

          </div>

        </div>

        {/* Add Products */}

        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">

              Add Products

              <span className="ml-2 text-green-600">
                (
                {
                  allProducts.length -
                  selectedProducts.length
                }
                )
              </span>

            </h2>

          </div>

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="w-full border p-3 rounded-xl mb-5"
          />

          <div className="grid md:grid-cols-3 gap-5">

            {allProducts
              .filter(
                (product) =>
                  product.name
                    ?.toLowerCase()
                    .includes(
                      search.toLowerCase(),
                    ),
              )
              .map(
                (product) => {

                  const exists =
                    selectedProducts.find(
                      (
                        item,
                      ) =>
                        item.product ===
                        product._id,
                    );

                  if (
                    exists
                  )
                    return null;

                  return (
                    <div
                      key={
                        product._id
                      }
                      className="border rounded-xl p-4"
                    >

                      <img
                        src={
                          product
                            ?.images?.[0]
                        }
                        alt=""
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <h3 className="font-semibold mt-3">
                        {
                          product.name
                        }
                      </h3>

                      <p>
                        ৳
                        {
                          product.price
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          addProduct(
                            product,
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                      >
                        Add Product
                      </button>

                    </div>
                  );
                },
              )}

          </div>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl mt-6"
        >
          Update Flash Sale
        </button>

      </form>

    </div>
  );
}