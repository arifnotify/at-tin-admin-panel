"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getCoupons,
} from "@/src/services/coupon.service";

interface Coupon {
  _id: string;

  code: string;

  discountAmount: number;

  isUsed: boolean;

  expiresAt: string;

  createdAt: string;

  user: {
    phone: string;
    customerType: string;
  };

  order: {
    orderNumber: string;
  };
}

export default function CouponsPage() {
  const [coupons, setCoupons] =
    useState<Coupon[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons =
    async () => {
      try {
        const data =
          await getCoupons();

        setCoupons(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Coupon Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded-xl shadow">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3">
                Coupon
              </th>

              <th className="p-3">
                Discount
              </th>

              <th className="p-3">
                User
              </th>

              <th className="p-3">
                Customer Type
              </th>

              <th className="p-3">
                Order
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Expire
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.map((item) => {

              const expired =
                new Date(item.expiresAt) <
                new Date();

              return (

                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="p-3 font-semibold">
                    {item.code}
                  </td>

                  <td className="p-3">
                    ৳
                    {
                      item.discountAmount
                    }
                  </td>

                  <td className="p-3">
                    {
                      item.user?.phone
                    }
                  </td>

                  <td className="p-3">
                    {
                      item.user
                        ?.customerType
                    }
                  </td>

                  <td className="p-3">
                    {item.order
                      ?.orderNumber ??
                      "-"}
                  </td>

                  <td className="p-3">

                    {item.isUsed ? (

                      <span className="bg-blue-500 text-white px-2 py-1 rounded">
                        Used
                      </span>

                    ) : expired ? (

                      <span className="bg-red-500 text-white px-2 py-1 rounded">
                        Expired
                      </span>

                    ) : (

                      <span className="bg-green-500 text-white px-2 py-1 rounded">
                        Active
                      </span>

                    )}

                  </td>

                  <td className="p-3">
                    {new Date(
                      item.expiresAt,
                    ).toLocaleDateString()}
                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}