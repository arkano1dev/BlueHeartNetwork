"use client"

import { useState, useEffect } from "react"

const HeaderFormat2 = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bluePulseUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

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
          <span style={{ color: "blue" }}>The Blue Pulse</span>
        </h1>
      </div>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </header>
  )
}

export default HeaderFormat2
