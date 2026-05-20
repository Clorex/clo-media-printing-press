export function getInvoiceHtml(order: any): string {
  const items = [
    {
      name: order.item.productName,
      qty: order.item.quantity,
      unit: order.item.unitPrice,
      total: order.item.subtotal,
    },
    ...(order.item.hasDesignAddon
      ? [
          {
            name: "Design Addon",
            qty: 1,
            unit: order.item.designAddonPrice,
            total: order.item.designAddonPrice,
          },
        ]
      : []),
  ];

  const rows = items
    .map(
      (i) => `
    <tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>₦${i.unit.toLocaleString()}</td>
      <td>₦${i.total.toLocaleString()}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 40px; color: #111827; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #F97316; font-size: 28px; margin-bottom: 8px; }
        .header p { font-size: 12px; color: #6B7280; line-height: 1.6; }
        .meta { margin-bottom: 24px; }
        .meta p { font-size: 13px; margin-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #E5E7EB; padding: 12px; text-align: left; font-size: 13px; }
        th { background: #F3F4F6; font-weight: 600; }
        .totals { text-align: right; margin-top: 20px; }
        .totals p { font-size: 14px; margin-bottom: 6px; }
        .grand { font-size: 18px; font-weight: 700; color: #F97316; margin-top: 10px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CLO MEDIA PRINTING PRESS</h1>
        <p>Opposite Borrow Pit Junction, NDDC Road, Amukpe, Sapele, Delta State, Nigeria</p>
        <p>WhatsApp: 08059086041</p>
      </div>

      <div class="meta">
        <p><strong>Invoice #:</strong> ${order.trackingId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-NG")}</p>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="totals">
        <p>Subtotal: ₦${order.item.subtotal.toLocaleString()}</p>
        ${order.item.hasDesignAddon ? `<p>Design Addon: ₦${order.item.designAddonPrice.toLocaleString()}</p>` : ""}
        <p class="grand">Grand Total: ₦${order.grandTotal.toLocaleString()}</p>
      </div>

      <div class="footer">
        <p>Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString("en-NG")}</p>
        <p>Payment confirmed via Opay</p>
        <p>Thank you for your business!</p>
      </div>
    </body>
    </html>
  `;
}