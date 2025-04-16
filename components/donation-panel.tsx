"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Globe,
  Heart,
  Users,
  CheckCircle,
  Building,
  User,
  Briefcase,
  CreditCard,
  Lock,
  Shield,
} from "lucide-react"

interface DonationTarget {
  id: string
  type: "project" | "member" | "foundation"
  name: string
  description?: string
  image?: string
}

interface DonationPanelProps {
  defaultTarget?: DonationTarget
  simplified?: boolean
  className?: string
}

export default function DonationPanel({ defaultTarget, simplified = false, className = "" }: DonationPanelProps) {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [donationAmount, setDonationAmount] = useState<string>(defaultTarget?.type === "foundation" ? "100" : "50")
  const [customAmount, setCustomAmount] = useState<boolean>(false)
  const [donationTarget, setDonationTarget] = useState<DonationTarget | null>(defaultTarget || null)
  const [showTargetSelector, setShowTargetSelector] = useState<boolean>(!defaultTarget)
  const [donorType, setDonorType] = useState<"individual" | "company">("individual")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)

  // Mock donation targets
  const donationTargets = {
    projects: [
      {
        id: "p1",
        type: "project" as const,
        name: "Coral Reforestation in Thailand",
        description: "Restoring damaged coral reefs along Thailand's coastline",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "p2",
        type: "project" as const,
        name: "Great Barrier Reef Resilience",
        description: "Supporting the Great Barrier Reef against climate impact",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "p3",
        type: "project" as const,
        name: "Mediterranean Seagrass Protection",
        description: "Protecting vital seagrass meadows in the Mediterranean",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    members: [
      {
        id: "m1",
        type: "member" as const,
        name: "Dr. Marina Chen",
        description: "Marine Biologist leading coral research",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "m2",
        type: "member" as const,
        name: "Carlos Rodriguez",
        description: "Conservation leader in the Caribbean",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    foundation: [
      {
        id: "f1",
        type: "foundation" as const,
        name: "Blue Hearts Network Foundation",
        description: "Support our general fund for ocean conservation",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  }

  const predefinedAmounts =
    donationTarget?.type === "foundation" ? ["50", "100", "250", "500"] : ["20", "50", "100", "200"]

  const handleAmountChange = (amount: string) => {
    setCustomAmount(false)
    setDonationAmount(amount)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(true)
    setDonationAmount(e.target.value)
  }

  const handleTargetSelection = (target: DonationTarget) => {
    setDonationTarget(target)
    setShowTargetSelector(false)
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 1500)
  }

  const resetForm = () => {
    setIsComplete(false)
    setDonationTarget(null)
    setShowTargetSelector(true)
    setDonationAmount(defaultTarget?.type === "foundation" ? "100" : "50")
    setCustomAmount(false)
    setDonationType("one-time")
    setDonorType("individual")
  }

  // Simplified version for embedding in other components
  if (simplified) {
    return (
      <Card className={`bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100 ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <Heart className="h-5 w-5 mr-2 text-blue-400" />
            Quick Donation
          </CardTitle>
          <CardDescription className="text-blue-300">
            Support ocean conservation with a fast, secure donation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isComplete ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-600/20 text-emerald-300 mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-blue-100 mb-2">Thank You!</h3>
              <p className="text-blue-300 mb-4">
                Your donation of {formatAmount(Number.parseFloat(donationAmount))} has been processed. You'll receive a
                confirmation email shortly.
              </p>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                onClick={resetForm}
              >
                Make Another Donation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleDonationSubmit}>
              <div className="space-y-4">
                <RadioGroup
                  defaultValue={donationType}
                  onValueChange={(value) => setDonationType(value as "one-time" | "monthly")}
                  className="flex"
                >
                  <div className="flex items-center space-x-2 mr-4">
                    <RadioGroupItem value="one-time" id="one-time" className="text-blue-500" />
                    <Label htmlFor="one-time" className="text-blue-200">
                      One-time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" className="text-blue-500" />
                    <Label htmlFor="monthly" className="text-blue-200">
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>

                <div>
                  <Label className="text-blue-200 mb-2 block">Select Amount</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                        className={`${
                          donationAmount === amount && !customAmount
                            ? "bg-blue-600 hover:bg-blue-500"
                            : "border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                        }`}
                        onClick={() => handleAmountChange(amount)}
                      >
                        €{amount}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Label htmlFor="custom-amount" className="whitespace-nowrap text-blue-200">
                      Custom:
                    </Label>
                    <div className="relative w-full">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                      <Input
                        id="custom-amount"
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={customAmount ? donationAmount : ""}
                        onChange={handleCustomAmountChange}
                        className="bg-blue-950/50 border-blue-700 text-white pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Donate {formatAmount(Number.parseFloat(donationAmount))}
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-xs text-blue-400 text-center flex items-center justify-center mt-4">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure donation processed by Stripe
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-blue-900/50 backdrop-blur-sm border-blue-800 text-blue-100 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Heart className="h-5 w-5 mr-2 text-blue-400" />
          Support The BlueHearts Network
        </CardTitle>
        <CardDescription className="text-blue-300">
          Help ocean conservation with a fast, secure donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-6"
            >
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-600/20 text-emerald-300 mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium text-blue-100 mb-2">Thank You!</h3>
              <p className="text-blue-300 mb-4">
                Your {donationType === "monthly" ? "monthly" : "one-time"} donation of{" "}
                {formatAmount(Number.parseFloat(donationAmount))}
                {donationTarget ? ` to ${donationTarget.name}` : ""} has been processed successfully.
              </p>
              <p className="text-blue-300 mb-6">A confirmation receipt has been sent to your email address.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                  onClick={resetForm}
                >
                  Make Another Donation
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-500">View Your Impact</Button>
              </div>
            </motion.div>
          ) : showTargetSelector ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Tabs defaultValue="projects">
                <TabsList className="grid grid-cols-3 mb-4 bg-blue-950/50">
                  <TabsTrigger value="projects" className="flex items-center text-xs sm:text-sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="members" className="flex items-center text-xs sm:text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Members
                  </TabsTrigger>
                  <TabsTrigger value="foundation" className="flex items-center text-xs sm:text-sm">
                    <Building className="h-4 w-4 mr-2" />
                    Foundation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                  <p className="text-sm text-blue-300 mb-4">Select a specific ocean conservation project to support:</p>
                  {donationTargets.projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleTargetSelection(project)}
                      className="flex items-start p-3 rounded-lg bg-blue-800/30 hover:bg-blue-800/50 cursor-pointer transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded bg-blue-700 mr-3 overflow-hidden"
                        style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover" }}
                      />
                      <div>
                        <h4 className="font-medium text-blue-100">{project.name}</h4>
                        <p className="text-sm text-blue-300">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                  <p className="text-sm text-blue-300 mb-4">
                    Support a Blue Hearts member and their conservation work:
                  </p>
                  {donationTargets.members.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleTargetSelection(member)}
                      className="flex items-start p-3 rounded-lg bg-blue-800/30 hover:bg-blue-800/50 cursor-pointer transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-full bg-blue-700 mr-3 overflow-hidden"
                        style={{ backgroundImage: `url(${member.image})`, backgroundSize: "cover" }}
                      />
                      <div>
                        <h4 className="font-medium text-blue-100">{member.name}</h4>
                        <p className="text-sm text-blue-300">{member.description}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="foundation" className="space-y-4">
                  <p className="text-sm text-blue-300 mb-4">
                    Donate to our foundation to support all Blue Hearts initiatives:
                  </p>
                  {donationTargets.foundation.map((foundation) => (
                    <div
                      key={foundation.id}
                      onClick={() => handleTargetSelection(foundation)}
                      className="flex items-start p-3 rounded-lg bg-blue-800/30 hover:bg-blue-800/50 cursor-pointer transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded bg-blue-700 mr-3 overflow-hidden flex items-center justify-center"
                        style={{ backgroundImage: `url(${foundation.image})`, backgroundSize: "cover" }}
                      >
                        {!foundation.image && <Heart className="h-6 w-6 text-blue-300" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-100">{foundation.name}</h4>
                        <p className="text-sm text-blue-300">{foundation.description}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <form onSubmit={handleDonationSubmit} className="space-y-6">
                {donationTarget && (
                  <div className="bg-blue-800/30 p-3 rounded-lg flex items-start">
                    <div
                      className={`w-12 h-12 ${donationTarget.type === "member" ? "rounded-full" : "rounded"} bg-blue-700 mr-3 overflow-hidden flex items-center justify-center`}
                      style={{ backgroundImage: `url(${donationTarget.image})`, backgroundSize: "cover" }}
                    >
                      {!donationTarget.image &&
                        (donationTarget.type === "project" ? (
                          <Globe className="h-6 w-6 text-blue-300" />
                        ) : donationTarget.type === "member" ? (
                          <User className="h-6 w-6 text-blue-300" />
                        ) : (
                          <Building className="h-6 w-6 text-blue-300" />
                        ))}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-blue-100">{donationTarget.name}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-blue-300 hover:text-blue-100"
                          onClick={() => setShowTargetSelector(true)}
                        >
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-blue-300">{donationTarget.description}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label className="text-blue-200 mb-2 block">I am donating as</Label>
                    <RadioGroup
                      defaultValue={donorType}
                      onValueChange={(value) => setDonorType(value as "individual" | "company")}
                      className="flex"
                    >
                      <div className="flex items-center space-x-2 mr-4">
                        <RadioGroupItem value="individual" id="individual" className="text-blue-500" />
                        <Label htmlFor="individual" className="text-blue-200 flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Individual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company" className="text-blue-500" />
                        <Label htmlFor="company" className="text-blue-200 flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          Company
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-blue-200 mb-2 block">Donation Type</Label>
                    <RadioGroup
                      defaultValue={donationType}
                      onValueChange={(value) => setDonationType(value as "one-time" | "monthly")}
                      className="flex"
                    >
                      <div className="flex items-center space-x-2 mr-4">
                        <RadioGroupItem value="one-time" id="one-time-full" className="text-blue-500" />
                        <Label htmlFor="one-time-full" className="text-blue-200">
                          One-time Donation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly-full" className="text-blue-500" />
                        <Label htmlFor="monthly-full" className="text-blue-200">
                          Monthly Sponsorship
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-blue-200 mb-2 block">Select Amount</Label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                          className={`${
                            donationAmount === amount && !customAmount
                              ? "bg-blue-600 hover:bg-blue-500"
                              : "border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                          }`}
                          onClick={() => handleAmountChange(amount)}
                        >
                          €{amount}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="custom-amount-full" className="whitespace-nowrap text-blue-200">
                        Custom:
                      </Label>
                      <div className="relative w-full">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                        <Input
                          id="custom-amount-full"
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={customAmount ? donationAmount : ""}
                          onChange={handleCustomAmountChange}
                          className="bg-blue-950/50 border-blue-700 text-white pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form fields section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-200">
                        {donorType === "individual" ? "Full Name" : "Company Name"}
                      </Label>
                      <Input
                        id="name"
                        placeholder={donorType === "individual" ? "John Doe" : "Company, Inc."}
                        className="bg-blue-950/50 border-blue-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-200">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-blue-950/50 border-blue-700 text-white"
                        required
                      />
                    </div>
                    {donorType === "company" && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company-website" className="text-blue-200">
                          Company Website
                        </Label>
                        <Input
                          id="company-website"
                          placeholder="https://yourcompany.com"
                          className="bg-blue-950/50 border-blue-700 text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment section */}
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between border-t border-blue-800 pt-4">
                      <span className="text-blue-200">
                        {donationType === "monthly" ? "Monthly amount" : "One-time amount"}:
                      </span>
                      <span className="text-xl font-medium text-blue-100">
                        {formatAmount(Number.parseFloat(donationAmount))}
                      </span>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing Donation...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          {donationType === "monthly"
                            ? `Start Monthly Sponsorship of ${formatAmount(Number.parseFloat(donationAmount))}`
                            : `Complete Donation of ${formatAmount(Number.parseFloat(donationAmount))}`}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center text-xs text-blue-400 pt-2">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Your payment is secure and encrypted.</span>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// Helper function to format currency
function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}
