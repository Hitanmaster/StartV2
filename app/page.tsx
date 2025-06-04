"use client"

import DashboardProjectCard, { type Project } from "@/components/dashboard-project-card"

const sampleProject: Project = {
  id: "sample-1",
  status: "Idea Stage",
  statusColor: "accent",
  title: "Sample Project",
  description: "This is a placeholder project.",
  category: "General",
  creator: "Sample User",
  datePosted: "N/A",
}

export default function SyntheticV0PageForDeployment() {
  return <DashboardProjectCard project={sampleProject} />
}
