"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Home,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Zap,
  Brain,
  Database,
  Globe,
  Shield,
  Sparkles,
  Target,
  RefreshCw,
  Heart,
  Eye,
  Cpu,
  Activity,
  Gauge,
  X,
} from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

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
          <p>Loading How It Works...</p>
        </div>
      </div>
    )
  }

  const sections = [
    { id: "overview", title: "Overview", icon: <Eye className="h-4 w-4" /> },
    { id: "viral-potential", title: "Viral Potential", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "chaos-meter", title: "Chaos Meter", icon: <Zap className="h-4 w-4" /> },
    { id: "sanity-remaining", title: "Sanity Remaining", icon: <Brain className="h-4 w-4" /> },
    { id: "data-storage", title: "Data & Privacy", icon: <Database className="h-4 w-4" /> },
    { id: "user-tracking", title: "User Identification", icon: <Shield className="h-4 w-4" /> },
    { id: "ai-generation", title: "AI Generation", icon: <Cpu className="h-4 w-4" /> },
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
              <h1 className="text-2xl font-bold">How It Works</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-2 text-sm ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Gauge className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">How TrashTalk Works</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A deep dive into the chaotic science behind your favorite tweet generator
              </p>
            </div>

            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      The Big Picture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      TrashTalk is more than just a random tweet generator - it&apos;s a carefully orchestrated symphony of
                      chaos, powered by cutting-edge AI and wrapped in a dashboard that tracks your descent into
                      internet madness.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          AI-Powered Generation
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Google&apos;s Gemini AI creates unique, contextual tweets based on your selected tone and custom
                          prompts.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Real-time Analytics
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your dashboard tracks everything from viral potential to sanity levels, updating in real-time
                          as you generate content.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Privacy-First Design
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Anonymous user identification means you get personalized analytics without sacrificing
                          privacy.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Global Community
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Join thousands of users contributing to the global chaos counter, tracked in real-time via
                          Supabase.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>The Dashboard Ecosystem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Your TrashTalk dashboard is divided into three main areas, each serving a specific purpose in
                        your journey to internet infamy:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border border-border rounded-lg">
                          <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">Control Center</h3>
                          <p className="text-xs text-muted-foreground">
                            Tone selection, custom prompts, and generation controls
                          </p>
                        </div>
                        <div className="text-center p-4 border border-border rounded-lg">
                          <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">Generation Zone</h3>
                          <p className="text-xs text-muted-foreground">
                            Where the magic happens - your tweets come to life here
                          </p>
                        </div>
                        <div className="text-center p-4 border border-border rounded-lg">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">Analytics Hub</h3>
                          <p className="text-xs text-muted-foreground">
                            Track your chaos levels, history, and viral potential
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Viral Potential Section */}
            {activeSection === "viral-potential" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Viral Potential Meter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">What is Viral Potential?</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        The Viral Potential meter is our proprietary algorithm that predicts how likely your generated
                        tweet is to blow up on social media. Think of it as a crystal ball, but for internet chaos.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">How It&apos;s Calculated</h3>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Base Score</span>
                            <span className="text-sm font-mono">50%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Session Activity Bonus</span>
                            <span className="text-sm font-mono">+5% per tweet (max 40%)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Chaos Factor</span>
                            <span className="text-sm font-mono">+0-10% (random)</span>
                          </div>
                          <div className="border-t border-border pt-2">
                            <div className="flex items-center justify-between font-semibold">
                              <span className="text-sm">Total Potential</span>
                              <span className="text-sm font-mono">50-99%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Factors That Increase Viral Potential</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• More tweets generated in your session</li>
                          <li>• Active engagement with the platform</li>
                          <li>• Random chaos factor (because internet)</li>
                          <li>• Global tweet momentum</li>
                          <li>• Time of day (3am tweets hit different)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What It Actually Means</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>50-60%:</span>
                            <span className="text-muted-foreground">Solid meme potential</span>
                          </div>
                          <div className="flex justify-between">
                            <span>61-75%:</span>
                            <span className="text-muted-foreground">Getting spicy 🌶️</span>
                          </div>
                          <div className="flex justify-between">
                            <span>76-90%:</span>
                            <span className="text-muted-foreground">Viral territory</span>
                          </div>
                          <div className="flex justify-between">
                            <span>91-99%:</span>
                            <span className="text-muted-foreground">Internet breaking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>The Science Behind the Magic</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Our Viral Potential algorithm combines real user behavior patterns with a healthy dose of
                      randomness (because let&apos;s be honest, nobody really knows why some tweets go viral).
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Pro Tip
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The meter updates in real-time as you generate more content. The more chaotic your session, the
                        higher your viral potential climbs. It&apos;s like a video game, but for social media dominance.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Chaos Meter Section */}
            {activeSection === "chaos-meter" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      The Chaos Meter Explained
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">What is the Chaos Meter?</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        The Chaos Meter tracks your current level of unhinged energy. It&apos;s not just a number - it&apos;s a
                        reflection of your journey into the beautiful madness of internet culture.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Chaos Levels Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                          <div>
                            <span className="font-semibold">Dormant</span>
                            <p className="text-xs text-muted-foreground">0 tweets generated</p>
                          </div>
                          <span className="text-sm text-muted-foreground">Standard operation</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div>
                            <span className="font-semibold">Warming Up</span>
                            <p className="text-xs text-muted-foreground">1-2 tweets generated</p>
                          </div>
                          <span className="text-sm text-muted-foreground"> Initial engagement</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div>
                            <span className="font-semibold">Getting Spicy</span>
                            <p className="text-xs text-muted-foreground">3-4 tweets generated</p>
                          </div>
                          <span className="text-sm text-muted-foreground">Noteworthy activity</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <div>
                            <span className="font-semibold">Full Chaos</span>
                            <p className="text-xs text-muted-foreground">5-9 tweets generated</p>
                          </div>
                          <span className="text-sm text-muted-foreground">Advanced engagement</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div>
                            <span className="font-semibold">MAXIMUM OVERDRIVE</span>
                            <p className="text-xs text-muted-foreground">10+ tweets generated</p>
                          </div>
                          <span className="text-sm text-muted-foreground">Unconventional brilliance</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">How It Affects Generation</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Higher chaos = more unpredictable content</li>
                          <li>• Influences AI temperature settings</li>
                          <li>• Affects viral potential calculations</li>
                          <li>• Unlocks special generation modes</li>
                          <li>• Changes the tone of system prompts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Session Persistence</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Resets when you close the browser</li>
                          <li>• Saved locally for your session</li>
                          <li>• Tied to your anonymous user ID</li>
                          <li>• Influences your personal statistics</li>
                          <li>• Affects recommendation algorithms</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>The Psychology of Chaos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      The Chaos Meter isn&apos;t just a fun metric - it&apos;s based on real psychological principles about
                      creativity and disinhibition. As you generate more content, you naturally become more comfortable
                      with absurdity and randomness.
                    </p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Fun Fact
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Studies show that creative output increases with repeated attempts. The Chaos Meter gamifies
                        this process, encouraging you to push your creative boundaries while having fun.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sanity Remaining Section */}
            {activeSection === "sanity-remaining" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Sanity Remaining: A Delicate Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">What is Sanity Remaining?</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        The Sanity Remaining indicator is our way of tracking how far you&apos;ve descended
                        into the beautiful madness of internet culture. This metric is inversely related to your activity: a higher volume of engagement, like those rapidly generated tweets, will reflect a charmingly lower &quot;sanity&quot; level.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">How It&apos;s Calculated</h3>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Starting Sanity</span>
                            <span className="text-sm font-mono">100%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Sanity Loss per Tweet</span>
                            <span className="text-sm font-mono">-10%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Minimum Sanity</span>
                            <span className="text-sm font-mono">0% (Maximum Chaos)</span>
                          </div>
                          <div className="border-t border-border pt-2">
                            <div className="flex items-center justify-between font-semibold">
                              <span className="text-sm">Formula</span>
                              <span className="text-sm font-mono">max(100 - (tweets × 10), 0)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 lg:gap-40">
                      <div>
                        <h4 className="font-semibold mb-2">Sanity Levels & Their Meanings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-green-500/10 rounded">
                            <span>100-80%:</span>
                            <span className="text-muted-foreground">Still intact</span>
                          </div>
                          <div className="flex justify-between p-2 bg-yellow-500/10 rounded">
                            <span>79-50%:</span>
                            <span className="text-muted-foreground">Questionable choices</span>
                          </div>
                          <div className="flex justify-between p-2 bg-orange-500/10 rounded">
                            <span>49-20%:</span>
                            <span className="text-muted-foreground">Embracing chaos</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-500/10 rounded">
                            <span>19-1%:</span>
                            <span className="text-muted-foreground">Declining rapidly</span>
                          </div>
                          <div className="flex justify-between p-2 bg-purple-500/10 rounded">
                            <span>0%:</span>
                            <span className="text-muted-foreground">Full internet mode</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 mt-6">What Happens at 0% Sanity?</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• You&apos;ve achieved peak internet energy</li>
                          <li>• Maximum chaos mode is unlocked</li>
                          <li>• AI generates more unhinged content</li>
                          <li>• Special achievements are earned</li>
                          <li>• You&apos;re officially part of the chaos club</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Sanity Management & Recovery</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Don&apos;t worry - your sanity loss is purely virtual and resets with each session. Think of it as a
                      creative license to be increasingly absurd without real-world consequences.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          How to Reset Sanity
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Start a new browser session</li>
                          <li>• Use the &quot;Reset Session Stats&quot; button</li>
                          <li>• Clear your browser&apos;s local storage</li>
                          <li>• Take a break and come back later</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Embracing Low Sanity
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Low sanity &rarr; high creativity</li>
                          <li>• More unpredictable content</li>
                          <li>• Higher viral potential</li>
                          <li>• Unlocks special features</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Remember
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The Sanity Remaining meter is purely for entertainment. In reality, using TrashTalk might
                        actually improve your creativity and sense of humor. Side effects may include increased
                        followers and spontaneous laughter.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Data Storage Section */}
            {activeSection === "data-storage" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Data Storage & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">What We Store vs. What We Don&apos;t</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        TrashTalk follows a strict &quot;privacy-first&quot; approach. We store just enough data to make your
                        experience awesome, but never enough to compromise your privacy.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-400">
                          <X className="h-4 w-4" />
                          What We DON&apos;T Store
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Your generated tweets or content</li>
                          <li>• Email addresses or personal info</li>
                          <li>• Login credentials (no accounts needed!)</li>
                          <li>• Browsing history or tracking data</li>
                          <li>• IP addresses or location data</li>
                          <li>• Any personally identifiable information</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-400">
                          <Database className="h-4 w-4" />
                          What We DO Store
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Anonymous user IDs (no personal data)</li>
                          <li>• Global tweet generation counter</li>
                          <li>• Visitor count for analytics</li>
                          <li>• Basic browser info (language, timezone)</li>
                          <li>• Session statistics (locally)</li>
                          <li>• User preferences (locally)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Where Your Data Lives</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg text-center">
                        <Zap className="h-8 w-8 mx-auto mb-2 text-primary fill-primary" />
                          <h4 className="font-semibold mb-1">Supabase</h4>
                          <p className="text-xs text-muted-foreground">Anonymous analytics and global counters</p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold mb-1">Your Browser</h4>
                          <p className="text-xs text-muted-foreground">Session data and preferences (localStorage)</p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold mb-1">Nowhere Else</h4>
                          <p className="text-xs text-muted-foreground">Generated content is immediately discarded</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Data Flow & Processing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold">The Journey of Your Data</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <div>
                            <h5 className="font-semibold">Generation Request</h5>
                            <p className="text-xs text-muted-foreground">
                              Your prompt is sent to Gemini AI, processed, and immediately discarded
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <div>
                            <h5 className="font-semibold">Analytics Update</h5>
                            <p className="text-xs text-muted-foreground">
                              Anonymous counters are incremented in Supabase database
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <div>
                            <h5 className="font-semibold">Local Storage</h5>
                            <p className="text-xs text-muted-foreground">
                              Session data is saved locally in your browser for dashboard updates
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                            4
                          </div>
                          <div>
                            <h5 className="font-semibold">Content Delivery</h5>
                            <p className="text-xs text-muted-foreground">
                              Generated tweet is displayed to you and then forgotten by our servers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Tracking Section */}
            {activeSection === "user-tracking" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Anonymous User Identification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">How We Know It&apos;s You (Without Knowing Who You Are)</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        TrashTalk uses a sophisticated anonymous identification system that gives you a personalized
                        experience without compromising your privacy. It&apos;s like having a secret identity, but for tweet
                        generation.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">The Anonymous ID Generation Process</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-background border border-border rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Cpu className="h-4 w-4" />
                            Browser Fingerprinting
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            We collect non-invasive browser characteristics to create a unique fingerprint:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                            <li>• Screen resolution and color depth</li>
                            <li>• Browser language and timezone</li>
                            <li>• Hardware concurrency (CPU cores)</li>
                            <li>• Canvas rendering signature</li>
                            <li>• User agent string</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-background border border-border rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Random Salt Addition
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            The fingerprint is combined with random data and timestamps to create a unique,
                            non-reversible identifier that can&apos;t be traced back to you personally.
                          </p>
                        </div>
                        <div className="p-4 bg-background border border-border rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            Local Storage
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Your anonymous ID is stored locally in your browser, ensuring consistency across sessions
                            while keeping control in your hands.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Benefits of Anonymous Tracking</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Personalized dashboard statistics</li>
                          <li>• Session continuity across page reloads</li>
                          <li>• Accurate visitor counting</li>
                          <li>• Improved user experience</li>
                          <li>• No login or registration required</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Privacy Protections</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• No personal information collected</li>
                          <li>• IDs cannot be reverse-engineered</li>
                          <li>• You can reset your ID anytime</li>
                          <li>• Data stays in your browser</li>
                          <li>• GDPR and privacy law compliant</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Taking Control of Your Identity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Your anonymous identity is entirely under your control. You can reset it, clear it, or start fresh
                      whenever you want.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-lg text-center">
                        <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Reset Identity</h4>
                        <p className="text-xs text-muted-foreground">
                          Use the reset button in the dashboard to generate a new anonymous ID
                        </p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Clear Storage</h4>
                        <p className="text-xs text-muted-foreground">
                          Clear your browser&apos;s localStorage to remove all local data
                        </p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">View Your ID</h4>
                        <p className="text-xs text-muted-foreground">
                          Your current anonymous ID is displayed in the dashboard
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Generation Section */}
            {activeSection === "ai-generation" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      AI Generation Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">
                      <div className="flex items-center gap-1"> Powered by Google
                    <Image src="/gemini.svg" alt="Gemini" width={16} height={16} style={{ height: 'auto' }} />
                    <Link href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Gemini</Link>
                </div>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        TrashTalk uses Google&apos;s state-of-the-art Gemini AI model to generate unique, contextual, and
                        hilariously unhinged content. Each tweet is crafted specifically for your chosen tone and custom
                        prompts.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">How the AI Creates Your Tweets</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h5 className="font-semibold">System Prompt Injection</h5>
                            <p className="text-xs text-muted-foreground">
                              A carefully crafted system prompt tells the AI to be chaotic, funny, and internet-savvy
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-semibold">Tone Application</h5>
                            <p className="text-xs text-muted-foreground">
                              Your selected tone (Gen Z, Tech Bro, etc.) modifies the AI&apos;s personality and style
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="font-semibold">Randomization Layer</h5>
                            <p className="text-xs text-muted-foreground">
                              Random seeds and temperature settings ensure each generation is unique
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h5 className="font-semibold">Content Generation</h5>
                            <p className="text-xs text-muted-foreground">
                              Gemini processes everything and creates a tweet that&apos;s perfectly chaotic
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">AI Parameters We Tune</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Temperature (0.8-1.2) for creativity</li>
                          <li>• Top-K (30-50) for word selection</li>
                          <li>• Top-P (0.85-0.95) for coherence</li>
                          <li>• Max tokens (300) for length control</li>
                          <li>• Random seeds for uniqueness</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Quality Assurance</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Content filtering for appropriateness</li>
                          <li>• Length validation (280 char limit)</li>
                          <li>• Fallback system for API failures</li>
                          <li>• Error handling and retry logic</li>
                          <li>• Manual curation of system prompts</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>The Science of Chaos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Creating consistently funny, unpredictable content is harder than it looks. Our AI system combines
                      multiple techniques to ensure each tweet is a unique masterpiece of controlled chaos.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Prompt Engineering
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Our system prompts are carefully crafted to encourage creativity while maintaining quality.
                          They&apos;re updated regularly based on user feedback and AI behavior patterns.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Dynamic Adaptation
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          The AI adapts to your chaos level, generating increasingly unhinged content as your session
                          progresses. It&apos;s like having a creative partner that matches your energy.
                        </p>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        The Magic Formula
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Great AI-generated content = (Solid prompts + Random creativity + User context + A dash of
                        chaos) × Internet culture knowledge. It&apos;s part science, part art, and part beautiful accident.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center space-y-4 pt-8">
              <p className="text-muted-foreground">Ready to put this knowledge to chaotic use?</p>
              <Link href="/generate">
                <Button size="lg" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Generating for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
