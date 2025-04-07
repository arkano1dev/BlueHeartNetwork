import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, ExternalLink, RefreshCw, Info, Heart } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface CarbonFootprintProps {
  className?: string
  staticMode?: boolean
  staticData?: {
    carbonPerView: number
    percentileRanking: number
    rating: string
    lastUpdated?: string
  }
}

export default function CarbonFootprint({ className = "", staticMode = false, staticData }: CarbonFootprintProps) {
  const [carbonData, setCarbonData] = useState({
    carbonPerView: staticData?.carbonPerView || 0.12,
    percentileRanking: staticData?.percentileRanking || 91,
    rating: staticData?.rating || "A+",
    lastUpdated: staticData?.lastUpdated || new Date().toISOString(),
    isLoading: !staticMode,
    error: null as string | null,
  })

  // Calculate the total estimated carbon for the site
  const [totalViews, setTotalViews] = useState(15000) // Estimated monthly views
  const totalCarbon = (carbonData.carbonPerView * totalViews) / 1000 // in kg

  // For the progress bar - rating scale from F to A+
  const getRatingPercentage = (rating: string) => {
    const ratings = ["F", "E", "D", "C", "B", "A", "A+"]
    const index = ratings.indexOf(rating)
    return ((index + 1) / ratings.length) * 100
  }

  // Fetch carbon data from API if not in static mode
  useEffect(() => {
    if (staticMode) return

    const fetchCarbonData = async () => {
      try {
        setCarbonData((prev) => ({ ...prev, isLoading: true, error: null }))

        // In a real implementation, this would be an actual API call
        // For demo purposes, we'll simulate an API response after a delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulated API response
        const response = {
          carbonPerView: 0.14, // grams of CO2 per page view
          percentileRanking: 93, // cleaner than X% of websites
          rating: "A+", // rating based on carbon efficiency
          lastUpdated: new Date().toISOString(),
        }

        setCarbonData({
          ...response,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setCarbonData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to fetch carbon data. Using estimated values.",
        }))
      }
    }

    fetchCarbonData()
  }, [staticMode])

  // Format the last updated date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate offset cost (very rough estimate - $10 per ton of CO2)
  const offsetCost = totalCarbon * 10

  return (
    <div className={`w-full ${className}`}>
      <Card className="bg-blue-900/40 backdrop-blur-sm border-blue-800 text-blue-100 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Carbon Rating Section */}
            <div className="bg-gradient-to-br from-blue-800/70 to-blue-900/70 p-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-4xl font-bold text-blue-950">
                  {carbonData.isLoading ? (
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-950" />
                  ) : (
                    carbonData.rating
                  )}
                </div>
                <Leaf className="absolute -top-2 -right-2 h-8 w-8 text-emerald-300" />
              </motion.div>

              <h3 className="mt-4 text-xl font-bold text-blue-100">Carbon Rating</h3>

              <div className="mt-2 w-full">
                <div className="flex justify-between text-xs text-blue-300 mb-1">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
                <div className="relative w-full h-3 bg-blue-950 rounded-full overflow-hidden">
                  {/* Rating scale background */}
                  <div className="absolute inset-0 flex">
                    <div className="h-full w-1/7 bg-emerald-500"></div>
                    <div className="h-full w-1/7 bg-emerald-400"></div>
                    <div className="h-full w-1/7 bg-green-400"></div>
                    <div className="h-full w-1/7 bg-yellow-400"></div>
                    <div className="h-full w-1/7 bg-orange-400"></div>
                    <div className="h-full w-1/7 bg-red-400"></div>
                    <div className="h-full w-1/7 bg-red-600"></div>
                  </div>

                  {/* Current rating indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getRatingPercentage(carbonData.rating)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute left-0 top-0 h-full bg-blue-500/50 backdrop-blur-sm"
                  ></motion.div>

                  {/* Current position marker */}
                  <motion.div
                    initial={{ left: 0, opacity: 0 }}
                    animate={{
                      left: `${getRatingPercentage(carbonData.rating)}%`,
                      opacity: 1,
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600"
                  ></motion.div>
                </div>

                <p className="text-center text-sm text-blue-300 mt-2">
                  Cleaner than {carbonData.percentileRanking}% of websites
                </p>
              </div>
            </div>

            {/* Carbon Details Section */}
            <div className="p-6 md:col-span-2">
              <div className="flex items-center mb-4">
                <Leaf className="h-5 w-5 mr-2 text-emerald-400" />
                <h2 className="text-xl font-bold text-blue-100">Our Digital Carbon Footprint</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2 h-6 w-6 text-blue-400 hover:text-blue-300">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-blue-900 border-blue-700 text-blue-100 max-w-xs">
                      <p>
                        We measure the carbon emissions of our website using the CO2.js methodology, which calculates
                        the energy used to serve our pages and the resulting carbon emissions.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Carbon per page view</div>
                  <div className="text-2xl font-bold text-blue-100">
                    {carbonData.isLoading ? (
                      <div className="h-8 w-24 bg-blue-800/50 animate-pulse rounded"></div>
                    ) : (
                      `${carbonData.carbonPerView}g CO₂`
                    )}
                  </div>
                  <div className="text-xs text-blue-400 mt-1">
                    Equivalent to charging a smartphone for {(carbonData.carbonPerView * 50).toFixed(1)} seconds
                  </div>
                </div>

                <div className="bg-blue-800/30 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Estimated monthly impact</div>
                  <div className="text-2xl font-bold text-blue-100">
                    {carbonData.isLoading ? (
                      <div className="h-8 w-24 bg-blue-800/50 animate-pulse rounded"></div>
                    ) : (
                      `${totalCarbon.toFixed(2)}kg CO₂`
                    )}
                  </div>
                  <div className="text-xs text-blue-400 mt-1">
                    Based on approximately {totalViews.toLocaleString()} monthly page views
                  </div>
                </div>
              </div>

              <div className="bg-blue-800/20 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-blue-100 mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-emerald-400" />
                  Our Commitment
                </h3>
                <p className="text-sm text-blue-300 mb-3">
                  The BlueHearts Network is committed to minimizing our digital carbon footprint. We offset 150% of our
                  emissions through verified blue carbon projects that protect and restore ocean ecosystems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    Offset Your Impact
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                    asChild
                  >
                    <Link href="/sustainability">
                      Learn More
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-blue-400">
                <div className="flex items-center">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Last updated: {formatDate(carbonData.lastUpdated)}
                </div>
                {!staticMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-800/50"
                    onClick={() => setCarbonData((prev) => ({ ...prev, isLoading: true }))}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

