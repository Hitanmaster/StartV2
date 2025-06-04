import type { SVGProps } from "react"

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" {...props}>
      <defs>
        <linearGradient id="orbitGlobalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--neon-orange))" />
          <stop offset="33%" stopColor="hsl(var(--neon-pink-gradient))" />
          <stop offset="66%" stopColor="hsl(var(--neon-purple))" />
          <stop offset="100%" stopColor="hsl(var(--neon-blue-gradient))" />
        </linearGradient>

        {/* Ensures this radialGradient matches the client-side expectation from the hydration error diff */}
        <radialGradient id="newStarGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(50, 100%, 90%)" /> {/* Very Light Yellow/White center */}
          <stop offset="40%" stopColor="hsl(45, 100%, 75%)" /> {/* Light Yellow/Peach */}
          <stop offset="80%" stopColor="hsl(28, 100%, 58%)" /> {/* Orange (hardcoded value from --neon-orange) */}
          <stop offset="100%" stopColor="hsl(25, 100%, 50%)" /> {/* Darker Orange tip */}
        </radialGradient>
      </defs>

      {/* Orbits */}
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="30"
        stroke="url(#orbitGlobalGradient)"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(0 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="30"
        stroke="url(#orbitGlobalGradient)"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(60 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="30"
        stroke="url(#orbitGlobalGradient)"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(-60 50 50)"
      />

      {/* Star - A four-pointed star */}
      <path
        d="M50,25 L56.5,43.5 L75,50 L56.5,56.5 L50,75 L43.5,56.5 L25,50 L43.5,43.5 Z"
        fill="url(#newStarGradient)"
      />
    </svg>
  )
}
