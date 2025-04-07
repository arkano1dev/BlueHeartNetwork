import { useEffect, useRef, useState } from "react"

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave animation properties
    let time = 0
    const waves = [
      { amplitude: 30, frequency: 0.005, speed: 0.02, color: "rgba(0, 87, 183, 0.2)" },
      { amplitude: 20, frequency: 0.01, speed: 0.03, color: "rgba(0, 119, 182, 0.2)" },
      { amplitude: 15, frequency: 0.015, speed: 0.01, color: "rgba(58, 134, 255, 0.2)" },
    ]

    // Animation loop
    const animate = () => {
      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath()

        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height * 0.4
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Complete the wave area
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
}

