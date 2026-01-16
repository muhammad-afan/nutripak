import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    console.log("Geo country route accessed", req.headers);
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ?? // fallback if ever behind Cloudflare
    "UNKNOWN";

  return NextResponse.json({
    country,
  });
}
