"use client";

interface Props {
  riders: any[];
  selectedRider: string;
  setSelectedRider: (
    value: string
  ) => void;
  assign: () => void;
  locked: boolean;
}

export default function RiderCard({
  riders,
  selectedRider,
  setSelectedRider,
  assign,
  locked,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl p-5">

      <h2 className="font-bold text-xl mb-4">
        Assign Rider
      </h2>

      <select
        disabled={locked}
        value={selectedRider}
        onChange={(e) =>
          setSelectedRider(
            e.target.value
          )
        }
        className="
        border
        rounded-xl
        p-3
        w-full
      "
      >
        <option value="">
          Select Rider
        </option>

        {riders.map((rider) => (
          <option
            key={rider._id}
            value={rider._id}
          >
            {rider.name}
          </option>
        ))}
      </select>

      <button
        disabled={locked}
        onClick={assign}
        className="
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-xl
        mt-4
      "
      >
        Assign Rider
      </button>

    </div>
  );
}