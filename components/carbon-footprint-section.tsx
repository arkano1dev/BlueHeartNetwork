"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, ChevronDown, ChevronUp, Heart, TreePine, Coffee, Battery, Car, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import WebsiteCarbonBadge from "./website-carbon-badge"
import Link from "next/link"

interface CarbonFootprintSectionProps {
  className?: string
}

export default function CarbonFootprintSection({ className = "" }: CarbonFootprintSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Updated data from websitecarbon.com for blueheart.network
  const carbonData = {
    rating: "A+",
    carbonPerView: 0.09, // Updated: grams of CO2 per page view
    percentileRanking: 91, // cleaner than X% of websites
    lastUpdated: "2025-04-02", // From the image

    // Updated calculated data based on 10,000 monthly page views
    monthlyViews: 10000, // Updated: Estimated monthly page views
    annualCO2: 11.26, // Updated: kg CO2 per year (0.09g * 10000 views * 12 months / 1000)

    // New impact equivalents
    teaCups: 1526, // cups of tea that could be boiled with the same CO2
    energyKwh: 25, // kWh of energy
    phoneCharges: 2124, // full charges of an average smartphone
    bubbles: 12, // billion bubbles
    trees: 1, // trees needed to offset
    carDistance: 163, // km an electric car could drive with the same energy

    // Rating scale for visualization
    ratingScale: ["F", "E", "D", "C", "B", "A", "A+"],
  }

  // Calculate the position on the rating scale (0-100%)
  const ratingPosition = ((carbonData.ratingScale.indexOf(carbonData.rating) + 1) / carbonData.ratingScale.length) * 100

  return (
    <div className={className}>
      <div className="bg-blue-900/40 backdrop-blur-sm border-blue-800/50 rounded-lg overflow-hidden">
        {/* Basic Badge Display (Always Visible) */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between">
          <WebsiteCarbonBadge />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-300 hover:text-blue-100 mt-2 sm:mt-0"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Less Info
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                More Info
              </>
            )}
          </Button>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-blue-800/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Rating Visualization */}
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-200 mb-2">Carbon Rating</h3>

                    <div className="relative w-full h-3 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full overflow-hidden mb-2">
                      {/* Current position marker */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-full shadow-lg"
                        style={{ left: `${ratingPosition}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-blue-300">
                      <span>Clean</span>
                      <span>Average</span>
                      <span>Dirty</span>
                    </div>

                    <p className="text-center text-sm text-blue-200 mt-3">
                      This site is cleaner than {carbonData.percentileRanking}% of web pages tested
                    </p>
                  </div>

                  {/* Annual Impact */}
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-200 mb-2">Annual Impact</h3>
                    <div className="text-2xl font-bold text-blue-100 mb-1">{carbonData.annualCO2} kg CO₂</div>
                    <p className="text-xs text-blue-300">
                      Based on {carbonData.monthlyViews.toLocaleString()} monthly page views
                    </p>

                    <div className="mt-3 text-xs text-blue-300">
                      <div className="flex items-center mb-1">
                        <Zap className="h-3 w-3 mr-1 text-blue-400" />
                        {carbonData.energyKwh} kWh of energy used annually
                      </div>
                      <div className="flex items-center mb-1">
                        <TreePine className="h-3 w-3 mr-1 text-emerald-400" />
                        Equivalent to {carbonData.trees} tree absorbing CO₂ annually
                      </div>
                    </div>
                  </div>

                  {/* Offset Options */}
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-200 mb-2">Our Commitment</h3>
                    <p className="text-xs text-blue-300 mb-3">
                      We offset 150% of our website's carbon emissions through verified blue carbon projects.
                    </p>
                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                      <Link
                        href="https://www.websitecarbon.com/website/blueheart-network/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Support Blue Carbon Projects
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* New section: Impact Equivalents */}
                <div className="bg-blue-800/30 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-medium text-blue-200 mb-3">Environmental Impact Equivalents</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-blue-800/40 p-3 rounded-lg flex items-start">
                      <Coffee className="h-4 w-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-blue-100">{carbonData.teaCups.toLocaleString()}</div>
                        <div className="text-xs text-blue-300">cups of tea boiled</div>
                      </div>
                    </div>
                    <div className="bg-blue-800/40 p-3 rounded-lg flex items-start">
                      <Battery className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-blue-100">
                          {carbonData.phoneCharges.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-300">smartphone charges</div>
                      </div>
                    </div>
                    <div className="bg-blue-800/40 p-3 rounded-lg flex items-start">
                      <Car className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-blue-100">{carbonData.carDistance} km</div>
                        <div className="text-xs text-blue-300">electric car journey</div>
                      </div>
                    </div>
                    <div className="bg-blue-800/40 p-3 rounded-lg flex items-start col-span-2 md:col-span-3">
                      <div className="text-xs text-blue-300 italic">
                        Our annual carbon footprint of {carbonData.annualCO2} kg CO₂ is equivalent to{" "}
                        {carbonData.bubbles} billion bubbles and requires just {carbonData.trees} tree to offset.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800/20 rounded-lg p-3 text-xs text-blue-300">
                  <div className="flex items-start">
                    <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    <p>
                      Carbon calculation by{" "}
                      <a
                        href="https://www.websitecarbon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        websitecarbon.com
                      </a>
                      . Last tested on {new Date(carbonData.lastUpdated).toLocaleDateString()}. The BlueHearts Network
                      is built with efficiency in mind, using optimized images, minimal JavaScript, and green hosting.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
