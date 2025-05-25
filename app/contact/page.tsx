"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  Home,
  Mail,
  Twitter,
  Github,
  MessageCircle,
  Send,
  ExternalLink,
  Coffee,
  Bug,
  Lightbulb,
  Heart,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState("")
  const [contactType, setContactType] = useState("general")

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

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message before sending",
        variant: "destructive",
        duration: 3000,
      })
      return
    }
    const subject = encodeURIComponent(`TrashTalk ${contactType} - Contact Form`)
    const body = encodeURIComponent(`Hi there!\n\n${message}\n\nBest regards,\nA TrashTalk user`)
    const emailUrl = `mailto:prtk24.dev@gmail.com?subject=${subject}&body=${body}`

    window.open(emailUrl, "_blank")

    toast({
      title: "Email client opened",
      description: "Your default email client should open with the pre-filled message",
      duration: 5000,
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Contact Page...</p>
        </div>
      </div>
    )
  }

  const contactOptions = [
    {
      id: "general",
      title: "General Inquiry",
      description: "Questions, feedback, or just want to say hi",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      id: "bug",
      title: "Bug Report",
      description: "Found something broken? Let us know!",
      icon: <Bug className="h-5 w-5" />,
    },
    {
      id: "feature",
      title: "Feature Request",
      description: "Have an idea to make TrashTalk even better?",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Want to work together on something cool?",
      icon: <Coffee className="h-5 w-5" />,
    },
  ]

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
              <h1 className="text-2xl font-bold">Contact</h1>
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
              <Mail className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">Questions, feedback, or just want to chat about chaos?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Type Selection */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">What&apos;s this about?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {contactOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setContactType(option.id)}
                          className={`p-3 rounded-lg border text-left transition-all hover:border-primary/50 ${
                            contactType === option.id ? "border-primary bg-primary/10" : "border-border bg-background"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {option.icon}
                            <span className="font-medium text-sm">{option.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Message</label>
                    <Textarea
                      placeholder="Tell us what&apos;s on your mind..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <Button onClick={handleSendMessage} className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Open Email Client
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This will open your default email client with a pre-filled message
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-6">
              {/* Social Links */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-white" />
                    Connect With Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <a
                      href="https://twitter.com/xyzprtk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <Twitter className="h-5 w-5 text-blue-500 fill-blue-500" />
                      <div className="flex-1">
                        <div className="font-medium">Twitter</div>
                        <div className="text-sm text-muted-foreground">@xyzprtk</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </a>

                    <a
                      href="https://github.com/prtk2403/trashtalk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <Github className="h-5 w-5 fill-white" />
                      <div className="flex-1">
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">View the source code</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </a>

                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                      <Mail className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">prtk24.dev@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Quick Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Is TrashTalk free?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! TrashTalk is completely free to use. No hidden costs, no premium tiers.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Do you store my tweets?</h3>
                    <p className="text-sm text-muted-foreground">
                      Nope! We don&apos;t store any of your generated content. Check our{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        privacy policy
                      </Link>{" "}
                      for details.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Can I contribute?</h3>
                    <p className="text-sm text-muted-foreground">
                      TrashTalk is open source. Check out our GitHub repo to contribute.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Response time?</h3>
                    <p className="text-sm text-muted-foreground">
                      We try to respond within 24-48 hours, but sometimes life gets chaotic too!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Fun Stats */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Fun Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Built with</span>
                    <span className="text-sm font-medium">Next.js + Gemini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hosted on</span>
                    <span className="text-sm font-medium">Vercel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Database</span>
                    <span className="text-sm font-medium">Supabase</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Chaos level</span>
                    <span className="text-sm font-medium">Maximum</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-muted-foreground">Haven&apos;t tried TrashTalk yet? What are you waiting for?</p>
            <Link href="/generate">
              <Button size="lg" className=" mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
                Generate Your First Tweet
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
