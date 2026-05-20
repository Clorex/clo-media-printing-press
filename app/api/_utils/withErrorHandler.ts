import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "./apiResponse";

export function withErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      console.error("[Unhandled API Error]", error);

      const message =
        error instanceof Error
          ? error.message
          : "Internal Server Error";

      return errorResponse(message, 500);
    }
  };
}
