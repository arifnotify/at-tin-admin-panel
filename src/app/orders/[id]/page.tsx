"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/src/services/order.service";



export default function OrderDetailsPage() {
  const params =
    useParams();

  const id =
    params.id as string;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      try {
        const data =
          await getOrderById(
            id,
          );

        setOrder(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const handleStatusUpdate =
    async (
      status: string,
    ) => {
      try {
        await updateOrderStatus(
          id,
          status,
        );

        alert(
          "Status Updated",
        );

        fetchOrder();
      } catch (err) {
        console.log(err);
      }
    };

  if (loading) {
    return (
      <div>
        Loading Order...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Customer Information
        </h2>

        <p>
          Name:
          {
            order.customerName
          }
        </p>

        <p>
          Phone:
          {
            order.customerPhone
          }
        </p>

        <p>
          Address:
          {
            order.address
          }
        </p>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow mt-6">

        <h2 className="text-xl font-bold mb-4">
          Ordered Products
        </h2>

        {order.items.map(
          (item: any) => (
            <div
              key={
                item.productId
              }
              className="border-b py-3"
            >
              <p>
                {
                  item.productName
                }
              </p>

              <p>
                Qty:
                {
                  item.quantity
                }
              </p>
            </div>
          ),
        )}

      </div>

      <div className="bg-white p-6 rounded-2xl shadow mt-6">

        <h2 className="text-xl font-bold mb-4">
          Order Status
        </h2>

        <select
          value={
            order.status
          }
          onChange={(e) =>
            handleStatusUpdate(
              e.target.value,
            )
          }
          className="border p-3 rounded-xl"
        >
          <option value="pending">
            Pending
          </option>

          <option value="processing">
            Processing
          </option>

          <option value="shipped">
            Shipped
          </option>

          <option value="delivered">
            Delivered
          </option>

          <option value="cancelled">
            Cancelled
          </option>

        </select>

      </div>

    </div>
  );
}