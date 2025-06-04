import type { SVGProps } from "react"

export default function YoutubeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>YouTube Logo</title>
      <path
        d="M27.4297 3.09375C27.0937 1.85938 26.1094 0.90625 24.9062 0.59375C22.75 0 14 0 14 0C14 0 5.25 0 3.09375 0.59375C1.89062 0.90625 0.90625 1.85938 0.570312 3.09375C0 5.28125 0 10 0 10C0 10 0 14.7188 0.570312 16.9062C0.90625 18.1406 1.89062 19.0938 3.09375 19.4062C5.25 20 14 20 14 20C14 20 22.75 20 24.9062 19.4062C26.1094 19.0938 27.0937 18.1406 27.4297 16.9062C28 14.7188 28 10 28 10C28 10 28 5.28125 27.4297 3.09375Z"
        fill="#FF0000"
      />
      <path d="M11.1992 14.2812L18.3984 10L11.1992 5.71875V14.2812Z" fill="white" />
    </svg>
  )
}
