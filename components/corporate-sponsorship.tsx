"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  TrendingUp,
  BarChart,
  Globe,
  CheckCircle,
  Users,
  Award,
  Settings,
  BookOpen,
  Lock,
  ChevronRight,
  Leaf,
  Droplets,
  DollarSign,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CorporateSponsorship() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <Badge className="bg-blue-600/30 text-blue-300 border-blue-600/50 mb-2">For Companies</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">Corporate Sponsorship & ESG Integration</h1>
        <p className="text-lg text-blue-300">
          Partner with The BlueHearts Network to meet your Corporate Social Responsibility goals and make a measurable
          impact for ocean conservation.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-4 bg-blue-950/50">
          <TabsTrigger value="overview" className="flex items-center text-xs sm:text-sm">
            <Building className="h-4 w-4 mr-2 hidden sm:inline" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center text-xs sm:text-sm">
            <Settings className="h-4 w-4 mr-2 hidden sm:inline" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center text-xs sm:text-sm">
            <BarChart className="h-4 w-4 mr-2 hidden sm:inline" />
            Impact
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center text-xs sm:text-sm">
            <Users className="h-4 w-4 mr-2 hidden sm:inline" />
            Partners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
            <CardHeader>
              <CardTitle className="text-xl">Corporate ESG & CSR Integration</CardTitle>
              <CardDescription className="text-blue-300">
                Align your business values with measurable ocean conservation efforts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <Award className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="font-medium text-blue-100 mb-2">ESG Compliance</h3>
                  <p className="text-sm text-blue-300">
                    Meet Environmental, Social, and Governance criteria through verified ocean conservation efforts
                  </p>
                </div>
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <TrendingUp className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="font-medium text-blue-100 mb-2">Measurable Impact</h3>
                  <p className="text-sm text-blue-300">
                    Receive detailed impact reports and metrics to showcase your environmental contributions
                  </p>
                </div>
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <Globe className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="font-medium text-blue-100 mb-2">Brand Alignment</h3>
                  <p className="text-sm text-blue-300">
                    Associate your brand with positive ocean conservation initiatives and reach conscious consumers
                  </p>
                </div>
              </div>

              <div className="bg-blue-800/20 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-blue-100 mb-1">Why Partner With BlueHearts.Network?</h3>
                    <p className="text-sm text-blue-300">Comprehensive corporate partnership benefits</p>
                  </div>
                  <Badge className="self-start md:self-auto mt-2 md:mt-0 bg-emerald-600/20 text-emerald-300 border-emerald-600/50">
                    <Leaf className="h-3 w-3 mr-1" />
                    Climate Action
                  </Badge>
                </div>

                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-blue-200">Verified Carbon Offsets</span>
                      <p className="text-sm text-blue-300">
                        Support blue carbon projects with measurable CO2 sequestration
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-blue-200">Custom Impact Reporting</span>
                      <p className="text-sm text-blue-300">
                        Detailed quarterly and annual reports on your contributions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-blue-200">Employee Engagement</span>
                      <p className="text-sm text-blue-300">
                        Exclusive volunteering opportunities and educational resources
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-blue-200">Brand Recognition</span>
                      <p className="text-sm text-blue-300">
                        Logo placement and recognition as an official Blue Hearts partner
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-blue-200">Marketing Content</span>
                      <p className="text-sm text-blue-300">
                        Co-created content highlighting your sustainability initiatives
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-500">
                  <Building className="mr-2 h-4 w-4" />
                  Become a Corporate Partner
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Download Partnership Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
            <CardHeader>
              <CardTitle className="text-xl">Sponsorship Programs</CardTitle>
              <CardDescription className="text-blue-300">
                Choose from a variety of corporate sponsorship options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-700/50">
                  <Badge className="mb-2 bg-blue-600/20 text-blue-300 border-blue-600/50">Featured</Badge>
                  <h3 className="text-xl font-medium text-blue-100 mb-2">Blue Corporate Partner</h3>
                  <div className="text-3xl font-bold text-blue-100 mb-4">
                    €10,000<span className="text-sm font-normal text-blue-300">/year</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Support 3 marine conservation projects
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Quarterly impact reports
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Logo on partner page
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Employee volunteer opportunities
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Digital sponsorship badge
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500">Select Plan</Button>
                </div>

                <div className="bg-blue-700/30 rounded-lg p-6 border border-blue-600/50">
                  <Badge className="mb-2 bg-amber-500/20 text-amber-300 border-amber-500/50">Premium</Badge>
                  <h3 className="text-xl font-medium text-blue-100 mb-2">Blue Impact Leader</h3>
                  <div className="text-3xl font-bold text-blue-100 mb-4">
                    €25,000<span className="text-sm font-normal text-blue-300">/year</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Support 8 marine conservation projects
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Monthly impact reports
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Featured logo placement
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Custom volunteer programs
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Co-branded content creation
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Executive ocean conservation briefings
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                      Access to research data
                    </li>
                  </ul>
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-blue-950">Select Plan</Button>
                </div>
              </div>

              <div className="mt-8 bg-blue-800/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-100 mb-4">Custom Partnership Solutions</h3>
                <p className="text-blue-300 mb-4">
                  We also offer tailored partnerships designed to align perfectly with your company's specific ESG goals
                  and corporate values. Our team will work with you to create a customized program.
                </p>
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                >
                  Contact Us For Custom Solutions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
            <CardHeader>
              <CardTitle className="text-xl">Corporate Impact Metrics</CardTitle>
              <CardDescription className="text-blue-300">
                Measurable outcomes from our corporate partnerships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <Building className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-blue-100 mb-1">47</div>
                  <h3 className="text-sm text-blue-300">Corporate Partners</h3>
                </div>
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <DollarSign className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-blue-100 mb-1">€1.2M</div>
                  <h3 className="text-sm text-blue-300">Corporate Donations</h3>
                </div>
                <div className="bg-blue-800/30 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-blue-700/50 p-3 rounded-full mb-3">
                    <Droplets className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-blue-100 mb-1">35</div>
                  <h3 className="text-sm text-blue-300">Projects Funded</h3>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-blue-100 mb-4">Environmental Impact</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-800">
                      <TableHead className="text-blue-300">Metric</TableHead>
                      <TableHead className="text-blue-300 text-right">2021</TableHead>
                      <TableHead className="text-blue-300 text-right">2022</TableHead>
                      <TableHead className="text-blue-300 text-right">2023</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-blue-800">
                      <TableCell className="font-medium text-blue-200">Marine Area Protected (km²)</TableCell>
                      <TableCell className="text-blue-300 text-right">450</TableCell>
                      <TableCell className="text-blue-300 text-right">720</TableCell>
                      <TableCell className="text-blue-300 text-right">1,250</TableCell>
                    </TableRow>
                    <TableRow className="border-blue-800">
                      <TableCell className="font-medium text-blue-200">Coral Reef Restored (hectares)</TableCell>
                      <TableCell className="text-blue-300 text-right">12</TableCell>
                      <TableCell className="text-blue-300 text-right">25</TableCell>
                      <TableCell className="text-blue-300 text-right">37</TableCell>
                    </TableRow>
                    <TableRow className="border-blue-800">
                      <TableCell className="font-medium text-blue-200">Carbon Sequestered (tons CO2)</TableCell>
                      <TableCell className="text-blue-300 text-right">3,500</TableCell>
                      <TableCell className="text-blue-300 text-right">6,800</TableCell>
                      <TableCell className="text-blue-300 text-right">11,200</TableCell>
                    </TableRow>
                    <TableRow className="border-blue-800">
                      <TableCell className="font-medium text-blue-200">Plastic Waste Removed (tons)</TableCell>
                      <TableCell className="text-blue-300 text-right">75</TableCell>
                      <TableCell className="text-blue-300 text-right">120</TableCell>
                      <TableCell className="text-blue-300 text-right">185</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-blue-800/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-100 mb-4">ESG Reporting</h3>
                <p className="text-blue-300 mb-4">
                  All corporate partners receive detailed ESG reports that can be incorporated directly into your
                  sustainability reporting. Our metrics are verified by third-party environmental auditors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Sample ESG Report
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-500">Schedule a Consultation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <Card className="bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100">
            <CardHeader>
              <CardTitle className="text-xl">Corporate Partners</CardTitle>
              <CardDescription className="text-blue-300">
                Organizations leading the way in ocean conservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
                {/* Sample partner logos - in a real app, these would be actual company logos */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-blue-800/30 aspect-square rounded-lg flex items-center justify-center p-4"
                  >
                    <div className="text-center">
                      <Building className="h-10 w-10 text-blue-300 mx-auto mb-2" />
                      <span className="text-sm text-blue-200">Partner {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-800/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-100 mb-4">Partner Testimonials</h3>
                  <div className="space-y-4">
                    <blockquote className="border-l-2 border-blue-600 pl-4 italic text-blue-200">
                      "Partnering with BlueData.space has been transformative for our sustainability initiatives. The
                      detailed reporting and measurable impact have been invaluable for our ESG commitments."
                      <footer className="text-sm text-blue-300 mt-2 not-italic">— CEO, Global Tech Solutions</footer>
                    </blockquote>
                    <blockquote className="border-l-2 border-blue-600 pl-4 italic text-blue-200">
                      "Our employees are more engaged than ever through the volunteer opportunities and educational
                      resources provided by our Blue Hearts partnership."
                      <footer className="text-sm text-blue-300 mt-2 not-italic">
                        — CSR Director, Ocean Friendly Inc.
                      </footer>
                    </blockquote>
                  </div>
                </div>

                <div className="bg-blue-800/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-100 mb-4">Join Our Partners</h3>
                  <p className="text-blue-300 mb-4">
                    Become part of a growing network of businesses committed to ocean conservation and sustainable
                    business practices.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm text-blue-200">
                      <ChevronRight className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Enhance your brand's sustainability credibility
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <ChevronRight className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Network with like-minded organizations
                    </li>
                    <li className="flex items-center text-sm text-blue-200">
                      <ChevronRight className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                      Collaborate on innovative conservation projects
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-500">Apply to Become a Partner</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

