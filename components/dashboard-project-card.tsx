"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, MoreVertical, Eye, ThumbsUp, BookmarkIcon, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  status: string
  statusColor: string
  title: string
  logoUrl?: string
  logoHint?: string
  description: string
  category: string
  teamSize?: number
  creator: string
  creatorProfileUrl?: string
  datePosted: string
  isUserProject?: boolean
  lookingFor?: string[]
  likes?: number
  views?: number
}

interface DashboardProjectCardProps {
  project: Project
  showMiniDashboard?: boolean
  onBookmarkToggle?: (projectId: string, isBookmarked: boolean) => void
  onDelete?: (projectId: string) => void
}

export default function DashboardProjectCard({
  project,
  showMiniDashboard = false,
  onBookmarkToggle,
  onDelete,
}: DashboardProjectCardProps) {
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(project.likes || 0)
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false)

  const handleBookmark = () => {
    const newBookmarkStatus = !isBookmarked
    setIsBookmarked(newBookmarkStatus)
    toast({
      title: newBookmarkStatus ? "Project Saved!" : "Project Unsaved",
      description: newBookmarkStatus
        ? `"${project.title}" added to your bookmarks.`
        : `"${project.title}" removed from your bookmarks.`,
    })
    onBookmarkToggle?.(project.id, newBookmarkStatus)
  }

  const handleLikeProject = () => {
    const newLikedState = !isLikedByCurrentUser
    setIsLikedByCurrentUser(newLikedState)
    setCurrentLikes((prevLikes) => (newLikedState ? prevLikes + 1 : prevLikes - 1))
    toast({
      title: newLikedState ? "Project Liked!" : "Like Removed!",
      description: `You ${newLikedState ? "liked" : "unliked"} "${project.title}".`,
    })
  }

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden flex flex-col h-full hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Badge
          variant="default"
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-br-lg rounded-tl-lg absolute top-0 left-0 z-10"
        >
          {project.status}
        </Badge>

        <div className="flex justify-center items-center h-24 bg-card-foreground/5 pt-8 pb-2 px-2">
          {project.logoUrl ? (
            <Image
              src={project.logoUrl || "/placeholder.svg"}
              alt={`${project.title} logo`}
              width={project.title === "GLOXA" ? 100 : 40}
              height={40}
              className="object-contain max-h-16"
              data-ai-hint={project.logoHint || "project logo"}
            />
          ) : (
            <div className="h-16 w-full flex items-center justify-center text-muted-foreground text-sm">
              <FolderOpen className="w-8 h-8 text-primary/50" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold mb-2 text-foreground truncate">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 h-[3.75rem]">{project.description}</p>

        <div className="text-xs text-muted-foreground space-y-1 mb-3">
          <div className="flex justify-between">
            <span>
              Category: <span className="font-medium text-foreground">{project.category}</span>
            </span>
            {project.teamSize && (
              <span>
                Team Size: <span className="font-medium text-foreground">{project.teamSize}</span>
              </span>
            )}
          </div>
          <p>
            Creator:{" "}
            {project.creatorProfileUrl ? (
              <Link href={project.creatorProfileUrl} className="font-medium text-primary hover:underline">
                {project.creator}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{project.creator}</span>
            )}
          </p>
          <p>
            Posted: <span className="font-medium text-foreground">{project.datePosted}</span>
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={handleLikeProject}>
            <ThumbsUp className={cn("h-4 w-4", isLikedByCurrentUser ? "fill-primary text-primary" : "")} />
            <span>Likes ({currentLikes})</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1" disabled>
            <Eye className="h-4 w-4" />
            <span>Views ({project.views || 0})</span>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="p-2 border-t border-border/30 bg-card/50 flex items-center justify-around">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary rounded-full"
          onClick={handleBookmark}
        >
          <BookmarkIcon className={cn("h-5 w-5", isBookmarked && "fill-primary text-primary")} />
          <span className="sr-only">Save Project</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
          <Copy className="h-5 w-5" />
          <span className="sr-only">Copy Info</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">More Options</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
