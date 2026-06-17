"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getOrder,
  updateOrderStatus,
  assignRider,
} from "@/src/services/order.service";

import {
  getRiders,
} from "@/src/services/rider.service";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [riders, setRiders] =
    useState<any[]>([]);

  const [selectedRider, setSelectedRider] =
    useState("");

  useEffect(() => {
    loadOrder();
    loadRiders();
  }, [id]);

  const loadOrder = async () => {
    try {
      if (!id) {
        setError("Invalid Order ID");
        return;
      }

      const data =
        await getOrder(id);

      setOrder(data);
    } catch (error) {
      console.log(error);
      setError("Order Not Found");
    } finally {
      setLoading(false);
    }
  };

  const loadRiders = async () => {
    try {
      const data =
        await getRiders();

      setRiders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate =
    async (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      try {
        const newStatus =
          e.target.value;

        await updateOrderStatus(
          order._id,
          newStatus
        );

        setOrder({
          ...order,
          orderStatus: newStatus,
        });

        alert(
          "Order Status Updated"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Update Failed"
        );
      }
    };

  const handleAssignRider =
    async () => {
      try {
        if (!selectedRider) {
          alert(
            "Select Rider First"
          );

          return;
        }

        await assignRider(
          order._id,
          selectedRider
        );

        alert(
          "Rider Assigned Successfully"
        );

        loadOrder();
      } catch (error) {
        console.log(error);

        alert(
          "Assign Failed"
        );
      }
    };

  if (loading) {
    return (
      <p className="p-5">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-5 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      <div className="border rounded p-5 mb-5">

        <p>
          <strong>
            Order Number :
          </strong>{" "}
          {order.orderNumber}
        </p>

        <p>
          <strong>
            Customer Phone :
          </strong>{" "}
          {order.customerPhone}
        </p>

        <p>
          <strong>
            Shipping Address :
          </strong>{" "}
          {order.shippingAddress}
        </p>

        <p>
          <strong>
            Total Amount :
          </strong>{" "}
          ৳{order.totalAmount}
        </p>

        <p>
          <strong>
            Current Status :
          </strong>{" "}
          {order.orderStatus}
        </p>

        <div className="mt-4">

          <label className="font-semibold block mb-2">
            Update Status
          </label>

          <select
            value={order.orderStatus}
            onChange={
              handleStatusUpdate
            }
            className="border rounded px-3 py-2"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="OutForDelivery">
              Out For Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

        </div>

        <div className="mt-6">

          <label className="font-semibold block mb-2">
            Assign Rider
          </label>

          <select
            value={selectedRider}
            onChange={(e) =>
              setSelectedRider(
                e.target.value
              )
            }
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">
              Select Rider
            </option>

            {riders.map(
              (rider: any) => (
                <option
                  key={rider._id}
                  value={rider._id}
                >
                  {rider.name}
                </option>
              )
            )}
          </select>

          <button
            onClick={
              handleAssignRider
            }
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Assign Rider
          </button>

        </div>

        {order.assignedRider && (
          <div className="mt-4">

            <p>
              <strong>
                Assigned Rider :
              </strong>{" "}
              {order.assignedRider}
            </p>

          </div>
        )}

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Ordered Products
        </h2>

        {order.items?.map(
          (
            item: any,
            index: number
          ) => (
            <div
              key={index}
              className="border rounded p-4 mb-4 flex gap-4"
            >
              <img
                src={
                  item.productImage
                }
                alt={
                  item.productName
                }
                className="w-24 h-24 rounded object-cover"
              />

              <div>

                <h3 className="font-bold">
                  {
                    item.productName
                  }
                </h3>

                <p>
                  Quantity :
                  {
                    item.quantity
                  }
                </p>

                <p>
                  Price :
                  ৳{item.price}
                </p>

                <p>
                  Total :
                  ৳
                  {
                    item.totalPrice
                  }
                </p>

              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}