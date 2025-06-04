import type { SVGProps } from "react"

export default function LinkedinLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn Logo</title>
      <rect width="24" height="24" rx="4" fill="#0077B5" />
      <path
        fill="#FFFFFF"
        d="M6.94 20.495h-2.92v-9.88h2.92v9.88zm-1.46-11.14c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72zm11.26 11.14h-2.92v-4.78c0-1.14-.02-2.6-1.59-2.6s-1.83 1.23-1.83 2.52v4.86h-2.92v-9.88h2.8v1.28h.04c.39-.74 1.34-1.52 2.77-1.52 2.96 0 3.51 1.95 3.51 4.48v5.64z"
      />
    </svg>
  )
}
