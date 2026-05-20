import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/app/api/_utils/apiResponse";

const SESSION_COOKIE_NAME = "clomedia_admin_session";
const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_SECRET_KEY
  ) {
    return errorResponse("Invalid credentials", 401);
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  response.cookies.set(SESSION_COOKIE_NAME, "valid_session", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: SESSION_EXPIRES_IN,
    path: "/",
  });

  return response;
}
