"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import LandingPage from "@/components/landing-page"
import { Trash } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Set default theme on mount
    try {
      const savedTheme = localStorage.getItem("theme")
      if (!savedTheme) {
        document.documentElement.classList.add("black-theme")
        localStorage.setItem("theme", "black")
      }
    } catch (error) {
      console.warn("Theme initialization error:", error)
      document.documentElement.classList.add("black-theme")
    }
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading TrashTalk...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8 fade-in-up">
          <div className="flex items-center">
          <span className="text-muted-foreground"> <Trash className="fill-muted-foreground h-6 w-6 mr-2"/></span>
          <h1 className="text-3xl font-bold font-sans">Trash</h1>
          <h1 className="text-3xl  text-muted-foreground font-bold font-sans">Talk</h1>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <Link href="/contact">
                <span className="text-muted-foreground">Contact Us</span>
            </Link>
            <Link href="/privacy">
              <span className="text-muted-foreground">Privacy Policy</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 justify-between">
          <ThemeToggle />
            <Link href="/generate">
              <Button size="lg" className=" mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Generate Your First Tweet
              </Button>
            </Link>
          </div>
        </header>

        <LandingPage />
        <Footer />
      </div>
    </main>
  )
}
