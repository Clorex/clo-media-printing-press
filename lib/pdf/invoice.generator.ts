import { jsPDF } from "jspdf";

export async function generateInvoicePdf(
  order: any
): Promise<Buffer> {
  const doc = new jsPDF();

  // Brand header
  doc.setFontSize(20);
  doc.setTextColor(249, 115, 22);
  doc.text("CLO MEDIA PRINTING PRESS", 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(
    "Opposite Borrow Pit Junction, NDDC Road, Amukpe, Sapele",
    20,
    28
  );
  doc.text("Delta State, Nigeria | 08059086041", 20, 33);

  // Meta
  doc.setTextColor(17, 24, 39);
  doc.setFontSize(11);
  doc.text(`Invoice #: ${order.trackingId}`, 20, 48);
  doc.text(
    `Date: ${new Date().toLocaleDateString("en-NG")}`,
    20,
    55
  );
  doc.text(`Customer: ${order.customerName}`, 20, 62);
  doc.text(`Phone: ${order.customerPhone}`, 20, 69);

  // Line
  doc.setDrawColor(229, 231, 235);
  doc.line(20, 75, 190, 75);

  // Table header
  doc.setFillColor(243, 244, 246);
  doc.rect(20, 82, 170, 10, "F");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text("Description", 25, 88);
  doc.text("Qty", 100, 88);
  doc.text("Unit", 125, 88);
  doc.text("Amount", 160, 88);

  // Items
  let y = 98;
  const items = [
    {
      name: order.item.productName,
      qty: order.item.quantity,
      unit: order.item.unitPrice,
      total: order.item.subtotal,
    },
  ];

  if (order.item.hasDesignAddon) {
    items.push({
      name: "Design Addon",
      qty: 1,
      unit: order.item.designAddonPrice,
      total: order.item.designAddonPrice,
    });
  }

  items.forEach((item) => {
    doc.text(item.name, 25, y);
    doc.text(String(item.qty), 100, y);
    doc.text(`₦${item.unit.toLocaleString()}`, 125, y);
    doc.text(`₦${item.total.toLocaleString()}`, 160, y);
    y += 10;
  });

  doc.line(20, y + 2, 190, y + 2);

  // Totals
  y += 14;
  doc.setFontSize(11);
  doc.text(
    `Subtotal: ₦${order.item.subtotal.toLocaleString()}`,
    130,
    y
  );

  if (order.item.hasDesignAddon) {
    y += 7;
    doc.text(
      `Design Addon: ₦${order.item.designAddonPrice.toLocaleString()}`,
      130,
      y
    );
  }

  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(249, 115, 22);
  doc.text(
    `Grand Total: ₦${order.grandTotal.toLocaleString()}`,
    130,
    y
  );

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(
    `Estimated Delivery: ${new Date(
      order.estimatedDelivery
    ).toLocaleDateString("en-NG")}`,
    20,
    y + 20
  );
  doc.text("Payment confirmed via Opay", 20, y + 26);
  doc.text("Thank you for your business!", 20, y + 32);

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}