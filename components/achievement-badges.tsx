import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Heart,
  Droplets,
  Leaf,
  Users,
  MessageSquare,
  Share2,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Star,
  Trophy,
  Target,
  Zap,
  Sparkles,
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "donation" | "action" | "community" | "impact"
  level: "bronze" | "silver" | "gold"
  earnedDate?: string
  progress?: {
    current: number
    required: number
  }
}

interface AchievementBadgesProps {
  userId?: string
}

export default function AchievementBadges({ userId }: AchievementBadgesProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Mock data - in a real app, this would come from an API based on the userId
    const mockAchievements: Achievement[] = [
      {
        id: "a1",
        title: "First Donation",
        description: "Made your first donation to a Blue Hearts project",
        icon: "Heart",
        category: "donation",
        level: "bronze",
        earnedDate: "2023-05-15",
      },
      {
        id: "a2",
        title: "Generous Supporter",
        description: "Donated to 5 different projects",
        icon: "DollarSign",
        category: "donation",
        level: "silver",
        earnedDate: "2023-06-20",
      },
      {
        id: "a3",
        title: "Ocean Champion",
        description: "Donated a total of €1000 to ocean conservation projects",
        icon: "Droplets",
        category: "donation",
        level: "gold",
        earnedDate: "2023-07-10",
      },
      {
        id: "a4",
        title: "Community Joiner",
        description: "Became a member of the Blue Hearts Network",
        icon: "Users",
        category: "community",
        level: "bronze",
        earnedDate: "2023-05-10",
      },
      {
        id: "a5",
        title: "Social Butterfly",
        description: "Connected with 10 other Blue Hearts members",
        icon: "Users",
        category: "community",
        level: "silver",
        progress: {
          current: 6,
          required: 10,
        },
      },
      {
        id: "a6",
        title: "Conversation Starter",
        description: "Posted 5 comments on community updates",
        icon: "MessageSquare",
        category: "community",
        level: "bronze",
        earnedDate: "2023-06-05",
      },
      {
        id: "a7",
        title: "Action Taker",
        description: "Completed your first action for ocean conservation",
        icon: "Zap",
        category: "action",
        level: "bronze",
        earnedDate: "2023-05-25",
      },
      {
        id: "a8",
        title: "Consistent Advocate",
        description: "Completed 5 actions for ocean conservation",
        icon: "Target",
        category: "action",
        level: "silver",
        progress: {
          current: 3,
          required: 5,
        },
      },
      {
        id: "a9",
        title: "Project Registrar",
        description: "Registered a new conservation project",
        icon: "MapPin",
        category: "impact",
        level: "gold",
        earnedDate: "2023-07-01",
      },
      {
        id: "a10",
        title: "Knowledge Seeker",
        description: "Read 10 articles about ocean conservation",
        icon: "Leaf",
        category: "action",
        level: "bronze",
        progress: {
          current: 8,
          required: 10,
        },
      },
    ]

    setAchievements(mockAchievements)

    // Simulate earning a new achievement after 3 seconds
    setTimeout(() => {
      const newAchievement: Achievement = {
        id: "a11",
        title: "Sharing is Caring",
        description: "Shared a Blue Hearts project on social media",
        icon: "Share2",
        category: "community",
        level: "bronze",
        earnedDate: new Date().toISOString(),
      }

      setNewAchievement(newAchievement)
      setAchievements((prev) => [...prev, newAchievement])

      // Clear the notification after 5 seconds
      setTimeout(() => {
        setNewAchievement(null)
      }, 5000)
    }, 3000)
  }, [userId])

  const getIconComponent = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case "Heart":
        return <Heart className={className} />
      case "DollarSign":
        return <DollarSign className={className} />
      case "Droplets":
        return <Droplets className={className} />
      case "Users":
        return <Users className={className} />
      case "MessageSquare":
        return <MessageSquare className={className} />
      case "Share2":
        return <Share2 className={className} />
      case "Leaf":
        return <Leaf className={className} />
      case "MapPin":
        return <MapPin className={className} />
      case "Calendar":
        return <Calendar className={className} />
      case "Clock":
        return <Clock className={className} />
      case "Star":
        return <Star className={className} />
      case "Trophy":
        return <Trophy className={className} />
      case "Target":
        return <Target className={className} />
      case "Zap":
        return <Zap className={className} />
      case "Sparkles":
        return <Sparkles className={className} />
      default:
        return <Award className={className} />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "bronze":
        return "bg-amber-700/20 text-amber-400 border-amber-700/50"
      case "silver":
        return "bg-slate-400/20 text-slate-300 border-slate-400/50"
      case "gold":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
      default:
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "donation":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-600/50"
      case "community":
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
      case "action":
        return "bg-purple-600/20 text-purple-300 border-purple-600/50"
      case "impact":
        return "bg-amber-600/20 text-amber-300 border-amber-600/50"
      default:
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
    }
  }

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const earnedAchievements = filteredAchievements.filter((a) => a.earnedDate)
  const inProgressAchievements = filteredAchievements.filter((a) => !a.earnedDate)

  return (
    <div className="relative">
      {/* New achievement notification */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="bg-blue-900/90 backdrop-blur-sm border-blue-700 text-blue-50 w-72 shadow-lg">
              <CardHeader className="pb-2 flex flex-row items-center space-x-2">
                <div className={`p-2 rounded-full ${getLevelColor(newAchievement.level)}`}>
                  {getIconComponent(newAchievement.icon)}
                </div>
                <div>
                  <CardTitle className="text-base">Achievement Unlocked!</CardTitle>
                  <CardDescription className="text-blue-300">{newAchievement.title}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-blue-200">{newAchievement.description}</CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-blue-400" />
            Your Achievements
          </CardTitle>
          <CardDescription className="text-blue-300">
            Track your impact and contributions to ocean conservation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 mb-6 bg-blue-950/50">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="donation" className="text-xs">
                Donations
              </TabsTrigger>
              <TabsTrigger value="community" className="text-xs">
                Community
              </TabsTrigger>
              <TabsTrigger value="action" className="text-xs">
                Actions
              </TabsTrigger>
              <TabsTrigger value="impact" className="text-xs">
                Impact
              </TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              {/* Earned achievements */}
              {earnedAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-blue-300 mb-4">Earned Achievements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {earnedAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center text-center hover:bg-blue-800/50 transition-colors cursor-pointer group"
                      >
                        <div
                          className={`p-3 rounded-full mb-3 ${getLevelColor(achievement.level)} group-hover:scale-110 transition-transform`}
                        >
                          {getIconComponent(achievement.icon)}
                        </div>
                        <h4 className="text-sm font-medium text-blue-100 mb-1">{achievement.title}</h4>
                        <p className="text-xs text-blue-300 mb-2 line-clamp-2">{achievement.description}</p>
                        <Badge className={`text-xs ${getCategoryColor(achievement.category)}`}>
                          {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                        </Badge>
                        {achievement.earnedDate && (
                          <p className="text-xs text-blue-400 mt-2">
                            {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* In progress achievements */}
              {inProgressAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-blue-300 mb-4">Achievements In Progress</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inProgressAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-800/30 rounded-lg p-4 flex items-center space-x-4 hover:bg-blue-800/50 transition-colors cursor-pointer border border-blue-700/30 hover:border-blue-700/70"
                      >
                        <div className={`p-3 rounded-full ${getLevelColor(achievement.level)} opacity-70`}>
                          {getIconComponent(achievement.icon, "h-5 w-5")}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-blue-100">{achievement.title}</h4>
                          <p className="text-xs text-blue-300 line-clamp-1">{achievement.description}</p>
                          {achievement.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-blue-400">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress.current}/{achievement.progress.required}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-blue-950 rounded-full mt-1 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(achievement.progress.current / achievement.progress.required) * 100}%`,
                                  }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-blue-500"
                                ></motion.div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {earnedAchievements.length === 0 && inProgressAchievements.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-800/50 mb-4">
                    <Award className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-100 mb-2">No Achievements Yet</h3>
                  <p className="text-blue-300 mb-4">Start your ocean conservation journey to earn your first badges!</p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

