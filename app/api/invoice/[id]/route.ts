import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { generateInvoicePdf } from "@/lib/pdf/invoice.generator";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const orderRef = adminDb
      .collection(COLLECTIONS.ORDERS)
      .doc(id);

    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const order = orderDoc.data();

    if (order?.paymentStatus !== "CONFIRMED") {
      return NextResponse.json(
        { success: false, message: "Payment must be confirmed first" },
        { status: 400 }
      );
    }

    const pdfBuffer = await generateInvoicePdf(order);

    const uploadResult = (await uploadToCloudinary({
      folder: "clomedia/invoices",
      fileBuffer: pdfBuffer,
      fileName: `invoice-${order.trackingId}`,
      resourceType: "raw",
    })) as any;

    const invoiceUrl = uploadResult.secure_url;

    await orderRef.update({
      invoicePdfUrl: invoiceUrl,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      invoiceUrl,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invoice generation failed" },
      { status: 500 }
    );
  }
}
