"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
} from "recharts"
import {
  DollarSign,
  Users,
  Globe,
  TrendingUp,
  Calendar,
  PieChartIcon,
  BarChartIcon,
  LineChartIcon,
  HelpCircle,
} from "lucide-react"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FundingDashboardProps {
  className?: string
  simplified?: boolean
}

export default function FundingDashboard({ className = "", simplified = false }: FundingDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [fundingData, setFundingData] = useState({
    totalRaised: 0,
    projectsSupported: 0,
    activeCampaigns: 0,
    monthlyDonations: 0,
    annualGrowth: 0,
    donors: 0,
  })
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [regionData, setRegionData] = useState<any[]>([])
  const [projectData, setProjectData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with mock data
    setTimeout(() => {
      // Fund stats with animated counting
      setFundingData({
        totalRaised: 3245000,
        projectsSupported: 78,
        activeCampaigns: 23,
        monthlyDonations: 175000,
        annualGrowth: 42,
        donors: 8765,
      })

      // Monthly funding data
      setMonthlyData([
        { name: "Jan", amount: 150000 },
        { name: "Feb", amount: 175000 },
        { name: "Mar", amount: 165000 },
        { name: "Apr", amount: 190000 },
        { name: "May", amount: 210000 },
        { name: "Jun", amount: 235000 },
        { name: "Jul", amount: 245000 },
        { name: "Aug", amount: 260000 },
        { name: "Sep", amount: 290000 },
        { name: "Oct", amount: 320000 },
        { name: "Nov", amount: 345000 },
        { name: "Dec", amount: 360000 },
      ])

      // Category allocation data
      setCategoryData([
        { name: "Coral Restoration", value: 32 },
        { name: "Marine Conservation", value: 25 },
        { name: "Plastic Cleanup", value: 18 },
        { name: "Research", value: 15 },
        { name: "Education", value: 10 },
      ])

      // Regional allocation data
      setRegionData([
        { name: "Asia Pacific", funds: 1250000 },
        { name: "Americas", funds: 850000 },
        { name: "Europe", funds: 650000 },
        { name: "Africa", funds: 450000 },
        { name: "Oceania", funds: 350000 },
      ])

      // Top funded projects
      setProjectData([
        {
          id: 1,
          name: "Great Barrier Reef Restoration",
          funds: 450000,
          goal: 500000,
          progress: 90,
          region: "Oceania",
        },
        {
          id: 2,
          name: "Mediterranean Seagrass Protection",
          funds: 375000,
          goal: 400000,
          progress: 94,
          region: "Europe",
        },
        {
          id: 3,
          name: "Pacific Ocean Plastic Cleanup",
          funds: 325000,
          goal: 500000,
          progress: 65,
          region: "Asia Pacific",
        },
        {
          id: 4,
          name: "Coral Restoration in Thailand",
          funds: 275000,
          goal: 300000,
          progress: 92,
          region: "Asia Pacific",
        },
        {
          id: 5,
          name: "Mangrove Reforestation in Kenya",
          funds: 225000,
          goal: 350000,
          progress: 64,
          region: "Africa",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  // Pie chart colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(amount)
  }

  // Simplified display for homepage or widget use
  if (simplified) {
    return (
      <Card className={`bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100 ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
            Impact Funding Overview
          </CardTitle>
          <CardDescription className="text-blue-300">
            Real-time financial impact of the Blue Hearts Network
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-blue-800/50 rounded-lg"></div>
              <div className="h-40 bg-blue-800/50 rounded-lg"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-100">
                    {formatCurrency(fundingData.totalRaised)}
                  </div>
                  <div className="text-xs md:text-sm text-blue-300 mt-1">Total Funds Raised</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-100">{fundingData.projectsSupported}</div>
                  <div className="text-xs md:text-sm text-blue-300 mt-1">Projects Supported</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-4 text-center col-span-2 md:col-span-1">
                  <div className="text-2xl md:text-3xl font-bold text-blue-100">{fundingData.activeCampaigns}</div>
                  <div className="text-xs md:text-sm text-blue-300 mt-1">Active Campaigns</div>
                </div>
              </div>

              <div className="h-60 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      {/* Gradient for the line chart */}
                      <linearGradient id="colorFundingSimple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                      </linearGradient>
                      {/* Gradient for the area under the line */}
                      <linearGradient id="areaFundingSimple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#304766" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#94a3b8" }}
                      axisLine={{ stroke: "#304766" }}
                      tickLine={{ stroke: "#304766" }}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8" }}
                      axisLine={{ stroke: "#304766" }}
                      tickLine={{ stroke: "#304766" }}
                      tickFormatter={(value) => formatCurrency(value).replace("€", "")}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e3a5f",
                        borderColor: "#304766",
                        color: "#e2e8f0",
                        borderRadius: "0.5rem",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: any) => [formatCurrency(value), "Funding"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 2, fill: "#1e3a5f" }}
                      activeDot={{ r: 5, strokeWidth: 2, fill: "#3b82f6" }}
                      fillOpacity={1}
                      fill="url(#areaFundingSimple)"
                    />
                    {/* Add area under the line for better visual */}
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="none"
                      fillOpacity={1}
                      fill="url(#areaFundingSimple)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
          Transparent Funding Dashboard
        </CardTitle>
        <CardDescription className="text-blue-300">
          Comprehensive financial data showing where and how funds are being used
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-blue-800/50 rounded-lg"></div>
            <div className="h-8 bg-blue-800/50 rounded-lg w-full mt-6"></div>
            <div className="h-72 bg-blue-800/50 rounded-lg"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {formatCurrency(fundingData.totalRaised)}
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Total Funds Raised</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Globe className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {fundingData.projectsSupported}
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Projects Supported</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {fundingData.activeCampaigns}
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Active Campaigns</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {formatCurrency(fundingData.monthlyDonations)}
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Monthly Donations</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  {fundingData.donors.toLocaleString()}
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Active Donors</div>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400 mb-2" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl md:text-3xl font-bold text-blue-100"
                >
                  +{fundingData.annualGrowth}%
                </motion.div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">Annual Growth</div>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-blue-950/50">
                  <TabsTrigger value="overview" className="flex items-center">
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="allocation" className="flex items-center">
                    <PieChartIcon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Allocation</span>
                  </TabsTrigger>
                  <TabsTrigger value="regions" className="flex items-center">
                    <BarChartIcon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Regions</span>
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Projects</span>
                  </TabsTrigger>
                </TabsList>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-blue-300 hover:text-blue-200 cursor-help">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-blue-900 border-blue-700 text-blue-100">
                      <p>Financial data is updated monthly and audited by independent parties</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <TabsContent value="overview" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <defs>
                        {/* Gradient for the line chart */}
                        <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                        </linearGradient>
                        {/* Gradient for the area under the line */}
                        <linearGradient id="areaFunding" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#304766" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#94a3b8" }}
                        axisLine={{ stroke: "#304766" }}
                        tickLine={{ stroke: "#304766" }}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8" }}
                        axisLine={{ stroke: "#304766" }}
                        tickLine={{ stroke: "#304766" }}
                        tickFormatter={(value) => formatCurrency(value).replace("€", "")}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e3a5f",
                          borderColor: "#304766",
                          color: "#e2e8f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value: any) => [formatCurrency(value), "Funding"]}
                        labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                      />
                      <Legend wrapperStyle={{ color: "#94a3b8", paddingTop: "1rem" }} iconType="circle" />
                      <Line
                        name="Monthly Funding"
                        type="monotone"
                        dataKey="amount"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "#1e3a5f" }}
                        activeDot={{ r: 6, strokeWidth: 2, fill: "#3b82f6" }}
                        fillOpacity={1}
                        fill="url(#areaFunding)"
                      />
                      {/* Add area under the line for better visual */}
                      <Area type="monotone" dataKey="amount" stroke="none" fillOpacity={1} fill="url(#areaFunding)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-blue-300 mt-4 text-center">
                  Monthly funding has grown by {fundingData.annualGrowth}% over the past year.
                </p>
              </TabsContent>

              <TabsContent value="allocation" className="mt-0">
                <div className="md:flex">
                  <div className="w-full md:w-1/2 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          {/* Enhanced gradients for pie chart segments */}
                          <linearGradient id="colorCoral" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0088FE" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#0088FE" stopOpacity={0.7} />
                          </linearGradient>
                          <linearGradient id="colorMarine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C49F" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#00C49F" stopOpacity={0.7} />
                          </linearGradient>
                          <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#FFBB28" stopOpacity={0.7} />
                          </linearGradient>
                          <linearGradient id="colorResearch" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF8042" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#FF8042" stopOpacity={0.7} />
                          </linearGradient>
                          <linearGradient id="colorEducation" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.7} />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          animationDuration={1500}
                          animationBegin={300}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#color${entry.name.replace(/\s+/g, "")})`}
                              stroke="#1e3a5f"
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e3a5f",
                            borderColor: "#304766",
                            color: "#e2e8f0",
                            borderRadius: "0.5rem",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: any) => [`${value}%`, "Allocation"]}
                          labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                        />
                        <Legend
                          wrapperStyle={{ color: "#94a3b8", paddingTop: "1rem" }}
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="bottom"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-lg font-medium text-blue-100 mb-4">Funding Allocation</h3>
                    <div className="space-y-3">
                      {categoryData.map((category, index) => (
                        <div key={category.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">{category.name}</span>
                            <span className="text-blue-300">{category.value}%</span>
                          </div>
                          <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${category.value}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="regions" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <defs>
                        {/* Gradient for bars */}
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#304766" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#94a3b8" }}
                        axisLine={{ stroke: "#304766" }}
                        tickLine={{ stroke: "#304766" }}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8" }}
                        axisLine={{ stroke: "#304766" }}
                        tickLine={{ stroke: "#304766" }}
                        tickFormatter={(value) => formatCurrency(value).replace("€", "")}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e3a5f",
                          borderColor: "#304766",
                          color: "#e2e8f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value: any) => [formatCurrency(value), "Funding"]}
                        labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                        cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                      />
                      <Legend wrapperStyle={{ color: "#94a3b8", paddingTop: "1rem" }} iconType="circle" />
                      <Bar
                        name="Regional Funding"
                        dataKey="funds"
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        animationBegin={300}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-blue-300 mt-4 text-center">
                  Funding allocation by geographical region showing where projects are being implemented.
                </p>
              </TabsContent>

              <TabsContent value="projects" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-100">Top Funded Projects</h3>
                  {projectData.map((project) => (
                    <div key={project.id} className="bg-blue-800/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-blue-100">{project.name}</h4>
                          <div className="text-sm text-blue-300">{project.region}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-100">{formatCurrency(project.funds)}</div>
                          <div className="text-sm text-blue-300">of {formatCurrency(project.goal)}</div>
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2 bg-blue-950" />
                      <div className="text-xs text-blue-400 mt-1 text-right">{project.progress}% funded</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}

