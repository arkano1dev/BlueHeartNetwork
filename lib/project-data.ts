export interface Project {
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

// Mock projects data
export const projects: Project[] = [
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
    title: 'Lionfish Bounty Hunt – "Wanted: Dead or Alive"',
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

