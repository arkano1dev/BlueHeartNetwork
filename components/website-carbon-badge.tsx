"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

interface WebsiteCarbonBadgeProps {
  className?: string
}

export default function WebsiteCarbonBadge({ className = "" }: WebsiteCarbonBadgeProps) {
  // Updated data from websitecarbon.com for blueheart.network
  const carbonData = {
    rating: "A+",
    carbonPerView: 0.09, // Updated: grams of CO2 per page view
    percentileRanking: 91, // cleaner than X% of websites
    lastUpdated: "2025-04-02", // From the image
  }

  return (
    <div className={className}>
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

        {/* 
          TECHNICAL DEBT: These buttons need proper implementation in a future development phase.
          The "More Info" tooltip and "View Report" link functionality should be addressed when
          the carbon reporting system is fully integrated with the actual carbon calculation service.
          Currently commented out to avoid linking to non-existent resources.
        */}
        {/*
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-400 hover:text-blue-300">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-blue-900 border-blue-700 text-blue-100">
              <p>Carbon calculation by websitecarbon.com</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-6" asChild>
          <Link
            href="https://www.websitecarbon.com/website/blueheart-network/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Report
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </Button>
        */}
      </motion.div>
    </div>
  )
}
