import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET() {
  try {
    // Get total visitors count
    const { data, error } = await supabaseServer
      .from("global_stats")
      .select("stat_value")
      .eq("stat_name", "total_visitors")
      .single()

    if (error) {
      console.error("Error fetching visitor count:", error)
      return NextResponse.json({ error: "Failed to fetch visitor count" }, { status: 500 })
    }

    return NextResponse.json({
      totalVisitors: data.stat_value,
    })
  } catch (error) {
    console.error("Error in visitors GET route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userAgent, timezone, language } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Track visitor using the database function
    const { data, error } = await supabaseServer.rpc("track_visitor", {
      p_user_id: userId,
      p_user_agent: userAgent || null,
      p_timezone: timezone || null,
      p_language: language || null,
    })

    if (error) {
      console.error("Error tracking visitor:", error)
      return NextResponse.json({ error: "Failed to track visitor" }, { status: 500 })
    }

    const result = data[0]

    return NextResponse.json({
      isNewVisitor: result.is_new_visitor,
      userVisitCount: result.total_visits,
      totalVisitors: result.total_unique_visitors,
    })
  } catch (error) {
    console.error("Error in visitors POST route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
