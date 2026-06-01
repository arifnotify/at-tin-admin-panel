"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  Eye,
} from "lucide-react";
import {getUsers,
  blockUser,
  unblockUser, } from "@/src/services/user.service";



export default function UsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const data =
          await getUsers();

        setUsers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const handleBlock =
    async (
      id: string,
      blocked: boolean,
    ) => {
      try {
        if (blocked) {
          await unblockUser(id);
        } else {
          await blockUser(id);
        }

        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    };

  const filteredUsers =
    users.filter((user) =>
      user.phone.includes(
        search,
      ),
    );

  if (loading) {
    return (
      <div>
        Loading Users...
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <div className="bg-blue-100 px-5 py-3 rounded-xl">
          Total Users:
          {" "}
          <strong>
            {users.length}
          </strong>
        </div>

      </div>

      {/* SEARCH */}
      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search by phone..."
          className="w-full border rounded-xl p-3 pl-11"
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Orders
              </th>

              <th className="p-4 text-left">
                Joined
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map(
              (user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {user.phone}
                  </td>

                  <td className="p-4">
                    {user.totalOrders || 0}
                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    {user.isBlocked ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        Blocked
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Active
                      </span>
                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex gap-3">

                      <Link
                        href={`/users/${user._id}`}
                      >
                        <button className="bg-blue-500 text-white p-2 rounded-lg">
                          <Eye size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          handleBlock(
                            user._id,
                            user.isBlocked,
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-white ${
                          user.isBlocked
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.isBlocked
                          ? "Unblock"
                          : "Block"}
                      </button>

                    </div>

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