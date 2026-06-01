"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Users,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { getUsers,
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
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      try {
        const data =
          await getUsers();

        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleUser =
    async (
      phone: string,
      isBlocked: boolean,
    ) => {
      try {
        if (isBlocked) {
          await unblockUser(phone);

          alert(
            "User Unblocked",
          );
        } else {
          await blockUser(
            phone,
            "Blocked By Admin",
          );

          alert(
            "User Blocked",
          );
        }

        loadUsers();
      } catch (error) {
        console.log(error);

        alert(
          "Action Failed",
        );
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
      <div className="p-10">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500">
            Manage all registered users
          </p>

        </div>

        <div className="bg-blue-100 px-5 py-3 rounded-xl flex items-center gap-2">

          <Users size={20} />

          <span>
            Total Users:
            {" "}
            <strong>
              {users.length}
            </strong>
          </span>

        </div>

      </div>

      {/* SEARCH */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by phone..."
          className="w-full border rounded-xl p-3 pl-11"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />

      </div>

      {/* TABLE */}

      <div className="bg-white shadow rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Joined
              </th>

              <th className="text-left p-4">
                Action
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

                    {user.isBlocked ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">

                        Blocked

                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">

                        Active

                      </span>
                    )}

                  </td>

                  <td className="p-4">

                    {new Date(
                      user.createdAt,
                    ).toLocaleDateString()}

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleUser(
                          user.phone,
                          user.isBlocked,
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                        user.isBlocked
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >

                      {user.isBlocked ? (
                        <>
                          <ShieldCheck
                            size={16}
                          />
                          Unblock
                        </>
                      ) : (
                        <>
                          <ShieldX
                            size={16}
                          />
                          Block
                        </>
                      )}

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