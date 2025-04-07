"use client"

import { useState } from "react"
import { User, MapPin, Calendar, Heart, Edit, Globe, MessageSquare, Share2, Award, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import AchievementBadges from "@/components/achievement-badges"
import UserContributions from "@/components/user-contributions"

interface UserProfileProps {
  userId: string
  isOwnProfile?: boolean
}

export default function UserProfile({ userId, isOwnProfile = false }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [bio, setBio] = useState(
    "Ocean lover and conservation enthusiast. I joined Blue Hearts Network to make a difference in marine conservation efforts.",
  )
  const [editingBio, setEditingBio] = useState(false)
  const [tempBio, setTempBio] = useState(bio)

  // Mock user data
  const userData = {
    id: userId,
    name: "Alex Johnson",
    email: "alex@example.com",
    region: "europe",
    membershipType: "premium",
    joinDate: "2023-06-15T10:30:00Z",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Barcelona, Spain",
    coordinates: { lat: 41.3851, lng: 2.1734 },
    badges: ["ocean-guardian", "coral-protector", "beach-cleanup"],
    stats: {
      projectsSupported: 4,
      commentsPosted: 12,
      totalDonated: 250,
      impactScore: 78,
    },
  }

  const handleSaveBio = () => {
    setBio(tempBio)
    setEditingBio(false)
  }

  const getRegionLabel = (region: string) => {
    return region
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 border-2 border-blue-600">
              {userData.avatar ? (
                <AvatarImage src={userData.avatar} alt={userData.name} />
              ) : (
                <AvatarFallback className="bg-blue-700 text-blue-100 text-2xl">
                  {userData.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>

            <Badge
              className={`mt-2 ${
                userData.membershipType === "premium"
                  ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-amber-500/50"
                  : "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-600/50"
              }`}
            >
              <Heart
                className={`h-3 w-3 mr-1 ${userData.membershipType === "premium" ? "text-amber-400" : "text-blue-400"}`}
              />
              {userData.membershipType === "premium" ? "Gold Member" : "Member"}
            </Badge>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-blue-100 mb-1">{userData.name}</h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <div className="flex items-center text-blue-300 text-sm">
                <MapPin className="h-4 w-4 mr-1 text-blue-400" />
                {userData.location}
              </div>

              <div className="flex items-center text-blue-300 text-sm">
                <Globe className="h-4 w-4 mr-1 text-blue-400" />
                {getRegionLabel(userData.region)}
              </div>

              <div className="flex items-center text-blue-300 text-sm">
                <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </div>
            </div>

            {!editingBio ? (
              <div className="relative bg-blue-800/30 rounded-lg p-4 text-blue-200 text-sm">
                {bio}
                {isOwnProfile && (
                  <button
                    onClick={() => {
                      setTempBio(bio)
                      setEditingBio(true)
                    }}
                    className="absolute top-2 right-2 text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-blue-800/30 rounded-lg p-4">
                <Textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="bg-blue-900/50 border-blue-700 text-blue-100 mb-2"
                  placeholder="Tell us about yourself and why you joined the Blue Hearts Network"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingBio(false)}
                    className="border-blue-700 text-blue-300 hover:bg-blue-800"
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveBio} className="bg-blue-600 hover:bg-blue-500">
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-6">
          {isOwnProfile ? (
            <>
              <Button variant="outline" className="border-blue-700 text-blue-300 hover:bg-blue-800">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-500">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-blue-700 text-blue-300 hover:bg-blue-800">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-500">
                <User className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-4 bg-blue-950/50">
          <TabsTrigger value="about" className="text-sm">
            <User className="h-4 w-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="contributions" className="text-sm">
            <Heart className="h-4 w-4 mr-2" />
            Contributions
          </TabsTrigger>
          <TabsTrigger value="badges" className="text-sm">
            <Award className="h-4 w-4 mr-2" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="saved" className="text-sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Impact Stats</CardTitle>
                <CardDescription className="text-blue-300">Your contribution to ocean conservation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">{userData.stats.projectsSupported}</div>
                      <div className="text-xs text-blue-300">Projects Supported</div>
                    </div>
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">€{userData.stats.totalDonated}</div>
                      <div className="text-xs text-blue-300">Total Donated</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-300">Impact Score</span>
                      <span className="text-sm font-medium text-blue-200">{userData.stats.impactScore}/100</span>
                    </div>
                    <Progress
                      value={userData.stats.impactScore}
                      className="h-2 bg-blue-900/50"
                      indicatorClassName="bg-emerald-500"
                    />
                    <p className="text-xs text-blue-400 mt-1">Based on your activity, donations, and engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Community Engagement</CardTitle>
                <CardDescription className="text-blue-300">
                  Your interaction with the Blue Hearts community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">{userData.stats.commentsPosted}</div>
                      <div className="text-xs text-blue-300">Comments Posted</div>
                    </div>
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">3</div>
                      <div className="text-xs text-blue-300">Badges Earned</div>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-2 text-blue-200">Recent Activity</h4>
                    <ul className="space-y-2 text-sm text-blue-300">
                      <li className="flex items-start">
                        <MessageSquare className="h-3 w-3 mr-2 mt-1 text-blue-400" />
                        <span>Commented on "Coral Reef Restoration" project</span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="h-3 w-3 mr-2 mt-1 text-pink-400" />
                        <span>Donated to "Ocean Cleanup" initiative</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-3 w-3 mr-2 mt-1 text-amber-400" />
                        <span>Earned "Beach Cleanup" badge</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contributions" className="mt-6">
          <UserContributions userId={userId} expanded={true} />
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <AchievementBadges userId={userId} expanded={true} />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800 text-center">
            <Bookmark className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-100 mb-2">Saved Items</h3>
            <p className="text-blue-300 mb-4">You can save projects, articles, and other content to view later.</p>
            <Button className="bg-blue-600 hover:bg-blue-500">Browse Projects</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

