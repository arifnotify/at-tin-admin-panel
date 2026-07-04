"use client";

interface Props {
  title: string;
  value: number | string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      rounded-2xl
      p-5
      shadow-sm
    "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}