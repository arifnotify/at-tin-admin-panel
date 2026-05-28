const cards = [
  {
    title: "Total Users",
    value: 1200,
  },

  {
    title: "Total Orders",
    value: 530,
  },

  {
    title: "Total Products",
    value: 340,
  },

  {
    title: "Revenue",
    value: "$12,000",
  },
];

export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <h2 className="text-gray-500">
              {card.title}
            </h2>

            <h1 className="text-3xl font-bold mt-2">
              {card.value}
            </h1>
          </div>
        ))}

      </div>

    </div>
  );
}