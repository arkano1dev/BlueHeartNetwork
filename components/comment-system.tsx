"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: Comment[]
  liked?: boolean
}

interface CommentSystemProps {
  contentId: string
  contentType: "blog" | "project" | "update"
  currentUserId?: string
}

export default function CommentSystem({ contentId, contentType, currentUserId }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "This is such an important initiative! I've been following the progress of coral restoration projects for years, and it's amazing to see the impact they can have.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      likes: 5,
      replies: [
        {
          id: "1-1",
          user: {
            id: "user2",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "I agree! The before and after photos from the Bali project are incredible. Have you seen the latest data on coral growth rates?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          likes: 2,
          replies: [],
        },
      ],
    },
    {
      id: "2",
      user: {
        id: "user3",
        name: "Sofia Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "I'm planning to volunteer for a beach cleanup next month. Anyone else from Europe joining similar initiatives?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      likes: 3,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: currentUserId || "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      user: {
        id: currentUserId || "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          }
        }
        return comment
      }),
    )

    setReplyingTo(null)
    setReplyContent("")
  }

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                    liked: !reply.liked,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      )
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            }
          }
          return comment
        }),
      )
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

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-800">
        <h3 className="text-lg font-medium text-blue-100 mb-4">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10 border border-blue-700">
            <AvatarFallback className="bg-blue-700 text-blue-100">{currentUserId ? "Y" : "G"}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={`Share your thoughts on this ${contentType}...`}
              className="bg-blue-950/50 border-blue-700 text-blue-100 mb-2 min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="bg-blue-800/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-blue-700">
                    {comment.user.avatar ? (
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    ) : (
                      <AvatarFallback className="bg-blue-700 text-blue-100">
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-blue-100">{comment.user.name}</span>
                        <span className="text-xs text-blue-400 ml-2">{formatTimeAgo(comment.timestamp)}</span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-blue-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-blue-900 border-blue-700 text-blue-100">
                          <DropdownMenuItem className="cursor-pointer hover:bg-blue-800">
                            <Flag className="h-4 w-4 mr-2 text-blue-400" />
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-blue-200 mt-1">{comment.content}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center text-xs ${
                          comment.liked ? "text-pink-400" : "text-blue-400 hover:text-blue-300"
                        }`}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${comment.liked ? "fill-pink-400" : ""}`} />
                        {comment.likes > 0 && comment.likes}
                      </button>

                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="flex items-center text-xs text-blue-400 hover:text-blue-300"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply form */}
              {replyingTo === comment.id && (
                <div className="ml-12 flex gap-3">
                  <Avatar className="h-8 w-8 border border-blue-700">
                    <AvatarFallback className="bg-blue-700 text-blue-100">{currentUserId ? "Y" : "G"}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="bg-blue-950/50 border-blue-700 text-blue-100 mb-2 min-h-[60px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyingTo(null)}
                        className="border-blue-700 text-blue-300 hover:bg-blue-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-blue-600 hover:bg-blue-500"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-blue-800/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border border-blue-700">
                          {reply.user.avatar ? (
                            <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                          ) : (
                            <AvatarFallback className="bg-blue-700 text-blue-100">
                              {reply.user.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-blue-100">{reply.user.name}</span>
                              <span className="text-xs text-blue-400 ml-2">{formatTimeAgo(reply.timestamp)}</span>
                            </div>
                          </div>

                          <p className="text-blue-200 mt-1">{reply.content}</p>

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className={`flex items-center text-xs ${
                                reply.liked ? "text-pink-400" : "text-blue-400 hover:text-blue-300"
                              }`}
                            >
                              <Heart className={`h-3 w-3 mr-1 ${reply.liked ? "fill-pink-400" : ""}`} />
                              {reply.likes > 0 && reply.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

