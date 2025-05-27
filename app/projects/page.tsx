"use client"

import { useState, useEffect } from "react"

const ProjectsPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("bluePulseUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Blue Pulse Projects</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          {/* Project list or other content here */}
        </div>
      ) : (
        <p>Please log in to view projects.</p>
      )}
    </div>
  )
}

export default ProjectsPage
