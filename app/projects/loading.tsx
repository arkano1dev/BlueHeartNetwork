import { Heart } from "@/components/icons"

// Add loading content
export default function Loading() {
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <Heart className="h-12 w-12 text-blue-500 animate-pulse" />
        <p className="mt-4 text-blue-300">Loading The BlueHearts Network projects...</p>
      </div>
    </div>
  )
}
