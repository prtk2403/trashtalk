"use client"

import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating emojis */}
      <div
        className="absolute top-20 left-10 text-4xl animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        💩
      </div>
      <div
        className="absolute top-40 right-20 text-3xl animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        🔥
      </div>
      <div
        className="absolute bottom-40 left-20 text-3xl animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "3.5s" }}
      >
        😂
      </div>
      <div
        className="absolute bottom-20 right-10 text-4xl animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
      >
        🚀
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
