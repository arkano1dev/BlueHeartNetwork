"use client"

import type { ReactNode } from "react"
import useMobile from "@/hooks/use-mobile"

interface ResponsiveContainerProps {
  children: ReactNode
  mobileHeight?: string
  tabletHeight?: string
  desktopHeight?: string
  className?: string
}

export default function ResponsiveContainer({
  children,
  mobileHeight = "300px",
  tabletHeight = "400px",
  desktopHeight = "500px",
  className = "",
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isDesktop } = useMobile()

  let height = desktopHeight
  if (isMobile) height = mobileHeight
  else if (isTablet) height = tabletHeight

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      {children}
    </div>
  )
}
