"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getProducts,
} from "@/src/services/product.service";

import {
  getFlashSaleById,
  updateFlashSale,
} from "@/src/services/flash-sale.service";

export default function EditFlashSalePage() {
  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [allProducts,
    setAllProducts] =
    useState<any[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [startTime,
    setStartTime] =
    useState("");

  const [endTime,
    setEndTime] =
    useState("");

  const [isActive,
    setIsActive] =
    useState(true);

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {

        const [
          sale,
          products,
        ] = await Promise.all([
          getFlashSaleById(
            params.id as string,
          ),
          getProducts(),
        ]);

        setAllProducts(
          products,
        );

        setTitle(
          sale.title,
        );

        setStartTime(
          new Date(
            sale.startTime,
          )
            .toISOString()
            .slice(0, 16),
        );

        setEndTime(
          new Date(
            sale.endTime,
          )
            .toISOString()
            .slice(0, 16),
        );

        setIsActive(
          sale.isActive,
        );

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

  const removeProduct =
    (
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

  const addProduct =
    (
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
          "Already Added",
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

  const updateSalePrice =
    (
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
                  salePrice:
                    value,
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
              (
                item,
              ) => ({
                product:
                  item.product,
                salePrice:
                  Number(
                    item.salePrice,
                  ),
              }),
            ),
        };

        console.log(
          payload,
        );

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
            />

            <select
              value={
                String(
                  isActive,
                )
              }
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
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {selectedProducts.map(
              (
                item,
              ) => (
                <div
                  key={
                    item.product
                  }
                  className="border rounded-xl p-4"
                >

                  <h3 className="font-bold">
                    {
                      item
                        .productData
                        ?.name
                    }
                  </h3>

                  <p>
                    Old Price:
                    ৳
                    {
                      item.oldPrice
                    }
                  </p>

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
                    className="border p-2 rounded mt-3 w-full"
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

        {/* Available Products */}

        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            Add Products
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {allProducts.map(
              (
                product,
              ) => {

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
                      className="h-40 w-full object-cover rounded-lg"
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
                      Add
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