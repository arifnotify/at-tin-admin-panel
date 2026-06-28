"use client";

import { useEffect, useState } from "react";

import { getRewardWallets } from "@/src/services/reward.service";

type Wallet = {
  _id: string;

  user: {
    phone: string;

    customerType: string;
  };

  balance: number;

  totalEarned: number;

  totalUsed: number;
};

export default function RewardWalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const data = await getRewardWallets();

      console.log("WALLETS:", data);

      setWallets(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading Wallets...</div>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Reward Wallets
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-100">

              <th className="p-3 border">
                Phone
              </th>

              <th className="p-3 border">
                Type
              </th>

              <th className="p-3 border">
                Balance
              </th>

              <th className="p-3 border">
                Total Earned
              </th>

              <th className="p-3 border">
                Total Used
              </th>

            </tr>
          </thead>

          <tbody>

            {wallets.map((w) => (
              <tr
                key={w._id}
                className="text-center"
              >

                <td className="p-3 border">
                  {w.user?.phone}
                </td>

                <td className="p-3 border">
                  {w.user?.customerType}
                </td>

                <td className="p-3 border">
                  {w.balance}
                </td>

                <td className="p-3 border">
                  {w.totalEarned}
                </td>

                <td className="p-3 border">
                  {w.totalUsed}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}