"use client"

import { useState } from "react"
import WaveBackground from "@/components/wave-background"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, FileText, Filter, Search } from "lucide-react"
import ProjectCard from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Mock projects data
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
    {
      id: "sci-002",
      title: "SEAQ DAO – Autonomous Water Monitoring",
      description: "A trustless IoT system using Nostr and Bitcoin to measure and broadcast seawater quality data.",
      category: "scientific",
      tags: ["IoT", "Nostr", "Bitcoin", "water quality"],
      documentUrl: "https://drive.google.com/file/d/15sIIp6QOXD7Agjh6iB5YU9w9iOaawooa/view?usp=drive_link",
      documentSize: "2.8 MB",
      documentType: "PDF",
      date: "2023-05-22",
    },
    {
      id: "sci-003",
      title: "Seaweed Carbon Sequestration Study",
      description: "A study of seaweed species' carbon absorption with lab validation and traceable supply chain.",
      category: "scientific",
      tags: ["seaweed", "carbon sequestration", "supply chain"],
      documentUrl: "https://drive.google.com/file/d/1W78lOJMjLZzoUUST74RG7sjQpINeP4l9/view?usp=sharing",
      documentSize: "4.1 MB",
      documentType: "PDF",
      date: "2023-07-10",
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
    {
      id: "res-002",
      title: "Global Marine Restoration Model",
      description: "Scalable blueprint for underwater mapping, restoration, and conservation impact measurement.",
      category: "restoration",
      tags: ["underwater mapping", "restoration", "conservation", "impact measurement"],
      documentUrl: "https://drive.google.com/file/d/1sjvzr8QlQ47LIiJHm0kor3gb2JA6nrpZ/view?usp=drive_link",
      documentSize: "3.7 MB",
      documentType: "PDF",
      date: "2023-03-25",
    },
    {
      id: "res-003",
      title: "Lionfish Bounty Hunt – &quot;Wanted: Dead or Alive&quot;",
      description: "Gamified marine protection program offering rewards for capturing invasive lionfish.",
      category: "restoration",
      tags: ["lionfish", "invasive species", "gamification", "bounty"],
      documentUrl: "https://drive.google.com/file/d/1I97s7olSojlaiCXYNbYoLZsprwUEU9Wg/view?usp=drive_link",
      documentSize: "2.5 MB",
      documentType: "PDF",
      date: "2023-06-30",
    },
    {
      id: "res-004",
      title: "Autonomous Invasive Species Drone R&D",
      description: "Development of underwater drones that detect and hunt invasive species using AI.",
      category: "restoration",
      tags: ["drones", "invasive species", "AI", "underwater"],
      documentUrl: "/documents/invasive-species-drone.pdf",
      documentSize: "4.2 MB",
      documentType: "PDF",
      date: "2023-08-05",
      comingSoon: true,
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
    {
      id: "tech-002",
      title: "Blue Dataverse App",
      description:
        "A unified interface for citizen scientists, divers, and marine observers to contribute data globally.",
      category: "tech",
      tags: ["citizen science", "data collection", "mobile app"],
      documentUrl: "/documents/blue-dataverse-app.pdf",
      documentSize: "2.7 MB",
      documentType: "PDF",
      date: "2023-08-15",
      comingSoon: true,
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

  // Filter projects based on active category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured)

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "scientific":
        return "🔬 Scientific & Monitoring"
      case "restoration":
        return "🌱 Restoration & Biodiversity"
      case "tech":
        return "⚙️ Tech & Tooling"
      case "engagement":
        return "🛳️ Engagement & Fundraising"
      default:
        return "All Projects"
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">Blue Impact Projects</h1>
            <p className="text-lg text-blue-300 max-w-3xl mx-auto">
              Access our collection of ocean conservation projects, methodologies, and resources
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  type="text"
                  placeholder="Search projects, topics, or tags..."
                  className="pl-10 bg-blue-900/50 border-blue-700 text-blue-100 placeholder:text-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-800 mb-4">
                <h3 className="text-sm font-medium text-blue-200 mb-2">Filter by tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(projects.flatMap((p) => p.tags))).map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-blue-800/50 text-blue-200 hover:bg-blue-700 cursor-pointer"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Featured Projects */}
          {activeCategory === "all" && searchQuery === "" && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-blue-100 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-blue-400" />
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            </div>
          )}

          {/* Project Categories */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 bg-blue-950/50">
              <TabsTrigger value="all" className="text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="scientific" className="text-sm">
                🔬 Scientific
              </TabsTrigger>
              <TabsTrigger value="restoration" className="text-sm">
                🌱 Restoration
              </TabsTrigger>
              <TabsTrigger value="tech" className="text-sm">
                ⚙️ Tech
              </TabsTrigger>
              <TabsTrigger value="engagement" className="text-sm">
                🛳️ Engagement
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-6">
              <h2 className="text-xl font-bold text-blue-100 mb-4">{getCategoryLabel(activeCategory)}</h2>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="bg-blue-900/30 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-blue-100 mb-2">No projects found</h3>
                  <p className="text-blue-300 mb-4">We couldn't find any projects matching your search criteria.</p>
                  <Button
                    variant="outline"
                    className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

