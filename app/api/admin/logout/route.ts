import { withErrorHandler } from "@/app/api/_utils/withErrorHandler";
import { clearAdminSession } from "@/lib/auth/adminAuth";

export const POST = withErrorHandler(async () => {
  return clearAdminSession();
});