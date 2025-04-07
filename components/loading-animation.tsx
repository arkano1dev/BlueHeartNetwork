import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

export default function LoadingAnimation() {
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
      { amplitude: 50, frequency: 0.01, speed: 0.03, color: "rgba(0, 127, 255, 0.3)" },
      { amplitude: 40, frequency: 0.015, speed: 0.04, color: "rgba(64, 164, 223, 0.3)" },
      { amplitude: 30, frequency: 0.02, speed: 0.05, color: "rgba(123, 198, 204, 0.3)" },
    ]

    // Animation loop
    const animate = () => {
      // Clear canvas with a deep blue background
      ctx.fillStyle = "#0c2461"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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

  // Don't render anything on the server or show a simple loading state
  if (!isMounted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-blue-950">
        <Heart className="text-blue-400 w-16 h-16 animate-pulse" />
        <h1 className="text-3xl font-bold text-white mt-6">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center">
        <Heart className="text-blue-400 w-16 h-16 animate-pulse" />
        <h1 className="text-3xl font-bold text-white mt-6 animate-fadeIn">The BlueHearts Network</h1>
        <p className="text-blue-200 mt-2">Protecting the blue ocean</p>
      </div>
    </div>
  )
}

