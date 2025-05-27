"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import WaveBackground from "@/components/wave-background"
import CarbonFootprintSection from "@/components/carbon-footprint-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Globe, Server, Cpu, BarChart, TreePine, Droplets, ExternalLink } from "lucide-react"
import Link from "next/link"

// Add the import at the top
import CarbonImpactVisualization from "@/components/carbon-impact-visualization"
import CarbonMethodologyTab from "@/components/carbon-methodology-tab"

export default function SustainabilityPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">Our Digital Sustainability</h1>
            <p className="text-xl text-blue-300 mb-8 max-w-3xl mx-auto">
              At BlueHearts Network, we're committed to minimizing our environmental impact both in the ocean and
              online.
            </p>
          </motion.div>

          {/* Carbon Footprint Component */}
          <div className="mb-12">
            <CarbonFootprintSection />
          </div>

          {/* Website Carbon Badge */}
          <div className="mb-12 flex justify-center">
            <Link
              href="https://www.websitecarbon.com/website/blueheart-network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="bg-blue-600 p-6 rounded-lg text-center hover:bg-blue-500 transition-colors">
                <div className="bg-emerald-400 text-blue-950 text-5xl font-bold w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  A+
                </div>
                <h3 className="text-xl font-bold text-white mb-2">This website is eco-friendly</h3>
                <p className="text-blue-100">0.09g of CO₂ per page view</p>
                <p className="text-blue-100">Cleaner than 91% of web pages tested</p>
                <div className="mt-4 text-xs text-blue-200">Tested by websitecarbon.com</div>
              </div>
            </Link>
          </div>

          {/* Carbon Impact Visualization */}
          <div className="mb-12">
            <CarbonImpactVisualization />
          </div>

          {/* Tabs for more information */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid grid-cols-3 w-full bg-blue-950/50">
              <TabsTrigger value="overview" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="methodology" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Methodology
              </TabsTrigger>
              <TabsTrigger value="offsets" className="flex items-center">
                <TreePine className="h-4 w-4 mr-2" />
                Our Offsets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="bg-blue-900/40 backdrop-blur-sm border-blue-800 text-blue-100">
                <CardHeader>
                  <CardTitle>Digital Sustainability Overview</CardTitle>
                  <CardDescription className="text-blue-300">
                    How we minimize our digital carbon footprint
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-blue-200">
                    The internet accounts for approximately 3.7% of global carbon emissions, similar to the airline
                    industry. At BlueHearts Network, we're committed to building a sustainable digital presence through
                    efficient design, green hosting, and carbon offsets.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                      <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                        <Server className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="font-medium text-blue-100 mb-2">Green Hosting</h3>
                      <p className="text-sm text-blue-300">
                        Our website is hosted on servers powered by 100% renewable energy.
                      </p>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                      <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                        <Cpu className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="font-medium text-blue-100 mb-2">Efficient Code</h3>
                      <p className="text-sm text-blue-300">
                        We optimize our code and assets to minimize processing power and bandwidth.
                      </p>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                      <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                        <Leaf className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="font-medium text-blue-100 mb-2">Carbon Offsets</h3>
                      <p className="text-sm text-blue-300">
                        We offset 150% of our digital carbon emissions through verified blue carbon projects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methodology" className="mt-6">
              <CarbonMethodologyTab />
            </TabsContent>

            <TabsContent value="offsets" className="mt-6">
              <Card className="bg-blue-900/40 backdrop-blur-sm border-blue-800 text-blue-100">
                <CardHeader>
                  <CardTitle>Our Carbon Offset Projects</CardTitle>
                  <CardDescription className="text-blue-300">
                    How we offset our digital carbon footprint through blue carbon initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-blue-200">
                    We offset 150% of our calculated carbon emissions by investing in verified blue carbon projects that
                    protect and restore coastal and marine ecosystems.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-800/30 rounded-lg p-5 border border-blue-700/50">
                      <div className="flex items-center mb-3">
                        <div className="bg-emerald-700/50 p-2 rounded-full mr-3">
                          <Droplets className="h-5 w-5 text-emerald-300" />
                        </div>
                        <h3 className="font-medium text-blue-100">Mangrove Restoration</h3>
                      </div>
                      <p className="text-sm text-blue-300 mb-4">
                        We support mangrove restoration projects in Southeast Asia that sequester carbon at rates up to
                        10 times higher than terrestrial forests while providing critical habitat and coastal
                        protection.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                        asChild
                      >
                        <Link href="https://example.com/mangrove-project" target="_blank">
                          View Project
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>

                    <div className="bg-blue-800/30 rounded-lg p-5 border border-blue-700/50">
                      <div className="flex items-center mb-3">
                        <div className="bg-emerald-700/50 p-2 rounded-full mr-3">
                          <Leaf className="h-5 w-5 text-emerald-300" />
                        </div>
                        <h3 className="font-medium text-blue-100">Seagrass Meadows</h3>
                      </div>
                      <p className="text-sm text-blue-300 mb-4">
                        Our funding helps protect and restore seagrass meadows in the Mediterranean, which are vital
                        carbon sinks and nurseries for marine life.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                        asChild
                      >
                        <Link href="https://example.com/seagrass-project" target="_blank">
                          View Project
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-800/20 rounded-lg p-5 mt-4">
                    <h3 className="font-medium text-blue-100 mb-3">Verification & Transparency</h3>
                    <p className="text-sm text-blue-300 mb-4">
                      All our carbon offset projects are verified by recognized standards such as Verra's Verified
                      Carbon Standard (VCS) and the Gold Standard. We publish annual reports detailing our digital
                      carbon footprint and offset investments.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-500">Download Our Latest Impact Report</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900/60 via-emerald-900/40 to-blue-900/60 backdrop-blur-sm rounded-xl p-8 border border-blue-700/30 text-center">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">Join Our Sustainability Efforts</h2>
            <p className="text-blue-300 mb-6 max-w-2xl mx-auto">
              Help us make a bigger impact by offsetting your own digital carbon footprint or supporting our blue carbon
              projects directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-500">
                <Leaf className="mr-2 h-4 w-4" />
                Offset Your Digital Footprint
              </Button>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                asChild
              >
                <Link href="https://www.websitecarbon.com" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Calculate Your Website's Impact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
