import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blue Pulse | Protecting the Blue Ocean",
  description: "Created with Blue Pulse",
  generator: "v0.dev",
  applicationName: "Blue Pulse",
  openGraph: {
    title: "Blue Pulse | Protecting the Blue Ocean",
    description: "Created with Blue Pulse",
    siteName: "Blue Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Pulse | Protecting the Blue Ocean",
    description: "Created with Blue Pulse",
    images: [],
    creator: "Blue Pulse",
  },
  appleWebApp: {
    title: "Blue Pulse",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
