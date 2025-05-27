"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Anchor, Droplets, Fish, Leaf, Waves } from "lucide-react"

interface OceanUpdate {
  id: number
  title: string
  location: string
  timestamp: string
  category: "conservation" | "research" | "restoration" | "education"
  isNew: boolean
}

export default function OceanDataFeed() {
  const [updates, setUpdates] = useState<OceanUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      setLoading(true)

      // Mock data
      const mockUpdates: OceanUpdate[] = [
        {
          id: 1,
          title: "New coral reforestation project started in Bali",
          location: "Bali, Indonesia",
          timestamp: "2023-06-15T09:30:00Z",
          category: "restoration",
          isNew: true,
        },
        {
          id: 2,
          title: "Marine protected area expanded in Mediterranean Sea",
          location: "Mediterranean Sea",
          timestamp: "2023-06-14T14:45:00Z",
          category: "conservation",
          isNew: true,
        },
        {
          id: 3,
          title: "Seagrass meadow restoration showing positive results",
          location: "Florida Keys, USA",
          timestamp: "2023-06-12T11:20:00Z",
          category: "restoration",
          isNew: false,
        },
        {
          id: 4,
          title: "New species discovered in deep sea exploration",
          location: "Mariana Trench, Pacific Ocean",
          timestamp: "2023-06-10T08:15:00Z",
          category: "research",
          isNew: false,
        },
        {
          id: 5,
          title: "Ocean literacy program launched for coastal communities",
          location: "Cape Town, South Africa",
          timestamp: "2023-06-08T13:40:00Z",
          category: "education",
          isNew: false,
        },
      ]

      setUpdates(mockUpdates)
      setLoading(false)
    }

    fetchData()

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // In a real app, this would fetch new data from an API
      // For now, we'll just toggle the isNew property on a random update
      setUpdates((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length)
        return prev.map((update, index) => (index === randomIndex ? { ...update, isNew: !update.isNew } : update))
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "conservation":
        return <Waves className="h-4 w-4" />
      case "research":
        return <Fish className="h-4 w-4" />
      case "restoration":
        return <Leaf className="h-4 w-4" />
      case "education":
        return <Anchor className="h-4 w-4" />
      default:
        return <Droplets className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conservation":
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
      case "research":
        return "bg-purple-600/20 text-purple-300 border-purple-600/50"
      case "restoration":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-600/50"
      case "education":
        return "bg-amber-600/20 text-amber-300 border-amber-600/50"
      default:
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse space-y-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-blue-800/50 h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div
          key={update.id}
          className={`p-4 rounded-lg bg-blue-800/30 border border-blue-800 ${
            update.isNew ? "animate-pulse border-blue-600" : ""
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-blue-100">{update.title}</h3>
            {update.isNew && <Badge className="bg-blue-600 text-white">New</Badge>}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-300">{update.location}</div>
            <Badge className={`${getCategoryColor(update.category)} flex items-center`}>
              {getCategoryIcon(update.category)}
              <span className="ml-1 capitalize">{update.category}</span>
            </Badge>
          </div>

          <div className="text-xs text-blue-400 mt-2">
            {new Date(update.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
