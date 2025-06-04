import type { SVGProps } from "react"

export default function TelegramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Telegram Logo</title>
      <circle cx="120" cy="120" r="120" fill="#24A1DE" />
      <path
        d="M97.9997 172.333C95.0037 172.333 94.8704 171.228 93.6464 168.505L80.4264 129.045L173.493 75.6665"
        fill="#C8DAEA"
      />
      <path
        d="M97.9991 172.333C100.342 172.333 101.749 171.253 103.082 169.98L120.829 153.04L94.9421 137.893"
        fill="#A9C9DD"
      />
      <path
        d="M94.9419 137.893L151.442 179.373C155.442 181.633 158.389 180.64 159.629 176.02L178.916 84.3865C180.649 78.0465 176.702 75.3598 173.493 76.6665L51.6226 119.813C45.116 122.28 45.1893 125.86 50.3026 127.347L76.2293 135.4L154.109 89.9598C156.562 88.3732 158.602 89.2865 156.916 90.7598L94.9419 137.893Z"
        fill="white"
      />
    </svg>
  )
}
