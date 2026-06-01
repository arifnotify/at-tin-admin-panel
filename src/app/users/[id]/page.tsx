"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";
import { getUserById } from "@/src/services/user.service";



export default function UserDetailsPage() {
  const params =
    useParams();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser =
    async () => {
      const data =
        await getUserById(
          params.id as string,
        );

      setUser(data);
    };

  if (!user)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        User Details
      </h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">

        <div>
          <strong>
            Phone:
          </strong>
          {" "}
          {user.phone}
        </div>

        <div>
          <strong>
            Total Orders:
          </strong>
          {" "}
          {user.totalOrders}
        </div>

        <div>
          <strong>
            Total Spent:
          </strong>
          {" "}
          {user.totalSpent}
        </div>

        <div>
          <strong>
            Status:
          </strong>
          {" "}
          {user.isBlocked
            ? "Blocked"
            : "Active"}
        </div>

      </div>

    </div>
  );
}