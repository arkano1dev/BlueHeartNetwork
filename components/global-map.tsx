"use client"

import { useEffect, useRef, useState } from "react"

interface HeartPoint {
  x: number
  y: number
  size: number
  pulse: number
  speed: number
}

export default function GlobalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.min(Math.max(300, container.clientWidth * 0.5), 500), // Ensure minimum height of 300px
        })
      }
    }

    updateDimensions()

    // Force another update after a short delay to handle any layout shifts
    const timer = setTimeout(updateDimensions, 300)

    window.addEventListener("resize", updateDimensions)
    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Enhanced map points with better distribution and varied sizes
    const heartPoints: HeartPoint[] = [
      // North America
      { x: 0.2, y: 0.3, size: 6, pulse: 0, speed: 0.03 },
      { x: 0.25, y: 0.36, size: 4, pulse: 2, speed: 0.04 },
      { x: 0.15, y: 0.25, size: 5, pulse: 1.5, speed: 0.035 },
      // South America
      { x: 0.3, y: 0.6, size: 5, pulse: 1, speed: 0.05 },
      { x: 0.25, y: 0.55, size: 3.5, pulse: 0.5, speed: 0.045 },
      // Europe
      { x: 0.48, y: 0.28, size: 5, pulse: 0.5, speed: 0.04 },
      { x: 0.52, y: 0.32, size: 4, pulse: 1.5, speed: 0.03 },
      { x: 0.45, y: 0.25, size: 3.5, pulse: 1.2, speed: 0.035 },
      // Africa
      { x: 0.5, y: 0.5, size: 5, pulse: 1, speed: 0.05 },
      { x: 0.55, y: 0.45, size: 4, pulse: 0.8, speed: 0.04 },
      // Asia
      { x: 0.7, y: 0.35, size: 6, pulse: 0, speed: 0.04 },
      { x: 0.8, y: 0.4, size: 4, pulse: 2, speed: 0.03 },
      { x: 0.75, y: 0.3, size: 5, pulse: 1.3, speed: 0.035 },
      // Australia
      { x: 0.8, y: 0.7, size: 5, pulse: 1.5, speed: 0.05 },
      { x: 0.85, y: 0.65, size: 3.5, pulse: 0.7, speed: 0.045 },
    ]

    // Load world map image
    const mapImage = new Image()
    mapImage.src = "/placeholder.svg?height=400&width=800"
    mapImage.crossOrigin = "anonymous"

    mapImage.onload = () => {
      // Animation loop
      let animationFrameId: number
      let time = 0

      const render = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw world map with enhanced blue tint
        ctx.globalAlpha = 0.7
        ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

        // Apply gradient blue tint to the map for better depth
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(12, 74, 110, 0.4)")
        gradient.addColorStop(1, "rgba(7, 89, 133, 0.6)")
        ctx.globalAlpha = 0.5
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add subtle ocean texture
        ctx.globalAlpha = 0.1
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const radius = Math.random() * 2 + 1

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(173, 216, 230, 0.3)"
          ctx.fill()
        }

        // Draw glowing hearts with enhanced effects
        ctx.globalAlpha = 1
        heartPoints.forEach((point) => {
          const x = point.x * canvas.width
          const y = point.y * canvas.height
          const size = point.size

          // Calculate pulse effect with smoother animation
          const pulse = Math.sin(time * point.speed + point.pulse) * 0.5 + 1.5

          // Draw glowing heart with improved gradient
          ctx.save()
          ctx.beginPath()
          ctx.translate(x, y)
          ctx.scale(size * pulse * 0.07, size * pulse * 0.07)
          ctx.moveTo(0, -1)
          ctx.bezierCurveTo(0, -2, 2, -2, 2, 0)
          ctx.bezierCurveTo(2, 2, 0, 3, 0, 4)
          ctx.bezierCurveTo(0, 3, -2, 2, -2, 0)
          ctx.bezierCurveTo(-2, -2, 0, -2, 0, -1)
          ctx.closePath()

          // Enhanced heart gradient with more vibrant colors
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 5)
          gradient.addColorStop(0, "rgba(56, 189, 248, 1)") // Lighter blue center
          gradient.addColorStop(0.6, "rgba(14, 165, 233, 0.8)") // Mid blue
          gradient.addColorStop(1, "rgba(3, 105, 161, 0)") // Darker blue fade
          ctx.fillStyle = gradient
          ctx.fill()

          // Enhanced glow effect
          ctx.shadowColor = "rgba(56, 189, 248, 0.8)"
          ctx.shadowBlur = 15
          ctx.fill()
          ctx.restore()

          // Connection lines between nearby points with improved appearance
          heartPoints.forEach((otherPoint) => {
            const otherX = otherPoint.x * canvas.width
            const otherY = otherPoint.y * canvas.height
            const distance = Math.sqrt((x - otherX) ** 2 + (y - otherY) ** 2)

            if (distance < canvas.width * 0.2 && distance > 0) {
              // Draw fading connection line with pulse effect
              const opacity = (1 - distance / (canvas.width * 0.2)) * 0.4
              const pulseEffect = Math.sin(time * 0.05) * 0.1 + 0.9

              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * pulseEffect})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(otherX, otherY)
              ctx.stroke()
            }
          })
        })

        // Add floating particles for ocean effect
        ctx.globalAlpha = 0.3
        for (let i = 0; i < 5; i++) {
          const x = (Math.sin(time * 0.01 + i) * 0.5 + 0.5) * canvas.width
          const y = (Math.cos(time * 0.01 + i * 2) * 0.5 + 0.5) * canvas.height
          const radius = Math.sin(time * 0.1 + i) * 1 + 2

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(173, 216, 230, 0.6)"
          ctx.fill()
        }

        time += 0.01
        animationFrameId = requestAnimationFrame(render)
      }

      render()

      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    }

    return () => {
      // Cleanup if needed
    }
  }, [dimensions])

  return (
    <div className="w-full h-full flex justify-center">
      <canvas ref={canvasRef} className="rounded-lg shadow-inner max-w-full" style={{ height: dimensions.height }} />
    </div>
  )
}
