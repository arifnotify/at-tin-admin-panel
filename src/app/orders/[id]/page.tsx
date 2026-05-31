"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getSingleOrder,
  updateOrderStatus,
} from "@/src/services/order.service";

export default function OrderDetailsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const loadOrder =
    async () => {
      try {
        const data =
          await getSingleOrder(
            params.id
          );

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadOrder();
  }, []);

  const handleStatusChange =
    async (
      status: string
    ) => {
      try {
        await updateOrderStatus(
          order._id,
          status
        );

        loadOrder();
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-5">
        Order not found
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      <div className="bg-white rounded shadow p-5">

        <h2 className="text-xl font-semibold mb-3">
          Customer Information
        </h2>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {
            order.customerPhone
          }
        </p>

        <p>
          <strong>
            Address:
          </strong>{" "}
          {
            order.shippingAddress
          }
        </p>

        <hr className="my-5" />

        <h2 className="text-xl font-semibold mb-3">
          Ordered Products
        </h2>

        <div className="space-y-4">
          {order.items?.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="border rounded p-4 flex gap-4"
              >
                <img
                  src={
                    item.productImage
                  }
                  alt=""
                  className="w-24 h-24 object-cover border rounded"
                />

                <div>
                  <h3 className="font-semibold">
                    {
                      item.productName
                    }
                  </h3>

                  <p>
                    Qty:
                    {" "}
                    {
                      item.quantity
                    }
                  </p>

                  <p>
                    Price:
                    $
                    {
                      item.price
                    }
                  </p>

                  <p>
                    Total:
                    $
                    {
                      item.totalPrice
                    }
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        <hr className="my-5" />

        <h3 className="text-xl font-bold">
          Total Amount:
          {" "}
          $
          {
            order.totalAmount
          }
        </h3>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">
            Order Status
          </h3>

          <select
            value={
              order.orderStatus
            }
            onChange={(
              e
            ) =>
              handleStatusChange(
                e.target
                  .value
              )
            }
            className="border p-2 rounded"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
