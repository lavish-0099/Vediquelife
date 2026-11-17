import { NextResponse } from "next/server";

export function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, ngrok-skip-browser-warning",
  );
  return response;
}

export function handleOptions() {
  const response = new NextResponse(null, { status: 204 });
  return withCors(response);
}
