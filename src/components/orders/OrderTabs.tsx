"use client";

const tabs = [
  "All",
  "Pending",
  "Processing",
  "OutForDelivery",
  "Delivered",
  "Cancelled",
];

interface Props {
  active: string;
  onChange: (
    value: string
  ) => void;
}

export default function OrderTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() =>
            onChange(tab)
          }
          className={`
          px-4 py-2 rounded-lg

          ${
            active === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }
        `}
        >
          {tab}
        </button>
      ))}

    </div>
  );
}