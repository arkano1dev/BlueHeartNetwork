"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Heart,
  Calendar,
  Download,
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react"

interface UserContributionsProps {
  userId: string
  className?: string
}

export default function UserContributions({ userId, className = "" }: UserContributionsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [contributionData, setContributionData] = useState<any>({
    total: 0,
    projects: 0,
    recurring: false,
    nextBilling: "",
    history: [],
    impact: {},
    annualTarget: 0,
    annualProgress: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with mock data
    setTimeout(() => {
      // Get user data from localStorage to determine donation amount
      const userData = localStorage.getItem("blueHeartsUser")
      let userMembershipType = "standard"

      if (userData) {
        const user = JSON.parse(userData)
        userMembershipType = user.membershipType
      }

      const baseAmount = userMembershipType === "premium" ? 100 : 10

      setContributionData({
        total: baseAmount + Math.floor(Math.random() * 300),
        projects: Math.floor(Math.random() * 3) + 1,
        recurring: Math.random() > 0.5,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        history: [
          {
            id: "t1",
            date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: baseAmount,
            type: "membership",
            status: "complete",
          },
          {
            id: "t2",
            date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: 25,
            type: "donation",
            project: "Coral Reforestation in Thailand",
            status: "complete",
          },
          {
            id: "t3",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: 50,
            type: "donation",
            project: "Great Barrier Reef Resilience",
            status: "complete",
          },
        ],
        impact: {
          corals: Math.floor(Math.random() * 20) + 5,
          area: Math.floor(Math.random() * 10) + 2,
          carbon: Math.floor(Math.random() * 500) + 100,
        },
        annualTarget: 500,
        annualProgress: baseAmount + Math.floor(Math.random() * 200),
      })

      setLoading(false)
    }, 1000)
  }, [userId])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-600/50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complete
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-600/20 text-amber-300 border-amber-600/50">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-600/20 text-red-300 border-red-600/50">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className={`bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
          Your Contributions
        </CardTitle>
        <CardDescription className="text-blue-300">
          Track your impact and financial contributions to ocean conservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-blue-800/50 rounded-lg"></div>
            <div className="h-8 bg-blue-800/50 rounded-lg w-full mt-6"></div>
            <div className="h-64 bg-blue-800/50 rounded-lg"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center">
                <div className="text-sm text-blue-300 mb-1">Total Contributions</div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {formatCurrency(contributionData.total)}
                </motion.div>
                {contributionData.recurring && (
                  <div className="text-xs text-blue-400 mt-1 flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Next: {formatDate(contributionData.nextBilling)}
                  </div>
                )}
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center">
                <div className="text-sm text-blue-300 mb-1">Projects Supported</div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {contributionData.projects}
                </motion.div>
                <div className="text-xs text-blue-400 mt-1">Around the world</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center">
                <div className="text-sm text-blue-300 mb-1">Annual Goal</div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-baseline"
                >
                  <span className="text-2xl md:text-3xl font-bold text-blue-100">
                    {Math.round((contributionData.annualProgress / contributionData.annualTarget) * 100)}%
                  </span>
                  <span className="text-sm text-blue-300 ml-1">of {formatCurrency(contributionData.annualTarget)}</span>
                </motion.div>
                <div className="w-full mt-2">
                  <Progress
                    value={(contributionData.annualProgress / contributionData.annualTarget) * 100}
                    className="h-2 bg-blue-950"
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="bg-blue-950/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Donation History</TabsTrigger>
                <TabsTrigger value="impact">Your Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-800 pb-4">
                    <div>
                      <h3 className="font-medium text-blue-100">Annual Contribution Goal</h3>
                      <p className="text-sm text-blue-300">Track your progress towards your annual donation target</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                    >
                      Adjust Goal
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300">
                        {formatCurrency(contributionData.annualProgress)} of{" "}
                        {formatCurrency(contributionData.annualTarget)}
                      </span>
                      <span className="text-blue-300">
                        {Math.round((contributionData.annualProgress / contributionData.annualTarget) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(contributionData.annualProgress / contributionData.annualTarget) * 100}
                      className="h-3 bg-blue-950"
                    />
                    <p className="text-xs text-blue-400 text-right">
                      {formatCurrency(contributionData.annualTarget - contributionData.annualProgress)} to reach your
                      goal
                    </p>
                  </div>

                  <div className="pt-4 space-y-4">
                    <h3 className="font-medium text-blue-100">Recent Donations</h3>
                    {contributionData.history.slice(0, 2).map((transaction: any) => (
                      <div
                        key={transaction.id}
                        className="bg-blue-800/30 rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-blue-200">
                            {transaction.type === "membership" ? "Membership Fee" : transaction.project}
                          </div>
                          <div className="text-xs text-blue-400 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(transaction.date)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-100">{formatCurrency(transaction.amount)}</div>
                          <div className="mt-1">{getStatusBadge(transaction.status)}</div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full text-blue-300 hover:text-blue-100 hover:bg-blue-800/50"
                      onClick={() => setActiveTab("history")}
                    >
                      View All Transactions
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-blue-800">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500">
                      <Heart className="mr-2 h-4 w-4" />
                      Make a New Donation
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-blue-100">Donation History</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>

                  {contributionData.history.map((transaction: any) => (
                    <div
                      key={transaction.id}
                      className="bg-blue-800/30 rounded-lg p-3 flex justify-between items-center mb-3"
                    >
                      <div>
                        <div className="font-medium text-blue-200">
                          {transaction.type === "membership" ? "Membership Fee" : transaction.project}
                        </div>
                        <div className="text-xs text-blue-400 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-blue-100">{formatCurrency(transaction.amount)}</div>
                        <div className="mt-1">{getStatusBadge(transaction.status)}</div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center text-sm text-blue-300 pt-4">
                    Showing all transactions for the current year.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="impact" className="mt-4">
                <div className="space-y-6">
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="font-medium text-blue-100 mb-3">Your Environmental Impact</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-100">{contributionData.impact.corals}</div>
                        <div className="text-xs text-blue-300">Corals Planted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-100">{contributionData.impact.area}m²</div>
                        <div className="text-xs text-blue-300">Area Protected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-100">{contributionData.impact.carbon}kg</div>
                        <div className="text-xs text-blue-300">CO₂ Offset</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="font-medium text-blue-100 mb-3">Projects You've Supported</h3>
                    <ul className="space-y-3">
                      {contributionData.history
                        .filter((t: any) => t.type === "donation" && t.project)
                        .map((transaction: any) => (
                          <li key={transaction.id} className="flex items-start">
                            <Heart className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                            <div>
                              <div className="text-blue-200">{transaction.project}</div>
                              <div className="text-xs text-blue-400">
                                {formatCurrency(transaction.amount)} on {formatDate(transaction.date)}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="font-medium text-blue-100 mb-2">Impact Certificate</h3>
                    <p className="text-sm text-blue-300 mb-3">
                      Download your personalized impact certificate showing your contribution to ocean conservation
                      efforts.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Generate Certificate
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}
