"use client";

interface Props {
  items: any[];
  setItems: (items: any[]) => void;
  locked: boolean;
}

export default function EditableOrderItems({
  items,
  setItems,
  locked,
}: Props) {
  const updateQty = (
    index: number,
    quantity: number
  ) => {
    const updated = [...items];

    updated[index].quantity = quantity;

    updated[index].totalPrice =
      updated[index].price * quantity;

    setItems(updated);
  };

  const removeItem = (
    index: number
  ) => {
    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  };

  return (
    <div className="bg-white border rounded-2xl p-5">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Edit Items
        </h2>

        {locked && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
            Locked
          </span>
        )}

      </div>

      <div className="space-y-4">

        {items.map(
          (item: any, index: number) => (
            <div
              key={index}
              className="
              border
              rounded-xl
              p-4
              flex
              gap-4
            "
            >
              <img
                src={item.productImage}
                alt=""
                className="
                w-20
                h-20
                rounded-lg
                object-cover
              "
              />

              <div className="flex-1">

                <h3 className="font-bold">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-500">
                  ৳{item.price}
                </p>

                <div className="mt-3">

                  <label className="block text-sm mb-1">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={1}
                    disabled={locked}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(
                        index,
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="
                    border
                    rounded-lg
                    px-3
                    py-2
                    w-24
                  "
                  />

                </div>

                <p className="mt-3 font-semibold">
                  Total:
                  ৳
                  {item.totalPrice}
                </p>

                {!locked && (
                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="
                    mt-2
                    text-red-600
                    font-medium
                  "
                  >
                    Remove Item
                  </button>
                )}

              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}