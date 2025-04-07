import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, ExternalLink, X, DollarSign, Clock, MapPin, Calendar } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  location: string
  region: string
  coordinates: { x: number; y: number }
  image: string
  progress: number
  goal: number
  raised: number
  supporters: number
  startDate: string
  endDate: string
  tags: string[]
  type?: "project" | "individual"
}

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const width = mapRef.current.offsetWidth
        // Adjust height based on screen size
        const height =
          window.innerWidth < 640
            ? Math.max(250, width * 0.6) // Taller aspect ratio on mobile
            : Math.max(300, Math.min(window.innerHeight * 0.6, width * 0.5))
        setDimensions({
          width,
          height,
        })
      }
    }

    // Initial update
    updateDimensions()

    // Add resize listener
    window.addEventListener("resize", updateDimensions)

    // Force another update after a short delay to handle any layout shifts
    const timer = setTimeout(updateDimensions, 500)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  // Load projects data
  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockProjects: Project[] = [
      {
        id: "p1",
        title: "Coral Reforestation in Thailand",
        description:
          "Restoring damaged coral reefs along Thailand's coastline to improve marine biodiversity and protect coastal communities.",
        location: "Koh Tao, Thailand",
        region: "asia",
        coordinates: { x: 0.75, y: 0.45 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 67,
        goal: 50000,
        raised: 33500,
        supporters: 412,
        startDate: "2023-01-15",
        endDate: "2023-12-31",
        tags: ["Coral", "Restoration", "Biodiversity"],
        type: "project",
      },
      {
        id: "p2",
        title: "Mediterranean Seagrass Protection",
        description:
          "Protecting and expanding vital Posidonia oceanica meadows in the Mediterranean Sea to combat climate change.",
        location: "Balearic Islands, Spain",
        region: "europe",
        coordinates: { x: 0.48, y: 0.32 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 42,
        goal: 75000,
        raised: 31500,
        supporters: 289,
        startDate: "2023-02-10",
        endDate: "2024-02-10",
        tags: ["Seagrass", "Carbon Capture", "Climate Action"],
        type: "project",
      },
      {
        id: "p3",
        title: "Great Barrier Reef Resilience",
        description:
          "Implementing innovative solutions to help the Great Barrier Reef adapt to and recover from climate impacts.",
        location: "Queensland, Australia",
        region: "oceania",
        coordinates: { x: 0.85, y: 0.65 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 78,
        goal: 100000,
        raised: 78000,
        supporters: 934,
        startDate: "2022-11-01",
        endDate: "2023-11-01",
        tags: ["Coral", "Climate Resilience", "Research"],
        type: "project",
      },
      {
        id: "p4",
        title: "Mangrove Restoration in Kenya",
        description: "Replanting mangrove forests along Kenya's coast to protect shorelines and create carbon sinks.",
        location: "Mombasa, Kenya",
        region: "africa",
        coordinates: { x: 0.55, y: 0.48 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 51,
        goal: 45000,
        raised: 23000,
        supporters: 356,
        startDate: "2023-03-15",
        endDate: "2024-03-15",
        tags: ["Mangroves", "Carbon Sequestration", "Coastal Protection"],
        type: "project",
      },
      {
        id: "p5",
        title: "Galapagos Marine Reserve Expansion",
        description:
          "Supporting the expansion of the Galapagos Marine Reserve to protect this unique ecosystem from industrial fishing.",
        location: "Galapagos Islands, Ecuador",
        region: "south-america",
        coordinates: { x: 0.25, y: 0.52 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 89,
        goal: 120000,
        raised: 106800,
        supporters: 1245,
        startDate: "2022-09-01",
        endDate: "2023-09-01",
        tags: ["Marine Protected Areas", "Biodiversity", "Conservation"],
        type: "project",
      },
      {
        id: "p6",
        title: "Kelp Forest Recovery in California",
        description:
          "Restoring kelp forests along the California coast to revitalize marine ecosystems affected by climate change.",
        location: "Monterey Bay, California",
        region: "north-america",
        coordinates: { x: 0.18, y: 0.35 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 34,
        goal: 65000,
        raised: 22100,
        supporters: 278,
        startDate: "2023-04-01",
        endDate: "2024-04-01",
        tags: ["Kelp", "Ecosystem Restoration", "Climate Adaptation"],
        type: "project",
      },
      {
        id: "p7",
        title: "Arctic Sea Ice Monitoring",
        description:
          "Deploying advanced monitoring systems to track Arctic sea ice changes and their impact on marine life.",
        location: "Svalbard, Norway",
        region: "europe",
        coordinates: { x: 0.52, y: 0.15 },
        image: "/placeholder.svg?height=300&width=500",
        progress: 62,
        goal: 85000,
        raised: 52700,
        supporters: 431,
        startDate: "2022-12-01",
        endDate: "2023-12-01",
        tags: ["Arctic", "Climate Research", "Sea Ice"],
        type: "project",
      },
    ]

    setProjects(mockProjects)
    // Set loading to false after projects are loaded
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  // Update the getProjectColor function to use different colors for projects vs individuals
  const getProjectColor = (progress: number, isProject = false) => {
    if (isProject) return "bg-emerald-500" // Projects always get emerald color

    // Individual supporters get blue shades based on progress
    if (progress < 33) return "bg-amber-500"
    if (progress < 66) return "bg-blue-500"
    return "bg-blue-500"
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-blue-950 shadow-lg border border-blue-800/50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-blue-950/70">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mb-4"></div>
            <p className="text-blue-300">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map background with enhanced styling */}
      <div
        ref={mapRef}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vector-blue-world-map.jpg-PIKxPYvbbcRCDM8B2bOaS1JXiVKYi2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced starry effect overlay with animated particles */}
        <div className="absolute inset-0 bg-blue-950/10">
          {/* Static stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-100"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
              }}
            />
          ))}

          {/* Animated floating particles */}
          {isLoading
            ? null
            : Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-blue-300/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}

          {/* Ocean wave effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute h-10 w-[200%] bg-blue-500/5"
                style={{
                  bottom: `${i * 6}px`,
                  borderRadius: "50%",
                  height: "20px",
                }}
                animate={{
                  x: ["-25%", "0%", "-25%"],
                }}
                transition={{
                  duration: 8 + i * 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project markers with enhanced visuals */}
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="absolute z-10"
          style={{
            left: `${project.coordinates.x * 100}%`,
            top: `${project.coordinates.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: hoveredProject === project.id || selectedProject?.id === project.id ? 1.3 : 1,
            zIndex: hoveredProject === project.id || selectedProject?.id === project.id ? 30 : 10,
          }}
          transition={{ duration: 0.3 }}
          onClick={() => handleProjectClick(project)}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className={`relative cursor-pointer ${hoveredProject === project.id ? "z-20" : "z-10"}`}>
            {/* Main marker with improved styling */}
            <div
              className={`w-6 h-6 rounded-full ${getProjectColor(project.progress, project.type === "project")} 
                flex items-center justify-center text-white font-bold border-2 border-white shadow-lg
                transition-all duration-300 hover:shadow-blue-400/50`}
            >
              <Heart className="w-3 h-3" />
            </div>

            {/* Enhanced pulsing animation with better color matching */}
            <div
              className={`absolute inset-0 rounded-full ${getProjectColor(project.progress, project.type === "project")} 
                opacity-30 animate-ping`}
              style={{ animationDuration: "2s" }}
            ></div>

            {/* Secondary pulse for depth */}
            <div
              className={`absolute inset-0 rounded-full ${getProjectColor(project.progress, project.type === "project")} 
                opacity-20 animate-ping`}
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
            ></div>

            {/* Hover tooltip with improved styling and animation */}
            <AnimatePresence>
              {hoveredProject === project.id && !selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 w-56 
                    bg-blue-900/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-white text-xs z-40 
                    border border-blue-700/50"
                >
                  <div className="font-bold mb-1">{project.title}</div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-blue-400" />
                      {project.location}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-blue-300">Progress:</span>
                      <span className="font-medium text-blue-200">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-blue-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProjectColor(project.progress, project.type === "project")}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      {/* Project details modal with enhanced styling */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="bg-blue-900/90 border-blue-700 text-blue-50 overflow-hidden">
                <CardHeader className="relative pb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 text-blue-300 hover:text-blue-100 hover:bg-blue-800/50 z-10"
                    onClick={closeProjectDetails}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Enhanced header with gradient overlay */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-600/20 to-transparent -mt-6"></div>

                  <CardTitle className="text-xl pr-8 relative z-1">{selectedProject.title}</CardTitle>
                  <CardDescription className="text-blue-300 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedProject.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="w-full h-48 rounded-lg bg-blue-800/50 overflow-hidden relative">
                    {/* Project image with overlay */}
                    <div
                      style={{
                        backgroundImage: `url(${selectedProject.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="absolute inset-0"
                    ></div>

                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-blue-900/10"></div>

                    {/* Project type badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`${
                          selectedProject.type === "project"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                        }`}
                      >
                        {selectedProject.type === "project" ? "Project" : "Individual"}
                      </Badge>
                    </div>

                    {/* Project stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div className="flex items-center text-xs text-blue-200">
                        <Users className="h-3 w-3 mr-1" />
                        {selectedProject.supporters} supporters
                      </div>
                      <div className="flex items-center text-xs text-blue-200">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(selectedProject.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-blue-200">{selectedProject.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300 flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />€{selectedProject.raised.toLocaleString()} raised
                      </span>
                      <span className="text-blue-300">
                        {selectedProject.progress}% of €{selectedProject.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={selectedProject.progress}
                      className="h-2.5 bg-blue-950"
                      indicatorClassName={`${getProjectColor(selectedProject.progress, selectedProject.type === "project")} 
                        transition-all duration-1000 ease-in-out`}
                    />
                    <div className="flex items-center justify-between text-xs text-blue-400">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {selectedProject.supporters} supporters
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(selectedProject.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} className="bg-blue-800/50 text-blue-200 hover:bg-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 bg-blue-800/30 border-t border-blue-700/50 p-4">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Donate Now
                  </Button>
                  <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/20">
                    <Users className="mr-2 h-4 w-4" />
                    Volunteer
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

