import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import { Heart } from "@/components/icons" // Import from the correct location
import CarbonFootprintSection from "@/components/carbon-footprint-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "BlueHearts Network | Protecting the Blue Ocean",
  description:
    "Join the BlueHearts Network to support ocean conservation projects, connect with like-minded individuals, and make a real impact on marine ecosystems worldwide.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0077ff" }],
  },
  manifest: "/site.webmanifest",
  applicationName: "BlueHearts Network",
  appleWebApp: {
    capable: true,
    title: "BlueHearts Network",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    url: "https://bluehearts.network",
    title: "BlueHearts Network | Protecting the Blue Ocean",
    description:
      "Join the BlueHearts Network to support ocean conservation projects, connect with like-minded individuals, and make a real impact on marine ecosystems worldwide.",
    siteName: "BlueHearts Network",
    images: [
      {
        url: "https://bluehearts.network/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BlueHearts Network - Protecting the blue ocean",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueHearts Network | Protecting the Blue Ocean",
    description:
      "Join the BlueHearts Network to support ocean conservation projects, connect with like-minded individuals, and make a real impact on marine ecosystems worldwide.",
    images: ["https://bluehearts.network/twitter-image.jpg"],
    creator: "@bluehearts",
    site: "@bluehearts",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c4a6e" },
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0077ff" />
        <meta name="msapplication-TileColor" content="#0077ff" />
      </head>
      <body className="min-h-screen bg-blue-950">
        <Header />
        {children}

        {/* Footer with Carbon Footprint */}
        <footer className="relative py-8 px-4 sm:px-6 md:px-8 border-t border-blue-800 z-10 bg-blue-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Heart className="w-6 h-6 text-blue-500 mr-2" />
                <span className="text-blue-200">The BlueHearts Network © {new Date().getFullYear()}</span>
              </div>
              <div className="flex space-x-6">
                <Link href="/sustainability" className="text-blue-300 hover:text-blue-100">
                  Sustainability
                </Link>
                <Link href="/privacy" className="text-blue-300 hover:text-blue-100">
                  Privacy
                </Link>
                <Link href="/terms" className="text-blue-300 hover:text-blue-100">
                  Terms
                </Link>
                <Link href="/contact" className="text-blue-300 hover:text-blue-100">
                  Contact
                </Link>
              </div>
            </div>

            {/* Carbon Footprint Section */}
            <div className="border-t border-blue-800/50 pt-4">
              <CarbonFootprintSection />
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}


import './globals.css'