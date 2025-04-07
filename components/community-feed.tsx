import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface CommunityPost {
  id: number
  user: {
    name: string
    initials: string
    memberType: "standard" | "premium"
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  hasLiked: boolean
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      setLoading(true)

      // Mock data
      const mockPosts: CommunityPost[] = [
        {
          id: 1,
          user: {
            name: "Marina Costa",
            initials: "MC",
            memberType: "premium",
          },
          content:
            "Just participated in a beach cleanup in Barcelona! We collected over 50kg of plastic waste. Every small action counts! 🌊💙 #OceanCleanup",
          timestamp: "2023-06-15T10:30:00Z",
          likes: 24,
          comments: 5,
          hasLiked: false,
        },
        {
          id: 2,
          user: {
            name: "David Chen",
            initials: "DC",
            memberType: "standard",
          },
          content:
            "Excited to join the coral restoration workshop next month in Thailand. Anyone else going to be there?",
          timestamp: "2023-06-14T15:45:00Z",
          likes: 18,
          comments: 7,
          hasLiked: true,
        },
        {
          id: 3,
          user: {
            name: "Sophia Mendez",
            initials: "SM",
            memberType: "premium",
          },
          content:
            "Our school's marine education program just received funding from Blue Hearts Network! Thank you for supporting ocean literacy for the next generation. 💙",
          timestamp: "2023-06-13T09:20:00Z",
          likes: 42,
          comments: 11,
          hasLiked: false,
        },
      ]

      setPosts(mockPosts)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post,
      ),
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-pulse space-y-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-blue-800/50 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
      {posts.map((post) => (
        <div key={post.id} className="p-4 rounded-lg bg-blue-800/30 border border-blue-800">
          <div className="flex items-start space-x-3 mb-3">
            <Avatar
              className={`h-8 w-8 border ${
                post.user.memberType === "premium" ? "border-amber-500" : "border-blue-600"
              }`}
            >
              <AvatarFallback
                className={`text-xs ${
                  post.user.memberType === "premium" ? "bg-amber-900/50 text-amber-200" : "bg-blue-700 text-blue-100"
                }`}
              >
                {post.user.initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center">
                <span className="font-medium text-blue-100">{post.user.name}</span>
                {post.user.memberType === "premium" && <Heart className="h-3 w-3 ml-1 text-amber-400" />}
              </div>
              <div className="text-xs text-blue-400">
                {new Date(post.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          <p className="text-sm text-blue-200 mb-3">{post.content}</p>

          <div className="flex items-center space-x-4 text-xs text-blue-300">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 text-xs ${post.hasLiked ? "text-blue-400" : "text-blue-300"}`}
              onClick={() => handleLike(post.id)}
            >
              <Heart className={`h-4 w-4 mr-1 ${post.hasLiked ? "fill-blue-400 text-blue-400" : ""}`} />
              {post.likes}
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100">
        View More Updates
      </Button>
    </div>
  )
}

