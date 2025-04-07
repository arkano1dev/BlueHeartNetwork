"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match container
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave animation properties
    let time = 0
    const waves = [
      { amplitude: 15, frequency: 0.02, speed: 0.02, color: "rgba(0, 127, 255, 0.2)" },
      { amplitude: 10, frequency: 0.03, speed: 0.03, color: "rgba(64, 164, 223, 0.2)" },
      { amplitude: 8, frequency: 0.04, speed: 0.04, color: "rgba(123, 198, 204, 0.2)" },
    ]

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      // Update time for animation
      time += 1

      // Request next frame
      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [isMounted])

  // Don't render anything on the server
  if (!isMounted) {
    return null
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }} />
}

