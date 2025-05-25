"use client"

import { useState, useEffect } from "react"
import { useUserIdentification } from "@/hooks/use-user-identification"

interface VisitorData {
  totalVisitors: number
  userVisitCount: number
  isNewVisitor: boolean
  isLoading: boolean
  error: string | null
}

export function useVisitorTracking() {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    totalVisitors: 0,
    userVisitCount: 0,
    isNewVisitor: false,
    isLoading: true,
    error: null,
  })

  const { userId, isLoaded: userLoaded, getUserAnalytics } = useUserIdentification()

  useEffect(() => {
    if (!userLoaded || !userId) return

    const trackVisitor = async () => {
      try {
        const analytics = getUserAnalytics()

        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userAgent: analytics?.userAgent,
            timezone: analytics?.timezone,
            language: analytics?.language,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        setVisitorData({
          totalVisitors: data.totalVisitors,
          userVisitCount: data.userVisitCount,
          isNewVisitor: data.isNewVisitor,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error tracking visitor:", error)
        setVisitorData((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to track visitor",
        }))
      }
    }

    trackVisitor()
  }, [userId, userLoaded, getUserAnalytics])

  const refreshVisitorData = async () => {
    if (!userId) return

    try {
      const response = await fetch("/api/visitors", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setVisitorData((prev) => ({
        ...prev,
        totalVisitors: data.totalVisitors,
        error: null,
      }))
    } catch (error) {
      console.error("Error refreshing visitor data:", error)
    }
  }

  return {
    ...visitorData,
    refreshVisitorData,
  }
}
