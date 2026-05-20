import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security/rateLimiter";

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: { maxRequests: number; windowMs: number }
) {
  return async (req: NextRequest) => {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `${ip}:${req.nextUrl.pathname}`;

    const allowed = checkRateLimit(
      key,
      options.maxRequests,
      options.windowMs
    );

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests." },
        { status: 429 }
      );
    }

    return handler(req);
  };
}
