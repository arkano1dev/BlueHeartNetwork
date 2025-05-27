"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface CarbonFooterProps {
  className?: string
  staticMode?: boolean
  staticData?: {
    carbonPerView: number
    percentileRanking: number
    rating: string
  }
}

export default function CarbonFooter({ className = "", staticMode = true, staticData }: CarbonFooterProps) {
  const [carbonData, setCarbonData] = useState({
    carbonPerView: staticData?.carbonPerView || 0.16,
    percentileRanking: staticData?.percentileRanking || 91,
    rating: staticData?.rating || "A+",
    isLoading: !staticMode && !staticData,
  })

  // Fetch carbon data from API if not in static mode
  useEffect(() => {
    if (staticMode || staticData) return

    const fetchCarbonData = async () => {
      try {
        setCarbonData((prev) => ({ ...prev, isLoading: true }))

        // In a real implementation, this would be an actual API call
        // For demo purposes, we'll simulate an API response after a delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulated API response
        const response = {
          carbonPerView: 0.16, // grams of CO2 per page view
          percentileRanking: 91, // cleaner than X% of websites
          rating: "A+", // rating based on carbon efficiency
        }

        setCarbonData({
          ...response,
          isLoading: false,
        })
      } catch (error) {
        setCarbonData((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    fetchCarbonData()
  }, [staticMode, staticData])

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 py-2"
      >
        <div className="flex items-center">
          <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-l-md px-3 py-1 flex items-center">
            <Leaf className="h-4 w-4 mr-1" />
            <span className="font-medium">{carbonData.rating}</span>
          </div>
          <div className="bg-blue-800/30 border border-blue-700/30 rounded-r-md px-3 py-1 text-blue-200 text-sm">
            {carbonData.carbonPerView}g CO₂/view
          </div>
        </div>

        <div className="text-sm text-blue-300">Cleaner than {carbonData.percentileRanking}% of websites tested</div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-400 hover:text-blue-300">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-blue-900 border-blue-700 text-blue-100">
              <p>We measure and offset our website's carbon footprint.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-6" asChild>
          <Link href="/sustainability">
            Learn More
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
