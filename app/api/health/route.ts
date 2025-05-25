import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    gemini_configured: !!process.env.GEMINI_API_KEY,
  })
}
