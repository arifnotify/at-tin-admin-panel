"use client";

import { Order } from "@/src/types/order";
import { generateInvoice } from "@/src/utils/generateInvoice";

type Props = {
  order: Order;
};

export default function InvoiceActions({ order }: Props) {
  return (
    <div className="flex gap-3 mt-4">

      {/* DOWNLOAD INVOICE */}
      <button
        onClick={() => generateInvoice(order)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Invoice
      </button>

      {/* PRINT */}
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Print
      </button>

    </div>
  );
}