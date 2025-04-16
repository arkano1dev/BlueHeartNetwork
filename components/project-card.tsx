import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText, Clock } from "lucide-react"
import Link from "next/link"

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

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "scientific":
        return "🔬"
      case "restoration":
        return "🌱"
      case "tech":
        return "⚙️"
      case "engagement":
        return "🛳️"
      default:
        return ""
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

  return (
    <div
      className={`
      rounded-lg p-6 h-full flex flex-col
      ${
        featured
          ? "bg-blue-800/40 border border-blue-700/70"
          : "bg-blue-900/50 backdrop-blur-sm border border-blue-800/50"
      }
      hover:border-blue-700 transition-colors
    `}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge className={getCategoryColor(project.category)}>
          {getCategoryIcon(project.category)} {getCategoryLabel(project.category)}
        </Badge>
        {featured && <Badge className="bg-blue-600/30 text-blue-300 border-blue-600/50">Featured</Badge>}
        {project.comingSoon && (
          <Badge className="bg-amber-600/30 text-amber-300 border-amber-600/50">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        )}
      </div>

      <h3 className="text-xl font-bold text-blue-100 mb-2">{project.title}</h3>

      <p className="text-blue-300 mb-4 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Badge key={tag} className="bg-blue-800/50 text-blue-200">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center text-sm text-blue-400 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Published: {formatDate(project.date)}</span>
      </div>

      <div className="flex items-center justify-between bg-blue-800/30 rounded-lg p-3 mt-auto">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-blue-400 mr-2" />
          <div>
            <div className="text-sm font-medium text-blue-200">{project.documentType}</div>
            <div className="text-xs text-blue-400">{project.documentSize}</div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={`
            border-blue-700 
            ${
              project.comingSoon
                ? "text-blue-400/50 hover:bg-transparent hover:text-blue-400/50 cursor-not-allowed"
                : "text-blue-300 hover:bg-blue-800 hover:text-blue-100"
            }
          `}
          asChild={!project.comingSoon}
          disabled={project.comingSoon}
        >
          {project.comingSoon ? (
            <span>
              <Clock className="h-4 w-4 mr-1" />
              Coming Soon
            </span>
          ) : (
            <Link href={project.documentUrl} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-1" />
              View Document
            </Link>
          )}
        </Button>
      </div>
    </div>
  )
}
