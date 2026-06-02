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
  getFlashSaleById,
  updateFlashSale,
} from "@/src/services/flash-sale.service";

export default function EditFlashSalePage() {
  const router =
    useRouter();

  const params =
    useParams();

  const [loading,
    setLoading] =
    useState(true);

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

  useEffect(() => {
    fetchSale();
  }, []);

  const fetchSale =
    async () => {
      try {
        const data =
          await getFlashSaleById(
            params.id as string,
          );

        setTitle(
          data.title,
        );

        setStartTime(
          data.startTime
            ?.slice(0, 16),
        );

        setEndTime(
          data.endTime
            ?.slice(0, 16),
        );

        setIsActive(
          data.isActive,
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        await updateFlashSale(
          params.id as string,
          {
            title,
            startTime,
            endTime,
            isActive,
          },
        );

        alert(
          "Flash Sale Updated",
        );

        router.push(
          "/flash-sale",
        );
      } catch (error) {
        console.log(error);
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
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Edit Flash Sale
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value,
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) =>
            setStartTime(
              e.target.value,
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) =>
            setEndTime(
              e.target.value,
            )
          }
          className="w-full border p-3 rounded-xl"
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
          className="w-full border p-3 rounded-xl"
        >
          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Update Flash Sale
        </button>

      </form>

    </div>
  );
}