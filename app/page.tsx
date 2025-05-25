"use client"

import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import LandingPage from "@/components/landing-page"

export default function Home() {
  useEffect(() => {
    // Set default theme on mount
    const savedTheme = localStorage.getItem("theme")
    if (!savedTheme) {
      document.documentElement.classList.add("black-theme")
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8 fade-in-up">
          <h1 className="text-3xl font-bold">TrashTalk</h1>
          <ThemeToggle />
        </header>

        <LandingPage />

        <footer className="mt-16 text-center text-xs text-muted-foreground fade-in-up stagger-5">
          <p>🚀 Powered by AI. Offense not guaranteed, but highly likely.</p>
          <p className="mt-1">Built with questionable taste and solid tech.</p>
        </footer>
      </div>
    </main>
  )
}
