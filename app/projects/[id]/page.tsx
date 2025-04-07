"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WaveBackground from "@/components/wave-background"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, ArrowLeft, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

// Update the Project interface
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
  fullDescription?: string
  authors?: string[]
  relatedProjects?: string[]
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate fetching the project data
    const fetchProject = () => {
      setLoading(true)

      // Mock project data - in a real app, this would come from an API
      // Update the mock projects data in the useEffect hook
      const mockProjects: Record<string, Project> = {
        "sci-001": {
          id: "sci-001",
          title: "AI Microplastics Detection",
          description: "AI-powered sensors in Malta identify and classify microplastics with global scientific value.",
          fullDescription: `The AI Microplastics Detection project deploys advanced sensors in Malta's coastal waters to identify and classify microplastics with unprecedented accuracy. 

    This innovative system combines machine learning algorithms with specialized imaging technology to detect microplastics as small as 10 micrometers. The data collected has global scientific value, contributing to our understanding of microplastic distribution, movement patterns, and environmental impact.

    The project includes:
    - Network of AI-powered sensors deployed at strategic locations
    - Real-time data collection and analysis
    - Machine learning models trained to identify different types of microplastics
    - Open data platform for scientific collaboration
    - Integration with global marine pollution monitoring networks

    This technology represents a significant advancement in our ability to track and understand microplastic pollution, providing valuable data for conservation efforts and policy development.`,
          category: "scientific",
          tags: ["AI", "microplastics", "sensors", "Malta"],
          documentUrl: "https://drive.google.com/file/d/10t9ZIpqResuuJf59eVROFs47LaXTofXi/view?usp=drive_link",
          documentSize: "3.2 MB",
          documentType: "PDF",
          date: "2023-06-15",
          featured: true,
          authors: ["Dr. Maria Chen", "Dr. James Wilson", "Dr. Sophia Rodriguez"],
          relatedProjects: ["sci-002", "tech-001"],
        },
        "res-001": {
          id: "res-001",
          title: "Greece Marine Ecosystem Restoration",
          description: "Diver-led habitat surveys and marine forest restoration with artificial reef deployment.",
          fullDescription: `The Greece Marine Ecosystem Restoration project is a comprehensive initiative to restore degraded marine habitats along the Greek coastline. Led by a team of experienced divers and marine biologists, this project combines detailed habitat surveys with active restoration efforts.

    Key components include:
    - Detailed mapping of degraded marine ecosystems
    - Strategic deployment of artificial reefs to provide habitat structure
    - Restoration of seagrass meadows and marine forests
    - Monitoring of biodiversity recovery and ecosystem health
    - Community engagement and education programs
    - Training local divers as ecosystem stewards

    The project focuses on areas affected by coastal development, pollution, and climate change impacts. By restoring these critical marine habitats, we aim to enhance biodiversity, improve water quality, and increase the resilience of coastal ecosystems to future environmental challenges.`,
          category: "restoration",
          tags: ["Greece", "habitat surveys", "artificial reef", "marine forest"],
          documentUrl: "https://drive.google.com/file/d/17UZC4wFaBK6op2setnrFA19hhqxQQ53R/view?usp=drive_link",
          documentSize: "5.3 MB",
          documentType: "PDF",
          date: "2023-04-18",
          featured: true,
          authors: ["Dr. Elena Martinez", "Nikos Papadopoulos", "Dr. Lisa Wong"],
          relatedProjects: ["res-002", "res-003"],
        },
        "tech-001": {
          id: "tech-001",
          title: "Blue Dataverse ESG Reporting Engine",
          description: "An automated reporting system producing machine-readable ESG/XBRL data from all projects.",
          fullDescription: `The Blue Dataverse ESG Reporting Engine is an innovative automated system designed to streamline and standardize environmental, social, and governance (ESG) reporting for marine conservation projects.

    This powerful tool transforms project data into machine-readable formats, including XBRL (eXtensible Business Reporting Language), making it compatible with global financial and sustainability reporting frameworks.

    Key features include:
    - Automated data collection from multiple project sources
    - Standardized metrics aligned with major ESG frameworks
    - XBRL tagging for regulatory compliance
    - Real-time dashboard for impact visualization
    - Audit trail and data verification
    - API integration with financial and sustainability platforms

    By standardizing and automating ESG reporting, this engine enables marine conservation organizations to demonstrate their impact to investors, donors, and regulatory bodies with greater efficiency and transparency. The system helps bridge the gap between conservation outcomes and financial reporting requirements, facilitating greater investment in blue economy initiatives.`,
          category: "tech",
          tags: ["ESG", "XBRL", "reporting", "automation"],
          documentUrl: "https://drive.google.com/file/d/19K-slBHMnvJB-msn1FiZiurSIQFQhFB9/view?usp=drive_link",
          documentSize: "3.9 MB",
          documentType: "PDF",
          date: "2023-07-12",
          featured: true,
          authors: ["Dr. Michael Lee", "Sarah Johnson", "Dr. David Chen"],
          relatedProjects: ["tech-002", "eng-001"],
        },
        "tech-002": {
          id: "tech-002",
          title: "Blue Dataverse App",
          description:
            "A unified interface for citizen scientists, divers, and marine observers to contribute data globally.",
          fullDescription: `The Blue Dataverse App is a cutting-edge mobile application designed to unite citizen scientists, divers, and marine observers in a global effort to collect and share valuable ocean data.

    This user-friendly platform enables anyone with a smartphone to contribute to marine science and conservation, regardless of their technical background or expertise level.

    Key features include:
    - Simple data collection forms for various marine observations
    - Photo and video upload with automatic species identification
    - GPS tagging and mapping of observations
    - Offline functionality for remote locations
    - Data validation and quality control processes
    - Community features to connect with other ocean advocates
    - Educational resources and identification guides

    The app integrates with the broader Blue Dataverse ecosystem, ensuring that citizen-collected data can be seamlessly incorporated into scientific research, conservation planning, and policy development. By democratizing data collection, we aim to dramatically increase the scope and scale of marine monitoring efforts worldwide.`,
          category: "tech",
          tags: ["citizen science", "data collection", "mobile app"],
          documentUrl: "/documents/blue-dataverse-app.pdf",
          documentSize: "2.7 MB",
          documentType: "PDF",
          date: "2023-08-15",
          comingSoon: true,
          authors: ["Dr. Alex Wong", "Maria Garcia", "Thomas Johnson"],
          relatedProjects: ["tech-001", "eng-001"],
        },
        "eng-001": {
          id: "eng-001",
          title: "RV Belgica – Climate Fundraising Showcase",
          description: "A flagship event to present projects and raise support aboard Belgium's research vessel.",
          fullDescription: `The RV Belgica Climate Fundraising Showcase is a prestigious event hosted aboard Belgium's state-of-the-art research vessel. This unique gathering brings together marine scientists, conservation practitioners, policy makers, and potential funders in an immersive environment that highlights the critical importance of ocean research and conservation.

    The event features:
    - Live demonstrations of marine research techniques
    - Interactive exhibits of Blue Hearts Network projects
    - Presentations by leading marine scientists and conservationists
    - Networking opportunities with potential funders and partners
    - Tours of the research vessel's advanced scientific facilities
    - Discussions on innovative financing mechanisms for ocean conservation

    By hosting this showcase on an actual research vessel, participants gain firsthand experience of marine research in action, creating powerful connections between science, conservation needs, and funding opportunities. The event aims to catalyze new partnerships and secure financial support for the most promising marine conservation initiatives in the Blue Hearts Network.`,
          category: "engagement",
          tags: ["event", "fundraising", "Belgium", "research vessel"],
          documentUrl: "https://drive.google.com/file/d/1Dobg9lSRGrFfoT9Si2TOtkUbVFlIKSp3/view?usp=drive_link",
          documentSize: "6.2 MB",
          documentType: "PDF",
          date: "2023-09-01",
          featured: true,
          authors: ["Dr. Jean Dupont", "Emma Janssen", "Dr. Marc Peeters"],
          relatedProjects: ["eng-002", "tech-001"],
        },
      }

      // Find the project by ID
      const foundProject = mockProjects[id]

      if (foundProject) {
        setProject(foundProject)
      } else {
        // Redirect to projects page if project not found
        router.push("/projects")
      }

      setLoading(false)
    }

    fetchProject()
  }, [id, router])

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "scientific":
        return "bg-purple-600/20 text-purple-300 border-purple-600/50"
      case "restoration":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-600/50"
      case "tech":
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
      case "engagement":
        return "bg-amber-600/20 text-amber-300 border-amber-600/50"
      default:
        return "bg-blue-600/20 text-blue-300 border-blue-600/50"
    }
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "scientific":
        return "Scientific & Monitoring"
      case "restoration":
        return "Restoration & Biodiversity"
      case "tech":
        return "Tech & Tooling"
      case "engagement":
        return "Engagement & Fundraising"
      default:
        return "Project"
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-blue-950 flex items-center justify-center">
        <WaveBackground />
        <div className="relative z-10 text-blue-100">Loading project details...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-blue-950 flex items-center justify-center">
        <WaveBackground />
        <div className="relative z-10 text-blue-100">Project not found</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/50 mb-6" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-800 mb-8">
            <div className="mb-4">
              <Badge className={getCategoryColor(project.category)}>{getCategoryLabel(project.category)}</Badge>
              {project.featured && (
                <Badge className="ml-2 bg-blue-600/30 text-blue-300 border-blue-600/50">Featured</Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-blue-100 mb-4">{project.title}</h1>

            <div className="flex items-center text-sm text-blue-400 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Published: {formatDate(project.date)}</span>
            </div>

            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-blue-200 whitespace-pre-line">{project.fullDescription}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} className="bg-blue-800/50 text-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>

            {project.authors && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-2">Authors:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.authors.map((author) => (
                    <Badge key={author} className="bg-blue-700/30 text-blue-200">
                      {author}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Update the document download section to handle "Coming Soon" status */}
          <div className="bg-blue-800/40 rounded-lg p-6 border border-blue-700/50 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <div className="text-sm font-medium text-blue-200">{project.documentType}</div>
                  <div className="text-xs text-blue-400">{project.documentSize}</div>
                </div>
              </div>

              {project.comingSoon ? (
                <Button variant="outline" className="border-blue-700 text-blue-400/50 cursor-not-allowed" disabled>
                  <Clock className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                  <Link href={project.documentUrl} target="_blank" download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Document
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-sm text-blue-300">
              {project.comingSoon ? (
                <p>
                  This document is currently in development and will be available for download soon. Check back later!
                </p>
              ) : (
                <p>This document is available for download in PDF format. Click the button above to download.</p>
              )}
            </div>
          </div>

          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-800">
              <h2 className="text-xl font-bold text-blue-100 mb-4">Related Projects</h2>
              <div className="space-y-4">
                {project.relatedProjects.map((relatedId) => (
                  <div key={relatedId} className="bg-blue-800/30 rounded-lg p-4 hover:bg-blue-800/50 transition-colors">
                    <Link href={`/projects/${relatedId}`} className="flex items-center justify-between">
                      <span className="text-blue-200 font-medium">
                        {relatedId.startsWith("sci") && "Scientific & Monitoring Project"}
                        {relatedId.startsWith("res") && "Restoration & Biodiversity Project"}
                        {relatedId.startsWith("tech") && "Tech & Tooling Project"}
                        {relatedId.startsWith("eng") && "Engagement & Fundraising Project"}
                      </span>
                      <ExternalLink className="h-4 w-4 text-blue-400" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

