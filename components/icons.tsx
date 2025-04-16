import * as React from "react"

export const Heart = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      ref={ref}
      {...props}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.79l-1.06-1.18a5.5 5.5 0 0 0-7.78 7.78l1.06 1.18L12 21.23l7.78-7.78 1.06-1.18a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
)
Heart.displayName = "Heart"
