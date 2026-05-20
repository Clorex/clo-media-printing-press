import { withErrorHandler } from "@/app/api/_utils/withErrorHandler";
import { successResponse } from "@/app/api/_utils/apiResponse";
import { verifyAdminSession } from "@/lib/auth/adminAuth";

export const GET = withErrorHandler(async () => {
  const user = await verifyAdminSession();
  return successResponse({ user });
});