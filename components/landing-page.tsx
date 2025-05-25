"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Clock, Sparkles, Twitter, Heart, MessageCircle, Repeat2 } from "lucide-react"
import Link from "next/link"

const sampleTweets = [
  {
    text: "My brain has too many tabs open and they are all playing different songs.",
    likes: 3102,
    retweets: 750,
    replies: 120,
    displayName: "Glitch Mode",
    username: "@ProcrastinationPro",
  },
  {
    text: "I told my plants I was going on vacation they said bring us back a shrubbery.",
    likes: 4888,
    retweets: 1201,
    replies: 250,
    displayName: "Sock Puppet",
    username: "@ExistentialSquirrel",
  },
  {
    text: "Decided to embrace the chaos today wore mismatched socks on purpose.",
    likes: 4200,
    retweets: 999,
    replies: 180,
    displayName: "Kitchen Tikka",
    username: "@MyBrainIsSpaghetti",
  },
]

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "AI-Powered Chaos",
    description: "Our AI has been trained on the finest internet garbage to create premium shitposts",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Instant Regret",
    description: "Generate tweets so fast you'll question your life choices in real-time",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Multiple Personalities",
    description: "Choose from Gen Z burnout to corporate cringe - we&apos;ve got all your toxic traits covered",
  },
]

export default function LandingPage() {
  const [currentTweet, setCurrentTweet] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentTweet((prev) => (prev + 1) % sampleTweets.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="space-y-20 animate-pulse">
        <div className="text-center space-y-8 py-20">
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded-lg mx-auto max-w-4xl"></div>
            <div className="h-8 bg-muted rounded-lg mx-auto max-w-2xl"></div>
            <div className="h-6 bg-muted rounded-lg mx-auto max-w-3xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold md:text-8xl tracking-tight fade-in-up p-10">
            Get Absolutely
            <br />
            <span className="relative">
              UNHINGED
              <div className="absolute -inset-2 border-4 border-current animate-pulse-glow rounded-lg"></div>
            </span>
            <br />
            Online
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto fade-in-up stagger-1">
            Publish to Twitter in Seconds
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto fade-in-up stagger-2">
            Generate hilariously unhinged tweets that will make your followers question your sanity (and hit that follow
            button)
          </p>
        </div>

        <div className="fade-in-up stagger-3">
          <Link href="/generate">
            <Button
              size="lg"
              className="text-center mt-5 text-xl px-8 py-6 bg-foreground text-background hover:scale-105 transition-all duration-300 group"
            >
              Start Being Problematic
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Warning: May cause sudden increase in followers and existential dread
          </p>
        </div>
      </section>

      {/* Demo Tweet Card */}
      <section className="max-w-md mx-auto fade-in-up stagger-4">
        <h2 className="text-2xl font-bold text-center mb-8">See the Magic in Action</h2>
        <Card className="bg-card border-2 border-border hover:border-foreground transition-all duration-300 animate-float">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                <span className="text-background font-bold">
                  {sampleTweets[currentTweet].displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold">{sampleTweets[currentTweet].displayName}</span>
                  <span className="text-muted-foreground">{sampleTweets[currentTweet].username}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">2m</span>
                </div>
                <p className="text-foreground whitespace-pre-line mb-4 transition-all duration-500">
                  {sampleTweets[currentTweet].text}
                </p>
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{sampleTweets[currentTweet].replies}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm">{sampleTweets[currentTweet].retweets}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{sampleTweets[currentTweet].likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                    <Twitter className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center space-x-2 mt-4">
          {sampleTweets.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTweet ? "bg-foreground" : "bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-center fade-in-up">Why Choose Professional Chaos?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`bg-card border-2 border-border hover:border-foreground transition-all duration-300 hover:scale-105 fade-in-up stagger-${index + 1}`}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center text-foreground">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="space-y-8 fade-in-up stagger-4">
        <h2 className="text-3xl font-bold text-center">Join the Chaos (Responsibly)</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Brenda G.",
              handle: "@BrainFogBrenda",
              text: "My tweets used to be about my cat. Now they are performance art. Thanks for unlocking my inner weirdo!",
            },
            {
              name: "Chad T.",
              handle: "@ChadThundercockles",
              text: "I accidentally became a micro-influencer in the niche market of existential dread. 10/10 would recommend.",
            },
            {
              name: "Anonymous User",
              handle: "@ProbablyMyBoss",
              text: "This app is the reason I have a secret Twitter account. My main feed is for sensible thoughts. This one is for THE TRUTH.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                    <span className="text-background text-sm font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-foreground">
                      ★
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-6 py-16 fade-in-up stagger-5">
        <h2 className="text-4xl font-bold">Ready to Become Internet Famous?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stop tweeting like a normal person. Start tweeting like the chaotic energy the internet deserves.
        </p>
        <Link href="/generate">
          <Button
            size="lg"
            className="text-xl mt-6 px-12 py-6 bg-foreground text-background hover:scale-110 transition-all duration-300 animate-pulse-glow"
          >
            🚀 Ignite the Chaos
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">No credit card required. Just your dignity (optional).</p>
      </section>
    </div>
  )
}
