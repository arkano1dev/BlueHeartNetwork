import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Heart } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  location: string
  image: string
  progress: number
  goal: number
  raised: number
  supporters: number
  tags: string[]
}

interface RegionalProjectsProps {
  region: string
}

export default function RegionalProjects({ region }: RegionalProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data based on region
    const fetchData = () => {
      setLoading(true)

      // Mock data - in a real app, this would be filtered by region from an API
      const mockProjects: Record<string, Project[]> = {
        "north-america": [
          {
            id: 1,
            title: "Florida Keys Coral Restoration",
            description: "Rebuilding coral reefs damaged by climate change and human activity in the Florida Keys.",
            location: "Florida Keys, USA",
            image: "/placeholder.svg?height=200&width=400",
            progress: 65,
            goal: 50000,
            raised: 32500,
            supporters: 412,
            tags: ["Coral", "Restoration", "Marine Life"],
          },
          {
            id: 2,
            title: "Pacific Northwest Kelp Forest Recovery",
            description: "Restoring vital kelp forests along the coast of Washington and Oregon.",
            location: "Washington, USA",
            image: "/placeholder.svg?height=200&width=400",
            progress: 40,
            goal: 35000,
            raised: 14000,
            supporters: 203,
            tags: ["Kelp", "Ecosystem", "Biodiversity"],
          },
        ],
        europe: [
          {
            id: 3,
            title: "Mediterranean Seagrass Protection",
            description: "Protecting and expanding Posidonia oceanica meadows in the Mediterranean Sea.",
            location: "Mediterranean Sea",
            image: "/placeholder.svg?height=200&width=400",
            progress: 75,
            goal: 45000,
            raised: 33750,
            supporters: 389,
            tags: ["Seagrass", "Carbon Capture", "Habitat"],
          },
          {
            id: 4,
            title: "Baltic Sea Plastic Cleanup",
            description: "Removing plastic pollution from the Baltic Sea and its coastlines.",
            location: "Baltic Sea",
            image: "/placeholder.svg?height=200&width=400",
            progress: 30,
            goal: 25000,
            raised: 7500,
            supporters: 142,
            tags: ["Plastic", "Pollution", "Cleanup"],
          },
        ],
        asia: [
          {
            id: 5,
            title: "Coral Triangle Conservation",
            description: "Protecting the world's epicenter of marine biodiversity in Southeast Asia.",
            location: "Indonesia",
            image: "/placeholder.svg?height=200&width=400",
            progress: 85,
            goal: 60000,
            raised: 51000,
            supporters: 623,
            tags: ["Biodiversity", "Conservation", "Coral"],
          },
          {
            id: 6,
            title: "Mangrove Reforestation in Thailand",
            description: "Restoring mangrove forests along Thailand's coastline for climate resilience.",
            location: "Thailand",
            image: "/placeholder.svg?height=200&width=400",
            progress: 50,
            goal: 30000,
            raised: 15000,
            supporters: 278,
            tags: ["Mangroves", "Reforestation", "Climate"],
          },
        ],
        oceania: [
          {
            id: 7,
            title: "Great Barrier Reef Resilience",
            description: "Building resilience in the Great Barrier Reef against climate change impacts.",
            location: "Queensland, Australia",
            image: "/placeholder.svg?height=200&width=400",
            progress: 70,
            goal: 75000,
            raised: 52500,
            supporters: 734,
            tags: ["Coral", "Climate", "Ecosystem"],
          },
          {
            id: 8,
            title: "South Pacific Island Waste Management",
            description: "Implementing sustainable waste management systems on remote Pacific islands.",
            location: "Fiji",
            image: "/placeholder.svg?height=200&width=400",
            progress: 45,
            goal: 40000,
            raised: 18000,
            supporters: 312,
            tags: ["Waste", "Sustainability", "Islands"],
          },
        ],
        africa: [
          {
            id: 9,
            title: "East African Marine Protected Areas",
            description: "Expanding and strengthening marine protected areas along the East African coast.",
            location: "Kenya & Tanzania",
            image: "/placeholder.svg?height=200&width=400",
            progress: 60,
            goal: 55000,
            raised: 33000,
            supporters: 405,
            tags: ["Conservation", "Protected Areas", "Biodiversity"],
          },
          {
            id: 10,
            title: "West African Fisheries Management",
            description: "Supporting sustainable fisheries practices in West African coastal communities.",
            location: "Senegal",
            image: "/placeholder.svg?height=200&width=400",
            progress: 35,
            goal: 45000,
            raised: 15750,
            supporters: 231,
            tags: ["Fisheries", "Sustainability", "Communities"],
          },
        ],
        "south-america": [
          {
            id: 11,
            title: "Amazon River Delta Protection",
            description: "Conserving the unique ecosystem where the Amazon River meets the Atlantic Ocean.",
            location: "Brazil",
            image: "/placeholder.svg?height=200&width=400",
            progress: 55,
            goal: 50000,
            raised: 27500,
            supporters: 342,
            tags: ["Estuary", "Biodiversity", "Conservation"],
          },
          {
            id: 12,
            title: "Galapagos Marine Reserve Expansion",
            description: "Supporting the expansion of the Galapagos Marine Reserve to protect unique species.",
            location: "Ecuador",
            image: "/placeholder.svg?height=200&width=400",
            progress: 80,
            goal: 65000,
            raised: 52000,
            supporters: 687,
            tags: ["Marine Reserve", "Biodiversity", "Protection"],
          },
        ],
        antarctica: [
          {
            id: 13,
            title: "Southern Ocean Research Initiative",
            description: "Studying the impacts of climate change on Antarctic marine ecosystems.",
            location: "Southern Ocean",
            image: "/placeholder.svg?height=200&width=400",
            progress: 65,
            goal: 70000,
            raised: 45500,
            supporters: 521,
            tags: ["Research", "Climate", "Antarctic"],
          },
          {
            id: 14,
            title: "Antarctic Krill Conservation",
            description: "Protecting krill populations that support the entire Antarctic food web.",
            location: "Antarctic Peninsula",
            image: "/placeholder.svg?height=200&width=400",
            progress: 40,
            goal: 55000,
            raised: 22000,
            supporters: 298,
            tags: ["Krill", "Food Web", "Conservation"],
          },
        ],
      }

      // Default to showing all projects if region not found
      const regionProjects = mockProjects[region] || Object.values(mockProjects).flat().slice(0, 2)

      setProjects(regionProjects)
      setLoading(false)
    }

    fetchData()
  }, [region])

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-pulse space-y-6 w-full">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="bg-blue-800/50 h-40 rounded-lg"></div>
              <div className="bg-blue-800/50 h-6 w-3/4 rounded"></div>
              <div className="bg-blue-800/50 h-4 rounded"></div>
              <div className="bg-blue-800/50 h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="space-y-4">
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <div className="flex items-center text-xs text-blue-200">{project.location}</div>
            </div>
          </div>

          <p className="text-sm text-blue-200">{project.description}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-300">€{project.raised.toLocaleString()} raised</span>
              <span className="text-blue-300">
                {project.progress}% of €{project.goal.toLocaleString()}
              </span>
            </div>
            <Progress value={project.progress} className="h-2 bg-blue-950" />
            <div className="flex items-center text-xs text-blue-400">
              <Heart className="h-3 w-3 mr-1" />
              {project.supporters} supporters
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <Badge key={tag} className="bg-blue-800/50 text-blue-200 hover:bg-blue-800">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-500">Support Project</Button>
            <Button
              variant="outline"
              size="icon"
              className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

