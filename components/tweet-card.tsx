"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clipboard, Twitter, Heart, MessageCircle, Repeat2, Sparkles, MoreHorizontal } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface TweetCardProps {
  content: string
  tweetNumber?: number
  tone?: {
    name: string
    color: string
  }
  username?: string
  handle?: string
  timestamp?: string
  className?: string
  showActions?: boolean
  compact?: boolean
}

export function TweetCard({
  content,
  tweetNumber,
  tone,
  username = "Chaotic You",
  handle = "@unhinged_user",
  timestamp = "now",
  className,
  showActions = true,
  compact = false,
}: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isRetweeted, setIsRetweeted] = useState(false)

  // Generate realistic engagement numbers
  const likes = Math.floor(Math.random() * 2000) + 500
  const retweets = Math.floor(Math.random() * 1000) + 100
  const replies = Math.floor(Math.random() * 500) + 50

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Your shitpost is ready to unleash chaos",
      duration: 2000,
    })
  }

  const tweetIt = () => {
    const tweetText = encodeURIComponent(content)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Unliked" : "Liked!",
      description: isLiked ? "Removed from favorites" : "Added to your favorites",
      duration: 1500,
    })
  }

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted)
    toast({
      title: isRetweeted ? "Unretweet" : "Retweeted!",
      description: isRetweeted ? "Removed retweet" : "Shared with your followers",
      duration: 1500,
    })
  }

  return (
    <Card
      className={cn(
        "bg-card border-border transition-all duration-300 hover:border-foreground/50",
        compact ? "border" : "border-2",
        className,
      )}
    >
      {!compact && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base sm:text-lg">
            <span className="flex items-center gap-2 min-w-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">{tweetNumber ? `Global Tweet #${tweetNumber}` : "Generated Tweet"}</span>
            </span>
            {tone && (
              <Badge variant="outline" className={cn("ml-2 flex-shrink-0 text-xs", tone.color)}>
                {tone.name}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className={cn("space-y-4", compact ? "p-4" : "pt-0")}>
        {/* Tweet Preview */}
        <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-background font-bold text-sm sm:text-base">{username.charAt(0).toUpperCase()}</span>
            </div>

            {/* Tweet Content */}
            <div className="flex-1 min-w-0">
              {/* User Info */}
              <div className="flex items-center space-x-2 mb-2 text-sm">
                <span className="font-bold truncate">{username}</span>
                <span className="text-muted-foreground truncate">{handle}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground flex-shrink-0">{timestamp}</span>
              </div>

              {/* Tweet Text - Left aligned for better readability */}
              <p className="text-foreground whitespace-pre-line mb-4 text-sm sm:text-base leading-relaxed text-left">
                {content}
              </p>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors group"
                  >
                    <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{replies}</span>
                  </button>

                  <button
                    onClick={handleRetweet}
                    className={cn(
                      "flex items-center space-x-1 hover:text-green-500 transition-colors group",
                      isRetweeted && "text-green-500",
                    )}
                  >
                    <Repeat2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{retweets + (isRetweeted ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={handleLike}
                    className={cn(
                      "flex items-center space-x-1 hover:text-red-500 transition-colors group",
                      isLiked && "text-red-500",
                    )}
                  >
                    <Heart
                      className={cn("h-4 w-4 group-hover:scale-110 transition-transform", isLiked && "fill-current")}
                    />
                    <span>{likes + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>

                <button className="hover:text-foreground transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Responsive layout */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button onClick={copyToClipboard} variant="outline" className="flex-1 hover:bg-accent text-sm" size="sm">
              <Clipboard className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Copy to Clipboard</span>
            </Button>

            <Button onClick={tweetIt} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm" size="sm">
              <Twitter className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">🚀 Tweet This Chaos</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
