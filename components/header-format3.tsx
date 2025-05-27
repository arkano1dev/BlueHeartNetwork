"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface HeaderFormat3Props {
  onLogout: () => void
}

const HeaderFormat3: React.FC<HeaderFormat3Props> = ({ onLogout }) => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bluePulseUser")
    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser)
        setUsername(userObject.username || userObject.name || "User") // Prioritize username, then name, then default to 'User'
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
        setUsername("User") // Default to 'User' in case of parsing error
      }
    } else {
      setUsername("User") // Default to 'User' if no user data is found
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("bluePulseUser")
    onLogout()
  }

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">The Blue Pulse</span>
        </div>
        {username ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>{/* You might want to add login/register links here if the user is not logged in */}</div>
        )}
      </div>
    </header>
  )
}

export default HeaderFormat3
