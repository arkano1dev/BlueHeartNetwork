"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Radio, Menu, X } from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

        {/* Mobile menu button */}
        <button
          className="ml-auto md:hidden flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-blue-100 hover:bg-blue-800/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-900/95 backdrop-blur-sm border-b border-blue-800/50">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors p-2 rounded-md ${
                pathname === "/"
                  ? "text-blue-100 bg-blue-700/50"
                  : "text-blue-200 hover:text-blue-100 hover:bg-blue-800/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors p-2 rounded-md ${
                pathname === "/about"
                  ? "text-blue-100 bg-blue-700/50"
                  : "text-blue-200 hover:text-blue-100 hover:bg-blue-800/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors p-2 rounded-md ${
                pathname === "/projects" || pathname.startsWith("/projects/")
                  ? "text-blue-100 bg-blue-700/50"
                  : "text-blue-200 hover:text-blue-100 hover:bg-blue-800/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/funding"
              className={`text-sm font-medium transition-colors p-2 rounded-md ${
                pathname === "/funding"
                  ? "text-blue-100 bg-blue-700/50"
                  : "text-blue-200 hover:text-blue-100 hover:bg-blue-800/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Funding
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors p-2 rounded-md ${
                  pathname === "/dashboard"
                    ? "text-blue-100 bg-blue-700/50"
                    : "text-blue-200 hover:text-blue-100 bg-blue-700/50 hover:bg-blue-600/50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/join"
                className="text-sm font-medium text-blue-100 bg-blue-600 p-2 rounded-md hover:bg-blue-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Now
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Latest Update Banner */}
      <div className="bg-blue-800/30 border-b border-blue-800/50 py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm">
          <div className="flex items-center text-blue-200">
            <Radio className="h-4 w-4 mr-2 text-blue-400 animate-pulse" />
            <span className="hidden sm:inline">Connect to our NOSTR relay for real-time ocean updates: </span>
            <span className="sm:hidden">NOSTR relay: </span>
            <code className="mx-2 px-2 py-0.5 bg-blue-900/50 rounded text-blue-300 font-mono text-xs sm:text-sm">
              wss://relay.bluedata.space
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
