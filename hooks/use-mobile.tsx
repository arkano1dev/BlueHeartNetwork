import { useState, useEffect } from "react"

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Function to update dimensions
    const updateDimensions = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    // Set initial dimensions
    updateDimensions()

    // Add event listener
    window.addEventListener("resize", updateDimensions)

    // Clean up
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return { isMobile, isTablet, isDesktop, windowWidth }
}

