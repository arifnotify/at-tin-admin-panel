const cards = [
  {
    title: "Total Users",
    value: "1200",
  },

  {
    title: "Orders",
    value: "540",
  },

  {
    title: "Products",
    value: "130",
  },

  {
    title: "Revenue",
    value: "$12,000",
  },
];

export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow"
          >
            <p className="text-gray-500">
              {card.title}
            </p>

            <h1 className="text-3xl font-bold mt-3">
              {card.value}
            </h1>
          </div>
        ))}

      </div>

    </div>
  );
}