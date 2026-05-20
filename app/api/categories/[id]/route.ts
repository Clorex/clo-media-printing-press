import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/services/category/category.service";

/**
 * UPDATE CATEGORY
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = await request.json();

  await CategoryService.updateCategory(id, data);

  return NextResponse.json({ success: true });
}

/**
 * DELETE CATEGORY
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await CategoryService.deleteCategory(id);

  return NextResponse.json({ success: true });
}