"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Globe, Heart, MessageSquare, Clock, Users, Leaf } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  type: "join" | "donation" | "comment" | "project" | "achievement" | "action"
  user: {
    name: string
    region: string
    avatar?: string
  }
  content: string
  timestamp: Date
  project?: string
  amount?: number
}

export default function LiveActivityStream({ limit = 5, simplified = false }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [showNewActivity, setShowNewActivity] = useState(false)
  const [newActivity, setNewActivity] = useState<Activity | null>(null)

  // Mock data for activities
  const mockActivities: Activity[] = [
    {
      id: "1",
      type: "join",
      user: { name: "Maria", region: "portugal", avatar: "/placeholder.svg?height=40&width=40" },
      content: "joined the Blue Hearts Network",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: "2",
      type: "donation",
      user: { name: "James", region: "north-america", avatar: "/placeholder.svg?height=40&width=40" },
      content: "donated to the Coral Reef Restoration project",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      project: "Coral Reef Restoration",
      amount: 50,
    },
    {
      id: "3",
      type: "comment",
      user: { name: "Sophia", region: "europe", avatar: "/placeholder.svg?height=40&width=40" },
      content: "commented on the Ocean Cleanup blog post",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "4",
      type: "action",
      user: { name: "BlueHearts Team", region: "asia", avatar: "/placeholder.svg?height=40&width=40" },
      content: "planted 100 mangroves in Indonesia",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    },
    {
      id: "5",
      type: "achievement",
      user: { name: "Carlos", region: "south-america", avatar: "/placeholder.svg?height=40&width=40" },
      content: "earned the Ocean Guardian badge",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: "6",
      type: "project",
      user: { name: "Emma", region: "oceania", avatar: "/placeholder.svg?height=40&width=40" },
      content: "started tracking a new beach cleanup project",
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    },
    {
      id: "7",
      type: "join",
      user: { name: "Ahmed", region: "africa", avatar: "/placeholder.svg?height=40&width=40" },
      content: "joined the Blue Hearts Network",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
  ]

  useEffect(() => {
    // Initialize with mock data
    setActivities(mockActivities.slice(0, limit))

    // Simulate new activities coming in
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockActivities.length)
      const activity = {
        ...mockActivities[randomIndex],
        id: Date.now().toString(),
        timestamp: new Date(),
      }

      setNewActivity(activity)
      setShowNewActivity(true)

      // After 3 seconds, add to the list and hide the notification
      setTimeout(() => {
        setActivities((prev) => {
          const updated = [activity, ...prev]
          if (updated.length > limit) {
            updated.pop()
          }
          return updated
        })
        setShowNewActivity(false)
      }, 3000)
    }, 30000) // New activity every 30 seconds

    return () => clearInterval(interval)
  }, [limit])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "join":
        return <User className="h-4 w-4 text-blue-400" />
      case "donation":
        return <Heart className="h-4 w-4 text-pink-400" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-amber-400" />
      case "project":
        return <Globe className="h-4 w-4 text-emerald-400" />
      case "achievement":
        return <Badge className="h-4 w-4 text-purple-400" />
      case "action":
        return <Leaf className="h-4 w-4 text-green-400" />
      default:
        return <Users className="h-4 w-4 text-blue-400" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return "just now"
  }

  const getRegionLabel = (region: string) => {
    return region
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="relative">
      {/* New activity notification */}
      <AnimatePresence>
        {showNewActivity && newActivity && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-blue-600/70 backdrop-blur-sm rounded-lg p-3 mb-2 z-10 shadow-lg"
          >
            <div className="flex items-center">
              <div className="mr-3">
                <Avatar className="h-8 w-8 border border-blue-400">
                  <AvatarFallback className="bg-blue-700 text-blue-100">
                    {newActivity.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-100">
                  <span className="font-medium">{newActivity.user.name}</span> {newActivity.content}
                </p>
                <p className="text-xs text-blue-300">Just now</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity list */}
      <div className={`space-y-3 ${showNewActivity ? "mt-16" : ""}`}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-blue-800/30 backdrop-blur-sm rounded-lg p-3 border border-blue-700/30 hover:border-blue-600/50 transition-colors"
          >
            <div className="flex items-start">
              <div className="mr-3">
                <Avatar className="h-10 w-10 border border-blue-700">
                  {activity.user.avatar ? (
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  ) : (
                    <AvatarFallback className="bg-blue-700 text-blue-100">
                      {activity.user.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-blue-100">{activity.user.name}</span>
                  <Badge className="ml-2 bg-blue-700/50 text-blue-200 text-xs">
                    {getRegionLabel(activity.user.region)}
                  </Badge>
                </div>
                <p className="text-sm text-blue-200">
                  {getActivityIcon(activity.type)}
                  <span className="ml-1">{activity.content}</span>
                  {activity.amount && <span className="ml-1 font-medium text-emerald-400">€{activity.amount}</span>}
                </p>
                <div className="flex items-center mt-1 text-xs text-blue-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!simplified && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View all activity</button>
        </div>
      )}
    </div>
  )
}

