import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Order } from "@/src/types/order";

import { formatCurrency } from "./currency";
import { formatDate } from "./date";
import { COMPANY } from "../components/company";

// ============================================
// COMPANY HEADER
// ============================================

const drawHeader = (doc: jsPDF) => {
  doc.setFillColor(37, 99, 235);

  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(22);

  doc.text(COMPANY.name, 14, 17);

  doc.setFont("helvetica", "normal");

  doc.setFontSize(10);

  doc.text(COMPANY.slogan, 14, 25);

  doc.setFont("helvetica", "bold");

  doc.setFontSize(24);

  doc.text("INVOICE", 145, 20);

  doc.setTextColor(0, 0, 0);
};

// ============================================
// COMPANY INFORMATION
// ============================================

const drawCompanyInfo = (
  doc: jsPDF
) => {
  let y = 46;

  doc.setFontSize(11);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Company Information",
    14,
    y
  );

  y += 8;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Address : ${COMPANY.address}`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Phone : ${COMPANY.phone}`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Email : ${COMPANY.email}`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Website : ${COMPANY.website}`,
    14,
    y
  );
};

// ============================================
// ORDER INFORMATION
// ============================================

const drawOrderInfo = (
  doc: jsPDF,
  order: Order
) => {
  let y = 46;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Order Information",
    125,
    y
  );

  y += 8;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Order No : ${order.orderNumber}`,
    125,
    y
  );

  y += 7;

  doc.text(
    `Date : ${formatDate(order.createdAt)}`,
    125,
    y
  );

  y += 7;

  doc.text(
    `Status : ${order.orderStatus}`,
    125,
    y
  );

  y += 7;

  doc.text(
    `Payment : ${order.paymentMethod}`,
    125,
    y
  );
};

// ============================================
// CUSTOMER INFORMATION
// ============================================

const drawCustomerInfo = (
  doc: jsPDF,
  order: Order
) => {
  let y = 88;

  doc.setDrawColor(
    220,
    220,
    220
  );

  doc.line(
    14,
    y - 6,
    196,
    y - 6
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "Customer Information",
    14,
    y
  );

  y += 10;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(11);

  doc.text(
    `Name : ${
      order.shippingAddress?.fullName ||
      "Customer"
    }`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Phone : ${order.customerPhone}`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Address : ${
      order.shippingAddress?.areaOrVillage || ""
    }, ${
      order.shippingAddress?.landmark || ""
    }`,
    14,
    y
  );

  y += 10;

  doc.line(
    14,
    y,
    196,
    y
  );
};
// ============================================
// PRODUCT TABLE
// ============================================

const drawItemsTable = (
  doc: jsPDF,
  order: Order
) => {
  autoTable(doc, {
    startY: 125,

    head: [
      [
        "Product",
        "Qty",
        "Price",
        "Total",
      ],
    ],

    body: order.items.map((item) => [
      item.productName,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.totalPrice),
    ]),

    theme: "striped",

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
    },

    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },

    margin: {
      left: 14,
      right: 14,
    },
  });
};

// ============================================
// TOTAL SECTION
// ============================================

const drawTotalSection = (
  doc: jsPDF,
  order: Order
) => {
  const finalY =
    (doc as any).lastAutoTable.finalY + 10;

  let y = finalY;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  // Subtotal (from items)
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  doc.text("Subtotal", 130, y);

  doc.text(
    formatCurrency(subtotal),
    190,
    y,
    { align: "right" }
  );

  y += 8;

  // Delivery Charge (default 0 if not exist)
  const delivery = 0;

  doc.text("Delivery", 130, y);

  doc.text(
    formatCurrency(delivery),
    190,
    y,
    { align: "right" }
  );

  y += 8;

  // Discount (optional)
  const discount = 0;

  doc.text("Discount", 130, y);

  doc.text(
    formatCurrency(discount),
    190,
    y,
    { align: "right" }
  );

  y += 10;

  doc.setLineWidth(0.5);
  doc.line(130, y, 190, y);

  y += 8;

  // Grand Total
  const total =
    subtotal + delivery - discount;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("Grand Total", 130, y);

  doc.text(
    formatCurrency(total),
    190,
    y,
    { align: "right" }
  );
};

// ============================================
// PAYMENT SECTION
// ============================================

const drawPaymentSection = (
  doc: jsPDF,
  order: Order
) => {
  let y = 235;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("Payment Details", 14, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  doc.text(
    `Method : ${order.paymentMethod}`,
    14,
    y
  );

  y += 7;

  doc.text(
    `Status : ${
      order.isPaid
        ? "Paid"
        : "Unpaid"
    }`,
    14,
    y
  );

  y += 12;

  // Badge
  if (order.isPaid) {
    doc.setFillColor(46, 204, 113);
    doc.rect(14, y, 30, 8, "F");

    doc.setTextColor(255, 255, 255);

    doc.text("PAID", 20, y + 6);
  } else {
    doc.setFillColor(231, 76, 60);
    doc.rect(14, y, 40, 8, "F");

    doc.setTextColor(255, 255, 255);

    doc.text("UNPAID", 18, y + 6);
  }

  doc.setTextColor(0, 0, 0);
};

// ============================================
// FOOTER
// ============================================

const drawFooter = (doc: jsPDF) => {
  const pageHeight =
    doc.internal.pageSize.height;

  doc.setDrawColor(220, 220, 220);

  doc.line(
    14,
    pageHeight - 25,
    196,
    pageHeight - 25
  );

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);

  doc.text(
    "Thank you for your order!",
    105,
    pageHeight - 15,
    { align: "center" }
  );
};
// ============================================
// MAIN GENERATE FUNCTION
// ============================================

export const generateInvoice = (
  order: Order
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // =========================
  // HEADER
  // =========================
  drawHeader(doc);

  // =========================
  // COMPANY INFO
  // =========================
  drawCompanyInfo(doc);

  // =========================
  // ORDER INFO
  // =========================
  drawOrderInfo(doc, order);

  // =========================
  // CUSTOMER INFO
  // =========================
  drawCustomerInfo(doc, order);

  // =========================
  // ITEMS TABLE
  // =========================
  drawItemsTable(doc, order);

  // =========================
  // TOTAL SECTION
  // =========================
  drawTotalSection(doc, order);

  // =========================
  // PAYMENT SECTION
  // =========================
  drawPaymentSection(doc, order);

  // =========================
  // FOOTER
  // =========================
  drawFooter(doc);

  // =========================
  // DOWNLOAD PDF
  // =========================
  doc.save(`${order.orderNumber}.pdf`);
};