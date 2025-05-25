"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

interface TweetCountData {
  count: number
  timestamp: string
}

export function useGlobalTweetCount() {
  const [globalCount, setGlobalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Fetch initial count from API
  const fetchCount = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/tweet-count", {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: TweetCountData = await response.json()
      setGlobalCount(data.count)
      setLastUpdated(data.timestamp)
    } catch (err) {
      console.error("Error fetching global tweet count:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch count")
      // Fallback to a reasonable number if API fails
      setGlobalCount(42847)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Increment count via API
  const incrementCount = useCallback(async (): Promise<number> => {
    try {
      const response = await fetch("/api/tweet-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "increment" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: TweetCountData = await response.json()
      setGlobalCount(data.count)
      setLastUpdated(data.timestamp)
      setError(null)

      return data.count
    } catch (err) {
      console.error("Error incrementing global tweet count:", err)
      setError(err instanceof Error ? err.message : "Failed to increment count")

      // Optimistic update even if API fails
      const newCount = globalCount + 1
      setGlobalCount(newCount)
      return newCount
    }
  }, [globalCount])

  // Reset count (for admin purposes)
  const resetCount = useCallback(async (): Promise<number> => {
    try {
      const response = await fetch("/api/tweet-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reset" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: TweetCountData = await response.json()
      setGlobalCount(data.count)
      setLastUpdated(data.timestamp)
      setError(null)

      return data.count
    } catch (err) {
      console.error("Error resetting global tweet count:", err)
      setError(err instanceof Error ? err.message : "Failed to reset count")
      return globalCount
    }
  }, [globalCount])

  // Set up real-time subscription to database changes
  useEffect(() => {
    const channel = supabase
      .channel("global_stats_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "global_stats",
          filter: "stat_name=eq.total_tweets",
        },
        (payload) => {
          console.log("Real-time update received:", payload)
          if (payload.new && typeof payload.new.stat_value === "number") {
            setGlobalCount(payload.new.stat_value)
            setLastUpdated(payload.new.updated_at)
            setError(null)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Fetch count on component mount
  useEffect(() => {
    fetchCount()
  }, [fetchCount])

  // Periodically refresh count as backup to real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCount()
    }, 60000) // Refresh every 60 seconds as backup

    return () => clearInterval(interval)
  }, [fetchCount])

  return {
    globalCount,
    isLoading,
    error,
    lastUpdated,
    incrementCount,
    resetCount,
    refreshCount: fetchCount,
  }
}
