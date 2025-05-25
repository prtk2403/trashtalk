"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Clipboard,
  Twitter,
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  RefreshCw,
  Heart,
  MessageCircle,
  Repeat2,
  BarChart3,
  Lightbulb,
  Target,
  Wand2,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Spinner } from "@/components/ui/spinner"

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
]

export default function GeneratorDashboard() {
  const [shitpost, setShitpost] = useState("")
  const [tone, setTone] = useState("gen-z")
  const [customPrompt, setCustomPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [totalTweetsGenerated, setTotalTweetsGenerated] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [currentTip, setCurrentTip] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  // Load stats from localStorage on component mount
  useEffect(() => {
    try {
      const savedTotalTweets = localStorage.getItem("trashtalk_total_tweets")
      const savedSessionCount = localStorage.getItem("trashtalk_session_count")
      const savedHistory = localStorage.getItem("trashtalk_history")

      if (savedTotalTweets) {
        setTotalTweetsGenerated(Number.parseInt(savedTotalTweets, 10) || 0)
      }

      if (savedSessionCount) {
        setGenerationCount(Number.parseInt(savedSessionCount, 10) || 0)
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
      console.warn("Error loading stats from localStorage:", error)
      setSessionStartTime(new Date())
    }
  }, [])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("trashtalk_total_tweets", totalTweetsGenerated.toString())
      localStorage.setItem("trashtalk_session_count", generationCount.toString())
      localStorage.setItem("trashtalk_history", JSON.stringify(history))
    } catch (error) {
      console.warn("Error saving stats to localStorage:", error)
    }
  }, [totalTweetsGenerated, generationCount, history])

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
    if (generationCount === 0) return "Dormant"
    if (generationCount < 3) return "Warming Up"
    if (generationCount < 5) return "Getting Spicy"
    if (generationCount < 10) return "Full Chaos"
    return "MAXIMUM OVERDRIVE"
  }

  const getSanityPercentage = () => {
    const maxSanity = 100
    const sanityLoss = Math.min(generationCount * 10, maxSanity)
    return Math.max(maxSanity - sanityLoss, 0)
  }

  const getViralPotential = () => {
    const base = 50
    const bonus = Math.min(generationCount * 5, 40)
    const randomFactor = Math.floor(Math.random() * 10)
    return Math.min(base + bonus + randomFactor, 99)
  }

  const stats = [
    {
      label: "Tweets Generated",
      value: totalTweetsGenerated.toLocaleString(),
      icon: <Zap className="h-4 w-4" />,
      subtitle: `+${generationCount} this session`,
    },
    {
      label: "Session Time",
      value: getSessionDuration(),
      icon: <Clock className="h-4 w-4" />,
      subtitle: "Time well wasted",
    },
    {
      label: "Chaos Level",
      value: getChaosLevel(),
      icon: <TrendingUp className="h-4 w-4" />,
      subtitle: `${generationCount} generations`,
    },
    {
      label: "Sanity Remaining",
      value: `${getSanityPercentage()}%`,
      icon: <BarChart3 className="h-4 w-4" />,
      subtitle: generationCount > 0 ? "Declining rapidly" : "Still intact",
    },
  ]

  const generateShitpost = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tone,
          customPrompt: customPrompt.trim() || undefined,
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

      // Increment both session and total counts
      setGenerationCount((prev) => prev + 1)
      setTotalTweetsGenerated((prev) => prev + 1)

      // Add to history
      setHistory((prev) => [data.shitpost, ...prev.slice(0, 4)])

      // Show fallback message if applicable
      if (data.fallback) {
        toast({
          title: "Using backup chaos",
          description: data.message || "API temporarily unavailable, but chaos continues!",
          duration: 3000,
        })
      } else {
        // Show success message with stats
        toast({
          title: "Chaos unleashed!",
          description: `Tweet #${totalTweetsGenerated + 1} generated successfully`,
          duration: 2000,
        })
      }
    } catch (err) {
      console.error("Error generating shitpost:", err)

      // Provide a client-side fallback
      const clientFallbacks = [
        "me: i should sleep\nalso me: researching if penguins have knees",
        "normalize saying 'that's above my pay grade' when someone asks what 2+2 equals",
        "my toxic trait is thinking I can finish a project in one day that actually takes six months",
      ]

      const fallbackPost = clientFallbacks[Math.floor(Math.random() * clientFallbacks.length)]
      setShitpost(fallbackPost)

      // Still increment counts for fallback
      setGenerationCount((prev) => prev + 1)
      setTotalTweetsGenerated((prev) => prev + 1)
      setHistory((prev) => [fallbackPost, ...prev.slice(0, 4)])

      toast({
        title: "Chaos never stops!",
        description: `Network hiccup detected, but we've got backup chaos ready (#${totalTweetsGenerated + 1})`,
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const resetStats = () => {
    setGenerationCount(0)
    setTotalTweetsGenerated(0)
    setHistory([])
    setShitpost("")
    setCustomPrompt("")
    setTone("gen-z")
    setSessionStartTime(new Date())

    try {
      localStorage.removeItem("trashtalk_total_tweets")
      localStorage.removeItem("trashtalk_session_count")
      localStorage.removeItem("trashtalk_history")
    } catch (error) {
      console.warn("Error clearing localStorage:", error)
    }

    toast({
      title: "Stats reset",
      description: "Starting fresh with a clean slate",
      duration: 2000,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shitpost)
    toast({
      title: "Copied to clipboard",
      description: "Your shitpost is ready to unleash chaos",
      duration: 2000,
    })
  }

  const tweetIt = () => {
    const tweetText = encodeURIComponent(shitpost)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
  }

  const selectedTone = toneDescriptions[tone as keyof typeof toneDescriptions]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-3 gap-8 h-full">
        {/* Left Sidebar - Controls & Info */}
        <div className="space-y-6">
          {/* Dynamic Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-foreground/50 transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2 text-muted-foreground">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  {stat.subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{stat.subtitle}</div>}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tone Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                <div className="font-semibold mb-1">{selectedTone.name}</div>
                <div className="text-sm opacity-80 mb-2">{selectedTone.description}</div>
                <div className="text-xs">
                  <strong>Examples:</strong> {selectedTone.examples.join(" • ")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Prompt */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Custom Chaos (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add your own twist... (e.g., 'about cats', 'involving pizza', 'existential crisis')"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="bg-background border-border resize-none"
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
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Ready to Go Viral?</h2>
                  <p className="text-muted-foreground">
                    Generate {generationCount > 0 ? "another" : "your first"} masterpiece of chaos
                  </p>
                  {generationCount > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      You're on a roll! {generationCount} tweet{generationCount !== 1 ? "s" : ""} this session
                    </p>
                  )}
                </div>

                <Button
                  onClick={generateShitpost}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full py-8 text-xl bg-foreground text-background hover:scale-105 transition-all duration-300 group"
                >
                  {isGenerating ? (
                    <>
                      <Spinner size="sm" className="mr-3" />
                      Brewing Chaos...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />💩 Unleash the Chaos
                    </>
                  )}
                </Button>

                {generationCount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    🎉 Total chaos unleashed: {totalTweetsGenerated} tweet{totalTweetsGenerated !== 1 ? "s" : ""}!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {shitpost && (
            <Card className="bg-card border-border border-2 hover:border-foreground/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Your Masterpiece #{totalTweetsGenerated}
                  </span>
                  <Badge variant="outline" className={selectedTone.color}>
                    {selectedTone.name}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tweet Preview */}
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                      <span className="text-background font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold">Chaotic You</span>
                        <span className="text-muted-foreground">@unhinged_user</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">now</span>
                      </div>
                      <p className="text-foreground whitespace-pre-line mb-4 text-lg leading-relaxed">{shitpost}</p>
                      <div className="flex items-center space-x-6 text-muted-foreground">
                        <div className="flex items-center space-x-1 hover:text-foreground transition-colors cursor-pointer">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 500) + 50}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-foreground transition-colors cursor-pointer">
                          <Repeat2 className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-foreground transition-colors cursor-pointer">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 2000) + 500}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={copyToClipboard} variant="outline" className="flex-1 hover:bg-accent">
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <Button onClick={tweetIt} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                    <Twitter className="h-4 w-4 mr-2" />🚀 Tweet This Chaos
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar - History & Analytics */}
        <div className="space-y-6">
          {/* Recent History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                    <p className="text-sm line-clamp-3 group-hover:text-foreground transition-colors">{post}</p>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setCustomPrompt("about my existential crisis")}
              >
                😵 Existential Crisis Mode
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setCustomPrompt("involving cats and chaos")}
              >
                🐱 Cat Chaos Generator
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setCustomPrompt("3am thoughts")}
              >
                🌙 3AM Energy Only
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={resetStats}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset All Stats
              </Button>
            </CardContent>
          </Card>

          {/* Dynamic Chaos Meter */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                  Based on your {generationCount} generation{generationCount !== 1 ? "s" : ""} and current chaos levels
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
