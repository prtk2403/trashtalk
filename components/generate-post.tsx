"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clipboard, Twitter, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Spinner } from "@/components/ui/spinner"

export default function ShitpostGenerator() {
  const [shitpost, setShitpost] = useState("")
  const [tone, setTone] = useState("gen-z")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [error, setError] = useState("")

  const generateShitpost = async () => {
    setIsGenerating(true)
    setIsAnimating(true)
    setError("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate shitpost")
      }

      setShitpost(data.shitpost)
    } catch (err) {
      console.error("Error generating shitpost:", err)
      setError(err instanceof Error ? err.message : "Something went wrong")
      toast({
        title: "Generation failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)

      // Keep animation for a bit longer for visual effect
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shitpost)
    toast({
      title: "Copied to clipboard",
      description: "Your shitpost is ready to be pasted anywhere",
      duration: 2000,
    })
  }

  const tweetIt = () => {
    const tweetText = encodeURIComponent(shitpost)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
  }

  return (
    <>
      <Card className="w-full max-w-md bg-card border-border shadow-xl shadow-primary/10 text-card-foreground">
        <CardHeader className="text-center pb-2">
          <h2 className="text-2xl font-bold text-card-foreground">Unleash chaos, one tweet at a time.</h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-popover-foreground">
                <SelectItem value="gen-z">Gen Z Burnout</SelectItem>
                <SelectItem value="tech-bro">Tech Bro Manifesto</SelectItem>
                <SelectItem value="corporate">Corporate Cringe</SelectItem>
                <SelectItem value="absurdist">Absurdist Nihilism</SelectItem>
                <SelectItem value="anime">Anime Lord</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={generateShitpost}
              disabled={isGenerating}
              variant="default"
              className={`w-full py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/25 ${isAnimating ? "animate-pulse" : ""}`}
            >
              {isGenerating ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />💩 Make me laugh
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3 text-destructive-foreground/90 text-sm">{error}</div>
          )}

          {shitpost && (
            <div className="mt-6 relative">
              <div className="bg-muted/50 rounded-lg p-4 border border-border shadow-inner">
                <p className="text-foreground whitespace-pre-line">{shitpost}</p>
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Clipboard className="h-4 w-4 mr-1" />
                  Copy
                </Button>

                <Button onClick={tweetIt} variant="secondary" size="sm">
                  <Twitter className="h-4 w-4 mr-1" />🔥 Ship it to Twitter
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}