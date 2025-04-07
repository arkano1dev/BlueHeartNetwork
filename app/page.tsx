"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import {
  Heart,
  HelpingHand,
  Users,
  Mail,
  Globe,
  MapPin,
  Award,
  BookOpen,
  FileText,
  ArrowRight,
  Anchor,
  Calendar,
  BarChartIcon as ChartBarIcon,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

// Import components that don't use browser APIs directly
import LoadingAnimation from "@/components/loading-animation"
import ProjectCard from "@/components/project-card"

// Dynamically import components that use browser APIs
const WaveBackground = dynamic(() => import("@/components/wave-background"), {
  ssr: false,
  loading: () => null,
})
const AnimatedHero = dynamic(() => import("@/components/animated-hero"), {
  ssr: false,
  loading: () => null,
})
const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-blue-900/30 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-blue-300">Loading map visualization...</div>
    </div>
  ),
})
const AchievementBadges = dynamic(() => import("@/components/achievement-badges"), {
  ssr: false,
  loading: () => <div className="w-full h-40 bg-blue-900/30 animate-pulse rounded-lg"></div>,
})
const BlogSection = dynamic(() => import("@/components/blog-section"), {
  ssr: false,
  loading: () => <div className="w-full h-60 bg-blue-900/30 animate-pulse rounded-lg"></div>,
})
const NewsletterForm = dynamic(() => import("@/components/newsletter-form"), {
  ssr: false,
  loading: () => <div className="w-full h-20 bg-blue-900/30 animate-pulse rounded-lg"></div>,
})

interface UserData {
  name: string
  email: string
  region: string
  membershipType: string
  joinDate: string
  isLoggedIn: boolean
}

// Project type definition
interface Project {
  id: string
  title: string
  description: string
  category: "scientific" | "restoration" | "tech" | "engagement"
  tags: string[]
  documentUrl: string
  documentSize: string
  documentType: string
  date: string
  featured?: boolean
  comingSoon?: boolean
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if user is logged in with proper error handling
    try {
      const userData = localStorage.getItem("blueHeartsUser")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      // Continue without user data if localStorage is not available
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Prevent hydration errors by not rendering until client-side
  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return <LoadingAnimation />
  }

  // Mock projects data - same as in projects page
  const projects: Project[] = [
    // Scientific & Monitoring
    {
      id: "sci-001",
      title: "AI Microplastics Detection",
      description: "AI-powered sensors in Malta identify and classify microplastics with global scientific value.",
      category: "scientific",
      tags: ["AI", "microplastics", "sensors", "Malta"],
      documentUrl: "https://drive.google.com/file/d/10t9ZIpqResuuJf59eVROFs47LaXTofXi/view?usp=drive_link",
      documentSize: "3.2 MB",
      documentType: "PDF",
      date: "2023-06-15",
      featured: true,
    },
    // Restoration & Biodiversity
    {
      id: "res-001",
      title: "Greece Marine Ecosystem Restoration",
      description: "Diver-led habitat surveys and marine forest restoration with artificial reef deployment.",
      category: "restoration",
      tags: ["Greece", "habitat surveys", "artificial reef", "marine forest"],
      documentUrl: "https://drive.google.com/file/d/17UZC4wFaBK6op2setnrFA19hhqxQQ53R/view?usp=drive_link",
      documentSize: "5.3 MB",
      documentType: "PDF",
      date: "2023-04-18",
      featured: true,
    },
    // Tech & Tooling
    {
      id: "tech-001",
      title: "Blue Dataverse ESG Reporting Engine",
      description: "An automated reporting system producing machine-readable ESG/XBRL data from all projects.",
      category: "tech",
      tags: ["ESG", "XBRL", "reporting", "automation"],
      documentUrl: "https://drive.google.com/file/d/19K-slBHMnvJB-msn1FiZiurSIQFQhFB9/view?usp=drive_link",
      documentSize: "3.9 MB",
      documentType: "PDF",
      date: "2023-07-12",
      featured: true,
    },
    // Engagement & Fundraising
    {
      id: "eng-001",
      title: "RV Belgica – Climate Fundraising Showcase",
      description: "A flagship event to present projects and raise support aboard Belgium's research vessel.",
      category: "engagement",
      tags: ["event", "fundraising", "Belgium", "research vessel"],
      documentUrl: "https://drive.google.com/file/d/1Dobg9lSRGrFfoT9Si2TOtkUbVFlIKSp3/view?usp=drive_link",
      documentSize: "6.2 MB",
      documentType: "PDF",
      date: "2023-09-01",
      featured: true,
    },
  ]

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      {/* Hero Section with Animated Elements */}
      <section className="w-full min-h-[90vh] relative overflow-hidden z-10">
        {/* Main hero background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('/images/hero-diver.png')",
              transform: "translateY(20px) scale(1.1)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-8 md:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Main content */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
                <span className="block text-blue-100">Restore the Ocean.</span>
                <span className="block text-emerald-400 mt-2">Regenerate Life.</span>
              </h1>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg sm:text-xl text-blue-200 mb-8">
                  Through decentralized technology, BlueHearts Network empowers global communities to protect and
                  regenerate our ocean ecosystems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center gap-2 transition-all justify-center"
                    asChild
                  >
                    <Link href="/projects">
                      Dive Deeper
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button
                    className="px-6 py-3 bg-transparent hover:bg-blue-800/30 text-blue-100 border border-blue-400/50 rounded-full flex items-center gap-2 transition-all justify-center"
                    asChild
                  >
                    <Link href="/about">
                      About the Network
                      <Anchor size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Impact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: "url('/images/undersea.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-4xl font-bold text-emerald-400 mb-2">100+</p>
                  <p className="text-xl text-blue-100">Ocean Projects</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: "url('/images/ocean-aerial.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-4xl font-bold text-emerald-400 mb-2">30+</p>
                  <p className="text-xl text-blue-100">Countries Connected</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: "url('/images/hero-diver.png')",
                    backgroundPosition: "center 30%",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-4xl font-bold text-emerald-400 mb-2">€1M+</p>
                  <p className="text-xl text-blue-100">Impact Funding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Visualization Map */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">
            <MapPin className="h-8 w-8 inline-block mr-2 text-blue-400" />
            BlueHearts all over the world
          </h2>
          <p className="text-center text-blue-300 mb-8 max-w-3xl mx-auto">
            Discover people and projects in the blue space. Click on the markers to get in touch or learn more.
          </p>
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl border border-blue-800/50">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Your Impact Journey Section */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10 bg-gradient-to-b from-blue-900/30 to-blue-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">
              <Award className="h-8 w-8 inline-block mr-2 text-blue-400" />
              Your Impact Journey
            </h2>
            <p className="text-center text-blue-300 mb-8 max-w-3xl mx-auto">
              Track your contributions and earn badges as you help protect our oceans
            </p>
          </div>

          {user ? (
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 shadow-lg">
              <AchievementBadges userId={user.email} />

              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="bg-blue-800/40 rounded-lg p-5 text-center w-full md:w-1/3">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-700/50 mb-4">
                    <Heart className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 mb-2">Your Donations</h3>
                  <p className="text-4xl font-bold text-blue-100 mb-1">
                    €{user.membershipType === "premium" ? "100" : "10"}
                  </p>
                  <p className="text-sm text-blue-300">Membership contribution</p>
                </div>

                <div className="bg-blue-800/40 rounded-lg p-5 text-center w-full md:w-1/3">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-700/50 mb-4">
                    <Calendar className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 mb-2">Member Since</h3>
                  <p className="text-blue-100 mb-1">
                    {new Date(user.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-blue-300">Active Blue Hearts member</p>
                </div>

                <div className="bg-blue-800/40 rounded-lg p-5 text-center w-full md:w-1/3">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-700/50 mb-4">
                    <Globe className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 mb-2">Your Region</h3>
                  <p className="text-blue-100 mb-1">
                    {user.region
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </p>
                  <p className="text-sm text-blue-300">Local impact area</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                  <Link href="/dashboard">
                    <ChartBarIcon className="mr-2 h-4 w-4" />
                    View Your Full Impact Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-8 border border-blue-800/50 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-800/50 mb-6">
                <Award className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-100 mb-4">Join to Track Your Impact</h3>
              <p className="text-blue-300 mb-6 max-w-2xl mx-auto">
                Create an account to track your contributions, earn achievement badges, and see the real impact you're
                making on ocean conservation efforts worldwide.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                <Link href="/join">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join The BlueHearts Network
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section - NEW */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">
            <Heart className="h-8 w-8 inline-block mr-2 text-blue-400" />
            Featured Projects
          </h2>
          <p className="text-center text-blue-300 mb-8 max-w-3xl mx-auto">
            Explore our collection of ocean conservation projects making a real impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className="bg-blue-600 hover:bg-blue-500 py-2 px-6 rounded-full text-md font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-600/20"
              asChild
            >
              <Link href="/projects">
                <FileText className="mr-2 h-4 w-4" />
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10 bg-blue-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">
            <BookOpen className="h-8 w-8 inline-block mr-2 text-blue-400" />
            Network Insights
          </h2>
          <p className="text-center text-blue-300 mb-8 max-w-3xl mx-auto">
            Stay informed with the latest news, research, and updates from projects and activities within the BlueHeart
            Network
          </p>
          <BlogSection />
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10 bg-blue-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">Become a Member</h2>
          <p className="text-center text-blue-300 mb-12 max-w-3xl mx-auto">
            Join our global network and help protect the world's oceans with your membership
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Membership */}
            <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50 flex flex-col h-full transition-transform duration-300 hover:scale-105">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-blue-100">Individual Membership</h3>
                <div className="text-3xl font-bold text-blue-100 mb-2">
                  €10<span className="text-lg font-normal text-blue-300">/year</span>
                </div>
                <p className="text-blue-300 mb-6">For ocean advocates who want to support conservation efforts</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Heart className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Digital Blue Heart badge for your profile</span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Access to regional conservation updates</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Join the global community of ocean advocates</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Monthly newsletter with conservation news</span>
                </li>
              </ul>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-600/20"
                asChild
              >
                <Link href="/join?tier=individual">
                  <Heart className="mr-2 h-4 w-4" />
                  Join as Individual
                </Link>
              </Button>
            </div>

            {/* Project Membership */}
            <div className="bg-blue-700/30 backdrop-blur-sm rounded-xl p-6 border border-blue-600/50 flex flex-col h-full transition-transform duration-300 hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-emerald-500 text-blue-950 text-xs font-bold px-4 py-1 transform rotate-45 translate-x-[30%] translate-y-[-10%] shadow-md">
                  PROJECTS
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-blue-100">Project Membership</h3>
                <div className="text-3xl font-bold text-blue-100 mb-2">
                  €100<span className="text-lg font-normal text-blue-300">/year</span>
                </div>
                <p className="text-blue-300 mb-6">
                  For conservation projects that want to maximize their impact and visibility
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Heart className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Emerald Heart badge for your project profile</span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Featured placement on the interactive map</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Connect with individual supporters and donors</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Project updates featured in the network newsletter</span>
                </li>
                <li className="flex items-start">
                  <HelpingHand className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">Access to volunteer and funding opportunities</span>
                </li>
              </ul>

              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-blue-950 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-emerald-500/20"
                asChild
              >
                <Link href="/join?tier=project">
                  <Heart className="mr-2 h-4 w-4" />
                  Register Your Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 z-10 bg-blue-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-100">Stay Connected</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join our newsletter to receive updates on our projects, events, and ways you can get involved.
          </p>
          <NewsletterForm />
          <div className="mt-12 flex justify-center items-center">
            <Mail className="w-6 h-6 text-blue-300 mr-2" />
            <a href="mailto:contact@bluehearts.network" className="text-blue-200 hover:text-blue-100 transition-colors">
              contact@bluehearts.network
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

