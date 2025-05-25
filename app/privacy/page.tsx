"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Shield, Eye, Database, Lock, UserCheck, Clock, Globe } from "lucide-react"

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Ensure theme is applied on page load
    try {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "white") {
        document.documentElement.classList.add("white-theme")
        document.documentElement.classList.remove("black-theme")
      } else {
        document.documentElement.classList.add("black-theme")
        document.documentElement.classList.remove("white-theme")
      }
    } catch (error) {
      console.warn("Theme initialization error:", error)
      document.documentElement.classList.add("black-theme")
      document.documentElement.classList.remove("white-theme")
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Privacy Policy...</p>
        </div>
      </div>
    )
  }

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
              <h1 className="text-2xl font-bold">Privacy Policy</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Your privacy matters. Here's how we protect it.</p>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Quick Summary */}
          <Card className="bg-card border-border border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                TL;DR - The Quick Version
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-400">What We DON'T Store</h3>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Your tweets or generated content</li>
                      <li>• Email addresses or personal info</li>
                      <li>• Login credentials (we don't have accounts!)</li>
                      <li>• Browsing history or tracking cookies</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Database className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-400">What We DO Store</h3>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Anonymous user IDs (no personal data)</li>
                      <li>• Global tweet generation counter</li>
                      <li>• Visitor count for analytics</li>
                      <li>• Basic browser info (language, timezone)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <div className="space-y-6">
            {/* Data Collection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Collection & Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Anonymous User Identification</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We generate a unique, anonymous identifier for each user using browser characteristics and random
                    data. This ID cannot be traced back to you personally and is used solely for session management and
                    analytics.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Visitor Analytics</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We track basic visitor statistics including total unique visitors, visit counts, browser language,
                    and timezone. This helps us understand usage patterns and improve the service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Generated Content</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong>Important:</strong> We do NOT store any tweets or content you generate. The generation
                    process is completely stateless - your content is created, displayed to you, and immediately
                    discarded from our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Protect You */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  How We Protect Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">No Account Required</h3>
                    <p className="text-muted-foreground text-sm">
                      You can use TrashTalk without creating an account, providing an email, or sharing any personal
                      information.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Local Storage Only</h3>
                    <p className="text-muted-foreground text-sm">
                      Your preferences and session data are stored locally in your browser, not on our servers.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Encrypted Connections</h3>
                    <p className="text-muted-foreground text-sm">
                      All communication between your browser and our servers is encrypted using HTTPS/TLS.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Minimal Data Collection</h3>
                    <p className="text-muted-foreground text-sm">
                      We only collect the absolute minimum data necessary to provide the service and basic analytics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third Party Services */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Google Gemini</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use Google's Gemini AI to generate content. Your prompts are sent to Google's servers for
                    processing, but we don't store them. Please review
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google's Privacy Policy
                    </a>{" "}
                    for their data handling practices.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Supabase</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use Supabase for database services to store anonymous analytics data. Supabase is SOC 2 Type 2
                    certified and follows industry-standard security practices.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Vercel</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our application is hosted on Vercel, which may collect basic server logs for security and
                    performance monitoring.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Your Rights & Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Reset Your Identity</h3>
                    <p className="text-muted-foreground text-sm">
                      You can reset your anonymous user ID at any time using the reset button in the generator
                      dashboard.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Clear Local Data</h3>
                    <p className="text-muted-foreground text-sm">
                      Clear your browser's local storage to remove all locally stored preferences and session data.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">No Tracking</h3>
                    <p className="text-muted-foreground text-sm">
                      We don't use tracking cookies, analytics pixels, or any other tracking technologies beyond basic
                      visitor counting.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Portability</h3>
                    <p className="text-muted-foreground text-sm">
                      Since we don't store your personal data, there's nothing to export or transfer - you're always in
                      control.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Updates */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Updates & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Policy Updates</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an
                    updated "Last modified" date. Continued use of the service constitutes acceptance of any changes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Questions or Concerns</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    If you have any questions about this privacy policy or our data practices, please contact us through
                    our{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact page{" "}
                    </Link>
                    or reach out on Twitter{" "}
                    <a
                      href="https://twitter.com/xyzprtk"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @xyzprtk
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-muted-foreground text-sm">Ready to generate some chaos while staying private?</p>
            <Link href="/generate">
              <Button size="lg" className=" mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
                Start Generating Tweets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
