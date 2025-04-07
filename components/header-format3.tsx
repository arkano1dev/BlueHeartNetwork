"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Radio, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [showNotification, setShowNotification] = useState(true)

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
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-800/40 via-blue-700/40 to-blue-800/40 border-b border-blue-700/50 overflow-hidden"
          >
            <div className="container mx-auto py-3 px-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-3 text-blue-300 hover:text-blue-100 hover:bg-blue-800/50"
                onClick={() => setShowNotification(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <Radio className="h-5 w-5 text-blue-300 z-10 relative" />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-blue-100 font-medium">Connect to our NOSTR Relay</h3>
                    <p className="text-sm text-blue-300">
                      Get decentralized real-time updates about ocean conservation
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => {
                      navigator.clipboard.writeText("wss://relaybluedata.space")
                      alert("Relay URL copied to clipboard!")
                    }}
                  >
                    Connect Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-300 hover:bg-blue-700 hover:text-blue-100"
                    onClick={() => window.open("/nostr-guide", "_blank")}
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

