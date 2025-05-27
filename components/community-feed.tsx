import type React from "react"

interface Post {
  id: number
  author: string
  content: string
  timestamp: string
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: "Alice Wonderland",
    content: "Just saw a white rabbit wearing a waistcoat! Is this real life?",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Bob The Builder",
    content: "Can we fix it? Yes, we can!",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    author: "LocalActivist",
    content:
      "Important meeting tonight about school funding. Let's make our voices heard and support our children's future! Contact your representatives and demand better resources. #EducationMatters #CommunityAction #Blue Pulse",
    timestamp: "3 days ago",
  },
]

const CommunityFeed: React.FC = () => {
  return (
    <div className="community-feed">
      <h2>Community Feed</h2>
      {mockPosts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <span className="author">{post.author}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
          <div className="post-content">{post.content}</div>
        </div>
      ))}
    </div>
  )
}

export default CommunityFeed
