const cards = [
  {
    title: "Total Users",
    value: "1,240",
  },

  {
    title: "Total Orders",
    value: "530",
  },

  {
    title: "Products",
    value: "120",
  },

  {
    title: "Revenue",
    value: "$12,400",
  },
];

export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm"
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

      {/* RECENT ORDERS */}
      <div className="bg-white mt-8 rounded-2xl p-6 shadow-sm">

        <h1 className="text-2xl font-bold mb-5">
          Recent Orders
        </h1>

        <div className="space-y-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h1 className="font-semibold">
                  Order #{item}245
                </h1>

                <p className="text-sm text-gray-500">
                  Customer Name
                </p>
              </div>

              <div className="text-right">
                <h1 className="font-bold">
                  $250
                </h1>

                <p className="text-green-500 text-sm">
                  Delivered
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}