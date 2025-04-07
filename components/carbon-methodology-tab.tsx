"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Server, Wifi, Monitor } from "lucide-react"

export default function CarbonMethodologyTab() {
  return (
    <Card className="bg-blue-900/40 backdrop-blur-sm border-blue-800 text-blue-100">
      <CardHeader>
        <CardTitle>Carbon Calculation Methodology</CardTitle>
        <CardDescription className="text-blue-300">
          How websitecarbon.com measures our website's carbon footprint
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-blue-200">
          Our website's carbon footprint is calculated by websitecarbon.com, which uses a comprehensive methodology to
          estimate the energy used to serve our pages and the resulting carbon emissions.
        </p>

        <div className="bg-blue-800/20 rounded-lg p-5">
          <h3 className="font-medium text-blue-100 mb-3">Calculation Factors</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-700/50 p-2 rounded-full mr-3 mt-1">
                <Server className="h-4 w-4 text-blue-300" />
              </div>
              <div>
                <h4 className="font-medium text-blue-200">Data Transfer</h4>
                <p className="text-sm text-blue-300">
                  The amount of data transferred when loading a web page, including HTML, CSS, JavaScript, images, and
                  other assets.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-700/50 p-2 rounded-full mr-3 mt-1">
                <Wifi className="h-4 w-4 text-blue-300" />
              </div>
              <div>
                <h4 className="font-medium text-blue-200">Energy Sources</h4>
                <p className="text-sm text-blue-300">
                  The energy mix used by data centers and networks that serve the website, including the percentage of
                  renewable energy.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-700/50 p-2 rounded-full mr-3 mt-1">
                <Monitor className="h-4 w-4 text-blue-300" />
              </div>
              <div>
                <h4 className="font-medium text-blue-200">User Devices</h4>
                <p className="text-sm text-blue-300">
                  The energy consumed by user devices while viewing the website, including the time spent on the page
                  and device efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-800/20 rounded-lg p-5">
          <h3 className="font-medium text-blue-100 mb-3">Our A+ Rating</h3>
          <p className="text-sm text-blue-300 mb-4">Our website achieved an A+ rating because:</p>
          <ul className="space-y-2 text-sm text-blue-300">
            <li className="flex items-start">
              <Leaf className="h-4 w-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
              We use minimal JavaScript and optimized images
            </li>
            <li className="flex items-start">
              <Leaf className="h-4 w-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
              Our hosting provider uses 100% renewable energy
            </li>
            <li className="flex items-start">
              <Leaf className="h-4 w-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
              We implement efficient caching strategies
            </li>
            <li className="flex items-start">
              <Leaf className="h-4 w-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
              Our total page weight is significantly below average
            </li>
            <li className="flex items-start">
              <Leaf className="h-4 w-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
              Each page view produces only 0.09g of CO₂, much lower than the web average
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

