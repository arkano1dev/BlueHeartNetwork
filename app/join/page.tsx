"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ChevronRight, CheckCircle2 } from "lucide-react"
import WaveBackground from "@/components/wave-background"
import Link from "next/link"

export default function JoinPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    region: "",
    membershipType: "individual", // standard (€10) or premium (€100)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, region: value }))
  }

  const handleMembershipChange = (value: string) => {
    setFormData((prev) => ({ ...prev, membershipType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password) {
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validate second step
      if (!formData.region) {
        return
      }
      setStep(3)
    } else if (step === 3) {
      // Final submission
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        // Store user data in localStorage (in a real app, this would be handled by a backend)
        localStorage.setItem(
          "blueHeartsUser",
          JSON.stringify({
            ...formData,
            isLoggedIn: true,
            joinDate: new Date().toISOString(),
          }),
        )

        // Redirect to dashboard or confirmation page
        router.push("/dashboard")
      }, 1500)
    }
  }

  const regions = [
    { value: "north-america", label: "North America" },
    { value: "south-america", label: "South America" },
    { value: "europe", label: "Europe" },
    { value: "africa", label: "Africa" },
    { value: "asia", label: "Asia" },
    { value: "oceania", label: "Oceania" },
    { value: "antarctica", label: "Antarctica" },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950 flex flex-col">
      <WaveBackground />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10">
        <Card className="w-full max-w-md bg-blue-900/50 backdrop-blur-sm border-blue-700 text-blue-50">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-blue-300 text-sm">Protecting the blue ocean</span>
            </div>
            <CardTitle className="text-2xl text-center">Join The BlueHearts Network</CardTitle>
            <CardDescription className="text-blue-300 text-center">
              {step === 1 && "Create your account to join The BlueHearts Network community"}
              {step === 2 && "Tell us where you're located to connect with regional efforts"}
              {step === 3 && "Choose your membership level and complete your registration"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-blue-950/50 border-blue-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-blue-950/50 border-blue-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-blue-950/50 border-blue-700 text-white"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="region">Your Region</Label>
                    <Select onValueChange={handleRegionChange} value={formData.region}>
                      <SelectTrigger className="bg-blue-950/50 border-blue-700 text-white">
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-900 border-blue-700 text-white">
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg bg-blue-800/50 p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-blue-400" />
                      Why we ask for your region
                    </h4>
                    <p className="text-sm text-blue-300">
                      Your region helps us connect you with local conservation efforts and show you relevant content
                      about ocean initiatives in your area.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-center mb-4">Choose Your Membership</h3>

                  <Tabs
                    defaultValue="individual"
                    value={formData.membershipType}
                    onValueChange={handleMembershipChange}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 w-full bg-blue-950/50">
                      <TabsTrigger value="individual" className="data-[state=active]:bg-blue-600">
                        Individual
                      </TabsTrigger>
                      <TabsTrigger value="project" className="data-[state=active]:bg-emerald-600">
                        Project
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="individual" className="mt-4">
                      <Card className="border-blue-700 bg-blue-800/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">Individual Membership</CardTitle>
                          <div className="text-2xl font-bold">
                            €10<span className="text-sm font-normal text-blue-300">/year</span>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm text-blue-200">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-blue-400 mt-0.5" />
                              Digital Blue Heart badge
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-blue-400 mt-0.5" />
                              Access to community updates
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-blue-400 mt-0.5" />
                              Regional conservation news
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="project" className="mt-4">
                      <Card className="border-emerald-600 bg-blue-800/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">Project Membership</CardTitle>
                          <div className="text-2xl font-bold">
                            €100<span className="text-sm font-normal text-blue-300">/year</span>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm text-blue-200">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400 mt-0.5" />
                              Emerald Heart project badge
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400 mt-0.5" />
                              Featured map placement
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400 mt-0.5" />
                              Connect with supporters
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400 mt-0.5" />
                              Featured project updates
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              <div className="mt-6">
                <Button
                  type="submit"
                  className={`w-full ${step === 3 ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-700 hover:bg-blue-600"}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
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
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {step === 1 && "Continue"}
                      {step === 2 && "Next: Choose Membership"}
                      {step === 3 && "Complete Registration"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-blue-800 pt-4">
            <p className="text-sm text-blue-300">
              Already a member?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
