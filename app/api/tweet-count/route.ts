import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("global_stats")
      .select("stat_value, updated_at")
      .eq("stat_name", "total_tweets")
      .single()

    if (error) {
      console.error("Supabase error fetching tweet count:", error)

      // If no record exists, create one
      if (error.code === "PGRST116") {
        const { data: newData, error: insertError } = await supabaseServer
          .from("global_stats")
          .insert({ stat_name: "total_tweets", stat_value: 42847 })
          .select("stat_value, updated_at")
          .single()

        if (insertError) {
          console.error("Error creating initial tweet count:", insertError)
          return NextResponse.json({ error: "Failed to initialize tweet count" }, { status: 500 })
        }

        return NextResponse.json({
          count: newData.stat_value,
          timestamp: newData.updated_at,
        })
      }

      return NextResponse.json({ error: "Failed to fetch tweet count" }, { status: 500 })
    }

    return NextResponse.json({
      count: data.stat_value,
      timestamp: data.updated_at,
    })
  } catch (error) {
    console.error("Error fetching tweet count:", error)
    return NextResponse.json({ error: "Failed to fetch tweet count" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "increment") {
      // Try using the RPC function first
      try {
        const { data, error } = await supabaseServer.rpc("increment_tweet_count")

        if (error) {
          throw error
        }

        return NextResponse.json({
          count: data,
          action: "increment",
          timestamp: new Date().toISOString(),
        })
      } catch (rpcError) {
        console.warn("RPC function failed, falling back to direct update:", rpcError)

        // Fallback to direct SQL update
        const { data, error } = await supabaseServer
          .from("global_stats")
          .select("stat_value")
          .eq("stat_name", "total_tweets")
          .single()

        if (error) {
          console.error("Error fetching current count:", error)
          return NextResponse.json({ error: "Failed to increment tweet count" }, { status: 500 })
        }

        const newCount = data.stat_value + 1

        const { data: updateData, error: updateError } = await supabaseServer
          .from("global_stats")
          .update({ stat_value: newCount })
          .eq("stat_name", "total_tweets")
          .select("stat_value, updated_at")
          .single()

        if (updateError) {
          console.error("Error updating tweet count:", updateError)
          return NextResponse.json({ error: "Failed to increment tweet count" }, { status: 500 })
        }

        return NextResponse.json({
          count: updateData.stat_value,
          action: "increment",
          timestamp: updateData.updated_at,
        })
      }
    } else if (action === "reset") {
      // Reset the counter (admin only)
      const { data, error } = await supabaseServer
        .from("global_stats")
        .update({ stat_value: 0 })
        .eq("stat_name", "total_tweets")
        .select("stat_value, updated_at")
        .single()

      if (error) {
        console.error("Supabase error resetting tweet count:", error)
        return NextResponse.json({ error: "Failed to reset tweet count" }, { status: 500 })
      }

      return NextResponse.json({
        count: data.stat_value,
        action: "reset",
        timestamp: data.updated_at,
      })
    } else {
      return NextResponse.json({ error: "Invalid action. Use 'increment' or 'reset'" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating tweet count:", error)
    return NextResponse.json({ error: "Failed to update tweet count" }, { status: 500 })
  }
}
