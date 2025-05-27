"use client"

import type React from "react"
import { useState, useEffect } from "react"

const Header: React.FC = () => {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bluePulseUser")
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const handleLogin = () => {
    const username = prompt("Please enter your username:")
    if (username) {
      localStorage.setItem("bluePulseUser", username)
      setUser(username)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("bluePulseUser")
    setUser(null)
  }

  return (
    <header
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1>
          <span style={{ fontWeight: "bold" }}>The Blue Pulse</span>
        </h1>
      </div>
      <div>
        {user ? (
          <>
            <span>Welcome, {user}!</span>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </header>
  )
}

export default Header
