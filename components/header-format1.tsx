"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface HeaderProps {
  onToggleSidebar: () => void
}

const HeaderFormat1: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bluePulseUser")
    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser)
        setUsername(userObject.username || userObject.name || "User") // Prioritize username, then name, then default to 'User'
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
        setUsername("User") // Default to 'User' if parsing fails
      }
    } else {
      setUsername("User") // Default to 'User' if no user data is found
    }
  }, [])

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="mr-4 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span className="text-xl font-semibold">The Blue Pulse</span>
      </div>
      <div>{username ? <span>Welcome, {username}!</span> : <span>Welcome!</span>}</div>
    </header>
  )
}

export default HeaderFormat1
