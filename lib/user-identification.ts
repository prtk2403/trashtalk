"use client"

// User identification utility that creates unique user IDs without login
export class UserIdentification {
  private static readonly USER_ID_KEY = "trashtalk_user_id"
  private static readonly SESSION_ID_KEY = "trashtalk_session_id"

  // Generate a unique user ID based on browser characteristics and random data
  private static generateFingerprint(): string {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Canvas fingerprinting (basic)
    if (ctx) {
      ctx.textBaseline = "top"
      ctx.font = "14px Arial"
      ctx.fillText("TrashTalk fingerprint", 2, 2)
    }

    const canvasData = canvas.toDataURL()

    // Collect browser characteristics
    const characteristics = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      (navigator as any).deviceMemory || 0,
      canvasData.slice(-50), // Last 50 chars of canvas data
    ].join("|")

    // Create hash from characteristics
    let hash = 0
    for (let i = 0; i < characteristics.length; i++) {
      const char = characteristics.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36)
  }

  // Generate a random ID
  private static generateRandomId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  // Get or create a persistent user ID
  static getUserId(): string {
    try {
      // Try to get existing user ID from localStorage
      let userId = localStorage.getItem(this.USER_ID_KEY)

      if (!userId) {
        // Generate new user ID combining fingerprint and random data
        const fingerprint = this.generateFingerprint()
        const randomPart = this.generateRandomId()
        userId = `user_${fingerprint}_${randomPart}`

        // Store in localStorage
        localStorage.setItem(this.USER_ID_KEY, userId)
      }

      return userId
    } catch (error) {
      console.warn("Error accessing localStorage for user ID:", error)
      // Fallback to session-based ID if localStorage fails
      return `temp_${this.generateRandomId()}`
    }
  }

  // Get or create a session ID (changes each browser session)
  static getSessionId(): string {
    try {
      let sessionId = sessionStorage.getItem(this.SESSION_ID_KEY)

      if (!sessionId) {
        sessionId = `session_${this.generateRandomId()}`
        sessionStorage.setItem(this.SESSION_ID_KEY, sessionId)
      }

      return sessionId
    } catch (error) {
      console.warn("Error accessing sessionStorage for session ID:", error)
      return `temp_session_${this.generateRandomId()}`
    }
  }

  // Get user analytics data
  static getUserAnalytics() {
    const userId = this.getUserId()
    const sessionId = this.getSessionId()

    return {
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  // Reset user ID (for testing or privacy)
  static resetUserId(): string {
    try {
      localStorage.removeItem(this.USER_ID_KEY)
      sessionStorage.removeItem(this.SESSION_ID_KEY)
    } catch (error) {
      console.warn("Error clearing user identification:", error)
    }

    return this.getUserId()
  }
}
