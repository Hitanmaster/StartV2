'use client';

import type { UserProfile as AuthUserProfile } from '@/context/AuthContext'; // For current user info
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, Share2, MoreHorizontal, Trash2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

// UserDisplayInfo specific to the post author
export interface UserDisplayInfo {
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  profileUrl: string; // Should be in format /profiles/[userId]
}

export interface NewsPost {
  id: string;
  userId: string; 
  user: UserDisplayInfo;
  timestamp: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  likes: number;
  comments: number; // This will be the initial count
}

// Define Comment interface locally or import if shared
interface Comment {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
    avatarFallback: string;
    profileUrl?: string; // Link to commenter's profile
  };
  text: string;
  timestamp: string;
}

interface NewsCardProps {
  post: NewsPost;
  currentUserId?: string; 
  currentUserProfile?: AuthUserProfile | null;
  onDelete?: (postId: string) => void;
}

export default function NewsCard({ post, currentUserId, currentUserProfile, onDelete }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([]); // Start with empty or pre-loaded comments if available
  const [currentCommentsCount, setCurrentCommentsCount] = useState(post.comments + displayedComments.length);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
  };

  const handleDeleteClick = () => {
    if (onDelete && post.userId === currentUserId) {
      onDelete(post.id);
    }
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: String(Date.now()),
      author: {
        name: currentUserProfile?.name || "Anonymous",
        avatarUrl: currentUserProfile?.avatarUrl,
        avatarFallback: currentUserProfile?.avatarFallback || currentUserProfile?.name?.substring(0,2).toUpperCase() || "A",
        profileUrl: currentUserProfile ? `/profiles/${currentUserProfile.uid}` : undefined,
      },
      text: newCommentText.trim(),
      timestamp: "Just now",
    };

    setDisplayedComments(prevComments => [newComment, ...prevComments]);
    setCurrentCommentsCount(prev => prev + 1);
    setNewCommentText("");
    // setIsCommentDialogOpen(false); // Keep dialog open
  };

  const isPostOwner = post.userId === currentUserId;

  return (
    <>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col h-full">
        <CardHeader className="flex flex-row items-center space-x-3 p-4">
          <Link href={post.user.profileUrl} className="flex-shrink-0">
            <Avatar>
              {post.user.avatarUrl && <AvatarImage src={post.user.avatarUrl} alt={post.user.name} data-ai-hint="profile picture"/>}
              <AvatarFallback>{post.user.avatarFallback}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={post.user.profileUrl} className="font-semibold text-foreground hover:underline truncate block">
              {post.user.name}
            </Link>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary flex-shrink-0">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert('Share feature coming soon!')}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Post
              </DropdownMenuItem>
              {isPostOwner && onDelete && (
                <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive hover:!text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Post
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
          {post.imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <Image
                src={post.imageUrl}
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
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary flex-1" onClick={handleLikeClick}>
            <Heart className={cn("h-5 w-5 mr-2", isLiked && "fill-primary text-primary")} />
            {currentLikes} {currentLikes === 1 ? 'Like' : 'Likes'}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary flex-1" onClick={() => setIsCommentDialogOpen(true)}>
            <MessageCircle className="h-5 w-5 mr-2" />
            {currentCommentsCount} {currentCommentsCount === 1 ? 'Comment' : 'Comments'}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground rounded-lg">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-lg font-semibold">Comments on {post.user.name}'s post</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[300px] my-4 pr-3">
            {displayedComments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-4">
                {displayedComments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    {comment.author.profileUrl ? (
                       <Link href={comment.author.profileUrl}>
                        <Avatar className="h-8 w-8">
                          {comment.author.avatarUrl && <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="commenter avatar" />}
                          <AvatarFallback className="text-xs bg-muted">{comment.author.avatarFallback}</AvatarFallback>
                        </Avatar>
                       </Link>
                    ) : (
                      <Avatar className="h-8 w-8">
                        {comment.author.avatarUrl && <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="commenter avatar" />}
                        <AvatarFallback className="text-xs bg-muted">{comment.author.avatarFallback}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1 bg-background/50 p-3 rounded-md min-w-0">
                      <div className="flex items-center justify-between">
                        {comment.author.profileUrl ? (
                          <Link href={comment.author.profileUrl} className="text-sm font-semibold text-foreground hover:underline truncate">
                            {comment.author.name}
                          </Link>
                        ) : (
                          <p className="text-sm font-semibold text-foreground truncate">{comment.author.name}</p>
                        )}
                        <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm text-foreground/90 mt-1 whitespace-pre-wrap break-words">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleCommentSubmit} className="pt-4 border-t space-y-3">
            <div className="flex items-start space-x-3">
                <Avatar className="h-9 w-9">
                  {currentUserProfile?.avatarUrl && <AvatarImage src={currentUserProfile.avatarUrl} alt={currentUserProfile.name || 'User'} />}
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                    {currentUserProfile?.avatarFallback || currentUserProfile?.name?.substring(0,2).toUpperCase() || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <Textarea
                  id="comment"
                  placeholder="Write a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="min-h-[60px] flex-1 bg-input placeholder:text-muted-foreground focus-visible:ring-primary"
                />
            </div>
            <Button type="submit" disabled={!newCommentText.trim()} className="w-full">
              Post Comment
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
