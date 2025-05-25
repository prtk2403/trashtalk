"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false)

  useEffect(() => {
    try {
      // Check if user has a theme preference in localStorage
      const savedTheme = localStorage.getItem("theme")
      const preferWhite = savedTheme === "white"
      setIsWhiteTheme(preferWhite)

      // Apply theme to document
      if (preferWhite) {
        document.documentElement.classList.add("white-theme")
        document.documentElement.classList.remove("black-theme")
      } else {
        document.documentElement.classList.add("black-theme")
        document.documentElement.classList.remove("white-theme")
      }
    } catch (error) {
      console.warn("Theme initialization error:", error)
      // Default to black theme
      document.documentElement.classList.add("black-theme")
      document.documentElement.classList.remove("white-theme")
    }
  }, [])

  const toggleTheme = () => {
    try {
      const newTheme = !isWhiteTheme
      setIsWhiteTheme(newTheme)
      localStorage.setItem("theme", newTheme ? "white" : "black")

      if (newTheme) {
        document.documentElement.classList.add("white-theme")
        document.documentElement.classList.remove("black-theme")
      } else {
        document.documentElement.classList.add("black-theme")
        document.documentElement.classList.remove("white-theme")
      }
    } catch (error) {
      console.warn("Theme toggle error:", error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all hover:scale-110 border-2 border-current"
    >
      {isWhiteTheme ? <Moon className="h-5 w-5 text-black" /> : <Sun className="h-5 w-5 text-white" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
