"use client"

import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import GeneratorDashboard from "@/components/generator-dashboard"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GeneratePage() {
  useEffect(() => {
    // Ensure theme is applied on page load
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "white") {
      document.documentElement.classList.add("white-theme")
      document.documentElement.classList.remove("black-theme")
    } else {
      document.documentElement.classList.add("black-theme")
      document.documentElement.classList.remove("white-theme")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">TrashTalk Generator</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <GeneratorDashboard />
    </div>
  )
}
