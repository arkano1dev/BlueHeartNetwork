"use client"

import { useState } from "react"
import WaveBackground from "@/components/wave-background"
import FundingDashboard from "@/components/funding-dashboard"
import DonationPanel from "@/components/donation-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Building, DollarSign } from "lucide-react"
import CorporateSponsorship from "@/components/corporate-sponsorship"

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState("donate")

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">Funding & Financial Transparency</h1>
            <p className="text-lg text-blue-300 max-w-3xl mx-auto">
              Support ocean conservation with complete transparency on how your donations make an impact
            </p>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full grid grid-cols-3 bg-blue-950/50">
              <TabsTrigger value="donate" className="text-base flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="text-base flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Impact Dashboard
              </TabsTrigger>
              <TabsTrigger value="corporate" className="text-base flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Corporate
              </TabsTrigger>
            </TabsList>

            <TabsContent value="donate" className="mt-6">
              <div className="max-w-3xl mx-auto">
                <DonationPanel />
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <FundingDashboard />
            </TabsContent>

            <TabsContent value="corporate" className="mt-6">
              <CorporateSponsorship />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

