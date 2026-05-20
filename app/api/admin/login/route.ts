import { NextRequest } from "next/server";
import { withErrorHandler } from "@/app/api/_utils/withErrorHandler";
import { errorResponse } from "@/app/api/_utils/apiResponse";
import { createAdminSession } from "@/lib/auth/adminAuth";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { idToken } = await req.json();

  if (!idToken || typeof idToken !== "string") {
    return errorResponse("Missing or invalid ID token.", 400);
  }

  return await createAdminSession(idToken);
});