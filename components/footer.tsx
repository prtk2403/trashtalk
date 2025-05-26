"use client"

import Link from "next/link"
import { Github, Twitter, Heart, Users, TrendingUp, Trash } from "lucide-react"
import { useVisitorTracking } from "@/hooks/use-visitor-tracking"
import { useGlobalTweetCount } from "@/hooks/use-global-tweet-count"
import Image from "next/image"
export function Footer() {
  const { totalVisitors, isLoading: visitorLoading } = useVisitorTracking()
  const { globalCount, isLoading: tweetLoading } = useGlobalTweetCount()

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
          <div className="flex items-center">
          <span className="text-muted-foreground"> <Trash className="fill-muted-foreground h-6 w-6 mr-2"/></span>
          <h1 className="text-3xl font-bold font-sans">Trash</h1>
          <h1 className="text-3xl  text-muted-foreground font-bold font-sans">Talk</h1>
          </div>
            <p className="text-sm text-muted-foreground">
              Unleashing chaos, one tweet at a time. Built with questionable taste and solid tech.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/xyzprtk/trashtalk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/xyzprtk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/generate" className="block text-muted-foreground hover:text-foreground transition-colors">
                Generate Tweets
              </Link>
              <Link
                href="/how-it-works"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Use
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h4 className="font-semibold">Live Stats</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {tweetLoading ? "Loading..." : `${globalCount.toLocaleString()} tweets generated`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {visitorLoading ? "Loading..." : `${totalVisitors.toLocaleString()} unique visitors`}
                </span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>© 2025 TrashTalk</p>
              <p>All rights reserved</p>
              <p className="text-xs leading-relaxed">
                Built by{" "}
                <a
                  href="https://twitter.com/xyzprtk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @xyzprtk
                </a>
                . Powered by Gemini.
              </p>
              <p className="text-xs text-muted-foreground/70">Offense not guaranteed, but highly likely.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for the chaotic internet by <Link href="https://prtx.xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pratheek Nistala</Link>
            </div>
            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:text-left">
                <div className="flex items-center gap-1"> Engineered by
                    <Image src="/vercel.svg" alt="Vercel" width={16} height={16} style={{ height: 'auto' }} />
                    <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel </Link>
                </div>
              <span className="hidden md:inline">|</span>
              <div className="flex items-center gap-1"> Managed by
                    <Image src="/supabase.png" alt="Supabase" width={16} height={16} style={{ height: 'auto' }} />
                    <Link href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase</Link>
                </div>
              <span className="hidden md:inline">|</span>
              <div className="flex items-center gap-1"> Powered by
                    <Image src="/gemini.svg" alt="Gemini" width={16} height={16} style={{ height: 'auto' }} />
                    <Link href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Gemini</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
