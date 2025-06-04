"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Heart, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface UserDisplayInfo {
  name: string
  avatarUrl?: string
  avatarFallback: string
  profileUrl: string
}

interface NewsPost {
  id: string
  userId: string
  user: UserDisplayInfo
  timestamp: string
  content: string
  imageUrl?: string
  imageHint?: string
  likes: number
  comments: number
}

interface NewsCardProps {
  post: NewsPost
  currentUserId?: string
  onDelete?: (postId: string) => void
}

export default function NewsCard({ post, currentUserId, onDelete }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(post.likes)

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
    setCurrentLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
  }

  const isPostOwner = post.userId === currentUserId

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Link href={post.user.profileUrl} className="flex-shrink-0">
          <Avatar>
            {post.user.avatarUrl && (
              <AvatarImage
                src={post.user.avatarUrl || "/placeholder.svg"}
                alt={post.user.name}
                data-ai-hint="profile picture"
              />
            )}
            <AvatarFallback>{post.user.avatarFallback}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={post.user.profileUrl} className="font-semibold text-foreground hover:underline truncate block">
            {post.user.name}
          </Link>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-primary flex-shrink-0"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden border">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt="Post image"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint={post.imageHint || "social media"}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-around items-center p-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary flex-1"
          onClick={handleLikeClick}
        >
          <Heart className={cn("h-5 w-5 mr-2", isLiked && "fill-primary text-primary")} />
          {currentLikes} {currentLikes === 1 ? "Like" : "Likes"}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary flex-1">
          <MessageCircle className="h-5 w-5 mr-2" />
          {post.comments} {post.comments === 1 ? "Comment" : "Comments"}
        </Button>
      </CardFooter>
    </Card>
  )
}
