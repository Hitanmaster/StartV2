import type { SVGProps } from "react"

export default function MicrosoftLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="20" height="20" fill="#F25022" />
      <rect x="22" width="20" height="20" fill="#7FBA00" />
      <rect y="22" width="20" height="20" fill="#00A4EF" />
      <rect x="22" y="22" width="20" height="20" fill="#FFB900" />
    </svg>
  )
}
