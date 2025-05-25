"use client"

import { useState, useEffect } from "react"
import { UserIdentification } from "@/lib/user-identification"

export function useUserIdentification() {
  const [userId, setUserId] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const userIdValue = UserIdentification.getUserId()
      const sessionIdValue = UserIdentification.getSessionId()

      setUserId(userIdValue)
      setSessionId(sessionIdValue)
      setIsLoaded(true)
    }
  }, [])

  const resetUser = () => {
    if (typeof window !== "undefined") {
      const newUserId = UserIdentification.resetUserId()
      const newSessionId = UserIdentification.getSessionId()

      setUserId(newUserId)
      setSessionId(newSessionId)
    }
  }

  const getUserAnalytics = () => {
    if (typeof window !== "undefined") {
      return UserIdentification.getUserAnalytics()
    }
    return null
  }

  return {
    userId,
    sessionId,
    isLoaded,
    resetUser,
    getUserAnalytics,
  }
}
