"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Radio, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface UserData {
  name: string
  email: string
  region: string
  membershipType: string
  joinDate: string
  isLoggedIn: boolean
}

export default function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<UserData | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if user is logged in
    try {
      const userData = localStorage.getItem("blueHeartsUser")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Don't render anything on the server to prevent hydration errors
  if (!isMounted) {
    return null
  }

  return (
    <div className="sticky top-0 z-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-blue-800/50 bg-blue-800/30 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-6 w-6 text-blue-500" />
          <span className="ml-2 font-bold text-blue-100">The BlueHearts Network</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full"
                : "text-blue-200 hover:text-blue-100"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full"
                : "text-blue-200 hover:text-blue-100"
            }`}
          >
            About
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-medium transition-colors ${
              pathname === "/projects" || pathname.startsWith("/projects/")
                ? "text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full"
                : "text-blue-200 hover:text-blue-100"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/funding"
            className={`text-sm font-medium transition-colors ${
              pathname === "/funding"
                ? "text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full"
                : "text-blue-200 hover:text-blue-100"
            }`}
          >
            Funding
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full"
                  : "text-blue-200 hover:text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full hover:bg-blue-600/50"
              }`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/join"
              className="text-sm font-medium text-blue-100 bg-blue-600 px-3 py-1 rounded-full hover:bg-blue-500 transition-colors"
            >
              Join Now
            </Link>
          )}
        </nav>
      </header>

      {/* Live Ocean Update Banner */}
      <div className="bg-blue-800/30 border-b border-blue-800/50 py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center">
            <div className="bg-blue-700/50 p-2 rounded-full mr-3">
              <Radio className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center">
                <Badge className="bg-blue-600/30 text-blue-200 mr-2">NEW</Badge>
                <span className="text-blue-100 font-medium">NOSTR Relay Connection</span>
              </div>
              <p className="text-sm text-blue-300">Stay updated with decentralized ocean news via our NOSTR relay</p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-10 sm:ml-0">
            <div className="text-blue-200 text-sm font-mono bg-blue-900/50 px-2 py-1 rounded">
              wss://relaybluedata.space
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => window.open("/nostr-guide", "_blank")}
            >
              <Info className="mr-1 h-4 w-4" />
              <span>How to Connect</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

