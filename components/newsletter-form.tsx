"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Send } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-blue-950/50 border-blue-700 focus:border-blue-500 text-white placeholder:text-blue-300 h-12 pr-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="absolute right-1 top-1 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-500"
              disabled={isSubmitting}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      ) : (
        <div className="bg-blue-800/50 rounded-lg p-4 flex items-center text-blue-100">
          <CheckCircle className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
          <p>Thank you for subscribing to the BlueHearts.Network newsletter!</p>
        </div>
      )}
    </div>
  )
}

