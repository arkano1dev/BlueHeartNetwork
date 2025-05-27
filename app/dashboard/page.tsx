"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, Globe, Bell, Users, ExternalLink, MapPin, Calendar, TrendingUp } from "lucide-react"
import WaveBackground from "@/components/wave-background"
import OceanDataFeed from "@/components/ocean-data-feed"
import CommunityFeed from "@/components/community-feed"
import RegionalProjects from "@/components/regional-projects"
import UserContributions from "@/components/user-contributions"
import FundingDashboard from "@/components/funding-dashboard"
import DonationPanel from "@/components/donation-panel"

interface UserData {
  name: string
  email: string
  region: string
  membershipType: string
  joinDate: string
  isLoggedIn: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("blueHeartsUser")

    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if not logged in
      router.push("/join")
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="h-12 w-12 text-blue-500 animate-pulse" />
          <p className="mt-4 text-blue-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const regionLabel = user.region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 border-2 border-blue-600 mr-4">
                <AvatarFallback className="bg-blue-700 text-blue-100 text-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-blue-100">{user.name}</h1>
                <p className="text-sm text-blue-300 mt-1">
                  Member of the BlueHearts Network - the community driving ocean change
                </p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-300 text-sm">{regionLabel}</span>

                  <Badge
                    className={`ml-3 ${
                      user.membershipType === "project"
                        ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/50"
                        : "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-600/50"
                    }`}
                  >
                    <Heart
                      className={`h-3 w-3 mr-1 ${
                        user.membershipType === "project" ? "text-emerald-400" : "text-blue-400"
                      }`}
                    />
                    {user.membershipType === "project" ? "Project Member" : "Individual Member"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100">
                Edit Profile
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-500">Invite Friends</Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Regional Content and Funding */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick donation panel */}
            <DonationPanel simplified={true} />

            <FundingDashboard simplified={true} />

            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-400" />
                    Your Regional Impact
                  </CardTitle>
                  <Badge className="bg-blue-700">{regionLabel}</Badge>
                </div>
                <CardDescription className="text-blue-300">Ocean conservation efforts in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <RegionalProjects region={user.region} />
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-400" />
                  Live Ocean Data
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Real-time updates from marine conservation projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OceanDataFeed />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Community, Contributions & Stats */}
          <div className="space-y-6">
            <UserContributions userId={user.email} />

            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Community Updates
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Latest activities from the Blue Hearts community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommunityFeed />
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  Membership Stats
                </CardTitle>
                <CardDescription className="text-blue-300">Your contribution to ocean conservation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">1</div>
                      <div className="text-xs text-blue-300">Year Membership</div>
                    </div>
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-100">
                        {user.membershipType === "premium" ? "€100" : "€10"}
                      </div>
                      <div className="text-xs text-blue-300">Annual Fee</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2 text-blue-200">Member Since</h4>
                    <div className="flex items-center text-blue-300 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(user.joinDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced CTAs */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-600/20">
                <Users className="mr-2 h-4 w-4" />
                Invite Friends to Join
              </Button>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-emerald-600/20">
                <Heart className="mr-2 h-4 w-4" />
                Upgrade Membership
              </Button>

              <Button
                variant="outline"
                className="w-full border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Company Sponsorships
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
