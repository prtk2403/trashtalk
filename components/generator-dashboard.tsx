"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TweetCard } from "@/components/tweet-card"
import {
  Zap,
  Clock,
  TrendingUp,
  RefreshCw,
  BarChart3,
  Lightbulb,
  Target,
  Wand2,
  Globe,
  User,
  Database,
  Shield,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Spinner } from "@/components/ui/spinner"
import { useGlobalTweetCount } from "@/hooks/use-global-tweet-count"
import { useUserIdentification } from "@/hooks/use-user-identification"

const toneDescriptions = {
  "gen-z": {
    name: "Gen Z Burnout",
    description: "Existential dread meets internet slang",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    examples: ["me: adulting is hard", "why is everything so expensive", "mental health? never heard of her"],
  },
  "tech-bro": {
    name: "Tech Bro Manifesto",
    description: "Hustle culture meets delusion",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    examples: ["disrupting the sleep industry", "my morning routine at 4am", "passive income mindset"],
  },
  corporate: {
    name: "Corporate Cringe",
    description: "Buzzwords and synergy overload",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
    examples: ["let's circle back on this", "thinking outside the box", "low-hanging fruit"],
  },
  absurdist: {
    name: "Absurdist Nihilism",
    description: "Chaos theory meets philosophy",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    examples: ["what if chairs had feelings", "the void stares back", "existence is a simulation"],
  },
  anime: {
    name: "Anime Lord",
    description: "Weeb culture at maximum power",
    color: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    examples: ["my waifu understands me", "this isn't even my final form", "believe it!"],
  },
}

const tips = [
  "💡 Try combining different tones for unique results",
  "🎯 Shorter prompts often generate funnier content",
  "⚡ The AI learns from your reactions - be chaotic!",
  "🔥 Peak posting hours: 3am when everyone's unhinged",
  "🎭 Each tone has its own personality - experiment!",
  "🌍 You're contributing to the global chaos counter!",
  "📊 Supabase updates in real-time across all users",
  "🔄 Real-time database sync keeps everyone connected",
  "🔒 Your identity is anonymous but unique",
  "🎲 Each generation is completely randomized",
]

export default function GeneratorDashboard() {
  const [shitpost, setShitpost] = useState("")
  const [tone, setTone] = useState("gen-z")
  const [customPrompt, setCustomPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [currentTip, setCurrentTip] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  // Use the global tweet count hook with Supabase
  const {
    globalCount,
    isLoading: isLoadingCount,
    error: countError,
    lastUpdated,
    incrementCount,
    refreshCount,
  } = useGlobalTweetCount()

  // Use user identification hook
  const { userId, sessionId, isLoaded: userLoaded, resetUser, getUserAnalytics } = useUserIdentification()

  // Load session data from localStorage on component mount
  useEffect(() => {
    if (!userLoaded) return

    try {
      const savedSessionCount = localStorage.getItem(`trashtalk_session_count_${userId}`)
      const savedHistory = localStorage.getItem(`trashtalk_history_${userId}`)

      if (savedSessionCount) {
        setSessionCount(Number.parseInt(savedSessionCount, 10) || 0)
      }

      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory)
          setHistory(Array.isArray(parsedHistory) ? parsedHistory : [])
        } catch {
          setHistory([])
        }
      }

      setSessionStartTime(new Date())
    } catch (error) {
      console.warn("Error loading session data from localStorage:", error)
      setSessionStartTime(new Date())
    }
  }, [userId, userLoaded])

  // Save session data to localStorage whenever it changes
  useEffect(() => {
    if (!userLoaded || !userId) return

    try {
      localStorage.setItem(`trashtalk_session_count_${userId}`, sessionCount.toString())
      localStorage.setItem(`trashtalk_history_${userId}`, JSON.stringify(history))
    } catch (error) {
      console.warn("Error saving session data to localStorage:", error)
    }
  }, [sessionCount, history, userId, userLoaded])

  useEffect(() => {
    // Rotate tips every 5 seconds
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Calculate dynamic stats
  const getSessionDuration = () => {
    if (!sessionStartTime) return "0m"
    const now = new Date()
    const diffMs = now.getTime() - sessionStartTime.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 60) {
      return `${diffMins}m`
    } else {
      const hours = Math.floor(diffMins / 60)
      const mins = diffMins % 60
      return `${hours}h ${mins}m`
    }
  }

  const getChaosLevel = () => {
    if (sessionCount === 0) return "Dormant"
    if (sessionCount < 3) return "Warming Up"
    if (sessionCount < 5) return "Getting Spicy"
    if (sessionCount < 10) return "Full Chaos"
    return "MAXIMUM OVERDRIVE"
  }

  const getSanityPercentage = () => {
    const maxSanity = 100
    const sanityLoss = Math.min(sessionCount * 10, maxSanity)
    return Math.max(maxSanity - sanityLoss, 0)
  }

  const getViralPotential = () => {
    const base = 50
    const bonus = Math.min(sessionCount * 5, 40)
    const randomFactor = Math.floor(Math.random() * 10)
    return Math.min(base + bonus + randomFactor, 99)
  }

  const formatLastUpdated = () => {
    if (!lastUpdated) return ""
    const date = new Date(lastUpdated)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)

    if (diffSecs < 60) return "Just now"
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`
    return `${Math.floor(diffSecs / 3600)}h ago`
  }

  const stats = [
    {
      label: "Global Tweets",
      value: isLoadingCount ? "Loading..." : globalCount.toLocaleString(),
      icon: <Globe className="h-4 w-4" />,
      subtitle: countError ? "Supabase error" : `Updated ${formatLastUpdated()}`,
      isGlobal: true,
    },
    {
      label: "Your Session",
      value: sessionCount.toString(),
      icon: <User className="h-4 w-4" />,
      subtitle: `${getSessionDuration()} active`,
      isGlobal: false,
    },
    {
      label: "Chaos Level",
      value: getChaosLevel(),
      icon: <TrendingUp className="h-4 w-4" />,
      subtitle: `${sessionCount} generations`,
      isGlobal: false,
    },
    {
      label: "Sanity Remaining",
      value: `${getSanityPercentage()}%`,
      icon: <BarChart3 className="h-4 w-4" />,
      subtitle: sessionCount > 0 ? "Declining rapidly" : "Still intact",
      isGlobal: false,
    },
  ]

  const generateShitpost = async () => {
    // Prevent rapid successive calls
    if (isGenerating) return

    setIsGenerating(true)

    try {
      // Add small random delay to ensure uniqueness
      await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

      // Get user analytics for the request
      const analytics = getUserAnalytics()

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          tone,
          customPrompt: customPrompt.trim() || undefined,
          timestamp: Date.now(),
          sessionId: sessionId,
          userId: userId,
          analytics,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.shitpost) {
        throw new Error("No content received from server")
      }

      setShitpost(data.shitpost)

      // Increment session count
      setSessionCount((prev) => prev + 1)

      // Increment global count in Supabase
      const newGlobalCount = await incrementCount()

      // Add to history
      setHistory((prev) => [data.shitpost, ...prev.slice(0, 4)])

      // Show success message with both counts
      if (data.fallback) {
        toast({
          title: "Using backup chaos",
          description: data.message || "API temporarily unavailable, but chaos continues!",
          duration: 3000,
        })
      } else {
        toast({
          title: "Chaos unleashed globally!",
          description: `Tweet #${newGlobalCount} added to Supabase database`,
          duration: 3000,
        })
      }
    } catch (err) {
      console.error("Error generating shitpost:", err)

      // Provide a client-side fallback
      const clientFallbacks = [
        "me: i should sleep\nalso me: researching if penguins have knees",
        "normalize saying 'that&apos;s above my pay grade' when someone asks what 2+2 equals",
        "my toxic trait is thinking I can finish a project in one day that actually takes six months",
      ]

      const fallbackPost = clientFallbacks[Math.floor(Math.random() * clientFallbacks.length)]
      setShitpost(fallbackPost)

      // Still increment counts for fallback
      setSessionCount((prev) => prev + 1)
      await incrementCount() // Try to increment global count even for fallbacks
      setHistory((prev) => [fallbackPost, ...prev.slice(0, 4)])

      toast({
        title: "Chaos never stops!",
        description: "Network hiccup detected, but we've got backup chaos ready",
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const resetSessionStats = () => {
    setSessionCount(0)
    setHistory([])
    setShitpost("")
    setCustomPrompt("")
    setTone("gen-z")
    setSessionStartTime(new Date())

    try {
      localStorage.removeItem(`trashtalk_session_count_${userId}`)
      localStorage.removeItem(`trashtalk_history_${userId}`)
    } catch (error) {
      console.warn("Error clearing localStorage:", error)
    }

    toast({
      title: "Session reset",
      description: "Starting fresh with a clean slate",
      duration: 2000,
    })
  }

  const selectedTone = toneDescriptions[tone as keyof typeof toneDescriptions]

  // Show loading state until user identification is ready
  if (!userLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-muted-foreground">Initializing your chaos session...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Sidebar - Controls & Info */}
        <div className="space-y-6">
          {/* Dynamic Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`bg-card border-border hover:border-foreground/50 transition-all duration-300 ${
                  stat.isGlobal ? "ring-1 ring-blue-500/20" : ""
                }`}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex justify-center mb-2 text-muted-foreground">
                    {stat.isGlobal && <Database className="h-3 w-3 mr-1" />}
                    {stat.icon}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  {stat.subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{stat.subtitle}</div>}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Identity Status */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-semibold">Anonymous Identity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <Button variant="ghost" size="sm" onClick={resetUser} className="ml-auto h-6 px-2">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                ID: {userId.slice(0, 20)}...
              </div>
            </CardContent>
          </Card>

          {/* Supabase Status */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-semibold">Supabase Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      countError ? "bg-red-500" : isLoadingCount ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {countError ? "Error" : isLoadingCount ? "Loading" : "Connected"}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={refreshCount} className="ml-auto h-6 px-2">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              {countError && <div className="mt-2 text-xs text-red-400 bg-red-900/20 p-2 rounded">{countError}</div>}
            </CardContent>
          </Card>

          {/* Tone Selection */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Choose Your Chaos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {Object.entries(toneDescriptions).map(([key, desc]) => (
                    <SelectItem key={key} value={key}>
                      {desc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className={`p-3 rounded-lg border ${selectedTone.color}`}>
                <div className="font-semibold mb-1 text-sm">{selectedTone.name}</div>
                <div className="text-xs opacity-80 mb-2">{selectedTone.description}</div>
                <div className="text-xs">
                  <strong>Examples:</strong> {selectedTone.examples.join(" • ")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Prompt */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5" />
                Custom Chaos (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add your own twist... (e.g., &apos;about cats&apos;, &apos;involving pizza&apos;, &apos;existential crisis&apos;)"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="bg-background border-border resize-none text-sm"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <div className="font-semibold text-sm mb-1">Pro Tip</div>
                  <div className="text-sm text-muted-foreground transition-all duration-500">{tips[currentTip]}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Main Generator */}
        <div className="space-y-6">
          {/* Generation Button */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ready to Go Viral?</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Generate {sessionCount > 0 ? "another" : "your first"} masterpiece of chaos
                  </p>
                  {sessionCount > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      You're on a roll! {sessionCount} tweet{sessionCount !== 1 ? "s" : ""} this session
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    🌍 Contributing to {globalCount.toLocaleString()} global tweets in Supabase
                  </p>
                </div>

                <Button
                  onClick={generateShitpost}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-foreground text-background hover:scale-105 transition-all duration-300 group"
                >
                  {isGenerating ? (
                    <>
                      <Spinner size="sm" className="mr-3" />
                      Brewing Chaos...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />💩
                      Unleash the Chaos
                    </>
                  )}
                </Button>

                {sessionCount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    🎉 Session chaos: {sessionCount} tweet{sessionCount !== 1 ? "s" : ""}!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Content - Using new TweetCard component */}
          {shitpost && (
            <TweetCard
              content={shitpost}
              tweetNumber={globalCount}
              tone={selectedTone}
              className="border-2 hover:border-foreground/50"
            />
          )}
        </div>

        {/* Right Sidebar - History & Analytics */}
        <div className="space-y-6">
          {/* Recent History */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Recent Chaos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.length > 0 ? (
                history.map((post, index) => (
                  <div
                    key={index}
                    className="p-3 bg-background border border-border rounded-lg hover:border-foreground/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => {
                      setShitpost(post)
                      toast({
                        title: "Loaded from history",
                        description: "Previous chaos restored",
                        duration: 2000,
                      })
                    }}
                  >
                    <p className="text-sm line-clamp-3 group-hover:text-foreground transition-colors text-left">
                      {post}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">Click to reload</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No chaos generated yet</p>
                  <p className="text-xs">Your history will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => setCustomPrompt("about my existential crisis")}
              >
                😵 Existential Crisis Mode
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => setCustomPrompt("involving cats and chaos")}
              >
                🐱 Cat Chaos Generator
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => setCustomPrompt("3am thoughts")}
              >
                🌙 3AM Energy Only
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-sm" onClick={resetSessionStats}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Session Stats
              </Button>
            </CardContent>
          </Card>

          {/* Dynamic Chaos Meter */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Chaos Meter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Viral Potential</span>
                  <span className="font-bold">{getViralPotential()}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-foreground h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${getViralPotential()}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on your {sessionCount} generation{sessionCount !== 1 ? "s" : ""} and global Supabase trends
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
