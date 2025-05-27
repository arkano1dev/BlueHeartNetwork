"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronRight, Clock, Eye, MessageSquare, Share2, User } from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image?: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: number
  category: "conservation" | "community" | "science" | "impact" | "news" | "project"
  tags: string[]
  views: number
  comments: number
}

export default function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockArticles: Article[] = [
      {
        id: "a1",
        title: "Project Spotlight: Seagrass Restoration in the Mediterranean",
        excerpt:
          "Learn about the BlueHeart Network's featured project working to restore vital seagrass meadows that serve as carbon sinks and marine habitats.",
        content: "Full article content here...",
        author: {
          name: "Dr. Marina Chen",
          avatar: "",
        },
        publishedAt: "2023-06-15T09:30:00Z",
        readTime: 8,
        category: "project",
        tags: ["Seagrass", "Mediterranean", "Restoration"],
        views: 1245,
        comments: 23,
      },
      {
        id: "a2",
        title: "BlueHeart Network Launches New Coral Restoration Project in Thailand",
        excerpt:
          "Our community has funded a groundbreaking coral restoration project in Thailand that will help rebuild damaged reefs using innovative techniques.",
        content: "Full article content here...",
        author: {
          name: "Sarah Johnson",
          avatar: "",
        },
        publishedAt: "2023-06-10T14:45:00Z",
        readTime: 5,
        category: "news",
        tags: ["Coral Restoration", "Thailand", "Community Funding"],
        views: 876,
        comments: 15,
      },
      {
        id: "a3",
        title: "Research Update: Ocean Acidification Monitoring Network",
        excerpt:
          "The latest findings from our network of ocean acidification monitoring stations show concerning trends that our projects are working to address.",
        content: "Full article content here...",
        author: {
          name: "Prof. James Wilson",
          avatar: "",
        },
        publishedAt: "2023-06-05T11:20:00Z",
        readTime: 10,
        category: "science",
        tags: ["Ocean Acidification", "Research", "Monitoring"],
        views: 2134,
        comments: 42,
      },
      {
        id: "a4",
        title: "Member Spotlight: How Individual Members Support Marine Conservation",
        excerpt:
          "From beach cleanups to educational programs, our individual members are taking action for ocean conservation. Read their inspiring stories.",
        content: "Full article content here...",
        author: {
          name: "Elena Rodriguez",
          avatar: "",
        },
        publishedAt: "2023-06-01T08:15:00Z",
        readTime: 6,
        category: "community",
        tags: ["Individual Members", "Volunteers", "Inspiration"],
        views: 945,
        comments: 31,
      },
      {
        id: "a5",
        title: "Project Success: Marine Protected Area Expansion in Indonesia",
        excerpt:
          "A BlueHeart Network project has successfully advocated for the expansion of a critical marine protected area in Indonesia's coral triangle.",
        content: "Full article content here...",
        author: {
          name: "Dr. Thomas Lee",
          avatar: "",
        },
        publishedAt: "2023-05-25T13:40:00Z",
        readTime: 9,
        category: "project",
        tags: ["Marine Protected Areas", "Indonesia", "Policy"],
        views: 1567,
        comments: 19,
      },
      {
        id: "a6",
        title: "BlueHeart Network Reaches 10,000 Members Milestone",
        excerpt:
          "Our global network continues to grow as more individuals and projects join the movement for ocean conservation. Celebrate this milestone with us!",
        content: "Full article content here...",
        author: {
          name: "Michael Brown",
          avatar: "",
        },
        publishedAt: "2023-05-20T10:00:00Z",
        readTime: 4,
        category: "news",
        tags: ["Milestone", "Network Growth", "Celebration"],
        views: 2356,
        comments: 87,
      },
    ]

    setArticles(mockArticles)
    setFeaturedArticle(mockArticles[0])
  }, [])

  const filteredArticles =
    selectedCategory === "all" ? articles : articles.filter((a) => a.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "project":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-600/50"
      case "community":
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
      case "science":
        return "bg-purple-600/20 text-purple-300 border-purple-600/50"
      case "news":
        return "bg-amber-600/20 text-amber-300 border-amber-600/50"
      default:
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      {/* Featured Article */}
      {featuredArticle && (
        <div className="relative overflow-hidden rounded-xl bg-blue-900/30 border border-blue-800">
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Badge className={getCategoryColor(featuredArticle.category)}>
                {featuredArticle.category.charAt(0).toUpperCase() + featuredArticle.category.slice(1)}
              </Badge>
              <h2 className="text-2xl font-bold text-blue-100 mt-3 mb-2">{featuredArticle.title}</h2>
              <p className="text-blue-300 mb-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center text-sm text-blue-400 mb-4">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(featuredArticle.publishedAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredArticle.readTime} min read
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-800 mr-2 flex items-center justify-center text-blue-300">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm text-blue-300">{featuredArticle.author.name}</span>
              </div>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                asChild
              >
                <Link href={`/blog/${featuredArticle.id}`}>
                  Read Article
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Article Filters */}
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="bg-blue-950/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="project">Projects</TabsTrigger>
          <TabsTrigger value="science">Research</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-blue-900/30 border-blue-800 text-blue-100 h-full flex flex-col hover:border-blue-700 transition-colors">
              <div className="h-12 w-full bg-blue-800/50 rounded-t-lg flex items-center justify-center">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-end">
                  <div className="flex items-center text-xs text-blue-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime} min
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                <CardDescription className="text-blue-300 text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(article.publishedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-blue-200 flex-grow">
                <p>{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-0">
                <div className="flex items-center justify-between w-full text-xs text-blue-400">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {article.author.name}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {article.comments}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/50 p-0 h-8"
                    asChild
                  >
                    <Link href={`/blog/${article.id}`}>
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/50 h-8 w-8"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Button className="bg-blue-700 hover:bg-blue-600" asChild>
          <Link href="/blog">
            View All Articles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
