import type React from "react"

interface Activity {
  id: number
  timestamp: string
  user: string
  action: string
}

const LiveActivityStream: React.FC = () => {
  const mockActivities: Activity[] = [
    {
      id: 1,
      timestamp: "5 minutes ago",
      user: "Alice",
      action: "joined the Blue Pulse",
    },
    {
      id: 2,
      timestamp: "10 minutes ago",
      user: "Bob",
      action: "completed a challenge",
    },
    {
      id: 3,
      timestamp: "15 minutes ago",
      user: "Charlie",
      action: "earned a new badge",
    },
    {
      id: 4,
      timestamp: "20 minutes ago",
      user: "David",
      action: "joined the Blue Pulse Team",
    },
  ]

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Live Activity Stream</h2>
      <ul>
        {mockActivities.map((activity) => (
          <li key={activity.id} className="py-2 border-b last:border-b-0">
            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
            <span className="text-gray-500">{activity.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LiveActivityStream
