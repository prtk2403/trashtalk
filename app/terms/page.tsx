"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, FileText, AlertTriangle, Scale, Shield, Clock } from "lucide-react"

export default function TermsPage() {
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
          <p>Loading Terms of Use...</p>
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
              <h1 className="text-2xl font-bold">Terms of Use</h1>
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
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Terms of Use</h1>
            <p className="text-xl text-muted-foreground">The rules of the chaos game</p>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Important Notice */}
          <Card className="bg-orange-500/10 border-orange-500/20 border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-400 mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TrashTalk generates satirical and humorous content using AI. While we strive to keep content
                    appropriate, the AI may occasionally produce unexpected results. Use generated content responsibly
                    and at your own discretion. <strong>Offense not guaranteed, but highly likely.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {/* Acceptance of Terms */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By accessing and using TrashTalk ("the Service"), you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  These terms apply to all visitors, users, and others who access or use the service.
                </p>
              </CardContent>
            </Card>

            {/* Use of the Service */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Use of the Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Permitted Use</h3>
                  <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                    <li>• Generate humorous and satirical content for personal use</li>
                    <li>• Share generated content on social media platforms</li>
                    <li>• Use the service for entertainment and creative purposes</li>
                    <li>• Access the service through supported web browsers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prohibited Use</h3>
                  <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                    <li>• Generate content intended to harass, threaten, or harm others</li>
                    <li>• Use the service for illegal activities or to violate others' rights</li>
                    <li>• Attempt to reverse engineer, hack, or exploit the service</li>
                    <li>• Use automated tools to spam or abuse the service</li>
                    <li>• Impersonate others or misrepresent your identity</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Content and Responsibility */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Content and Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Generated Content</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Content generated by TrashTalk is created by AI and may not reflect the views, opinions, or beliefs
                    of the service creators. Users are solely responsible for how they use, share, or distribute
                    generated content.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Responsibility</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    You are responsible for ensuring that your use of generated content complies with applicable laws,
                    platform terms of service, and community guidelines. We recommend reviewing content before sharing
                    publicly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Content Ownership</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    You retain ownership of any content you generate using TrashTalk. We do not claim ownership of
                    generated content and do not store it on our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy and Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your privacy is important to us. Our data collection and usage practices are detailed in our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  . Key points include:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• We do not store your generated tweets or content</li>
                  <li>• We use anonymous identifiers for analytics</li>
                  <li>• No personal information is required to use the service</li>
                  <li>• Local storage is used for preferences and session data</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We strive to maintain high availability but cannot guarantee uninterrupted service. The service may
                    be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Modifications</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue the service at any time without notice. We
                    may also update features, change the user interface, or modify functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers and Limitations */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Disclaimers and Limitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service "As Is"</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    TrashTalk is provided "as is" without warranties of any kind. We do not guarantee the accuracy,
                    reliability, or appropriateness of generated content.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages resulting from your use of the service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Third-Party Services</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our service integrates with third-party APIs (Google Gemini) and services (Supabase, Vercel). We are
                    not responsible for the availability, accuracy, or content of these external services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We reserve the right to update these terms at any time. Changes will be posted on this page with an
                  updated "Last modified" date. Your continued use of the service after changes constitutes acceptance
                  of the new terms.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  For significant changes, we may provide additional notice through the service interface or other
                  communication methods.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us through our{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact page
                  </Link>{" "}
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
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-muted-foreground text-sm">
              By using TrashTalk, you agree to these terms and our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
            <Link href="/generate">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                I Agree - Let's Generate Some Chaos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
