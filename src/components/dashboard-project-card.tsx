'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronDown,
  MessageSquare,
  Copy,
  MoreVertical,
  Eye,
  ThumbsUp,
  Users as UsersIcon,
  Edit3,
  Trash2,
  Share2,
  Bookmark as BookmarkIcon,
  User as UserIcon,
  FolderOpen,
  AlertTriangle,
  Briefcase,
  Send,
} from "lucide-react";
import { cn } from '@/lib/utils';
import { useState, type FormEvent, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, type UserProfile as AuthUserProfile } from '@/context/AuthContext';
import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";

interface CommentAuthor {
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  profileUrl?: string;
}
export interface Comment {
  id: string;
  author: CommentAuthor;
  text: string;
  timestamp: string;
}

export interface Project {
  id: string;
  status: string;
  statusColor: BadgeProps["variant"] | 'primary' | 'secondary' | 'accent' | 'destructive' | 'default' | 'info' | 'success' | 'warning';
  title: string;
  logoUrl?: string;
  logoHint?: string;
  description: string;
  category: string;
  teamSize?: number;
  creator: string;
  creatorProfileUrl?: string;
  datePosted: string;
  isUserProject?: boolean;
  lookingFor?: string[];
  comments?: Comment[];
  likes?: number; 
  views?: number; 
}

interface DashboardProjectCardProps {
  project: Project;
  showMiniDashboard?: boolean;
  onBookmarkToggle?: (projectId: string, isBookmarked: boolean) => void;
  onDelete?: (projectId: string) => void;
}

const BOOKMARKS_KEY = 'startlinker-bookmarks';

export default function DashboardProjectCard({ project, showMiniDashboard = false, onBookmarkToggle, onDelete }: DashboardProjectCardProps) {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentComments, setCurrentComments] = useState<Comment[]>(project.comments || []);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedRoleForApplication, setSelectedRoleForApplication] = useState<string | null>(null);
  const [applicationMessage, setApplicationMessage] = useState("");

  const [currentLikes, setCurrentLikes] = useState(project.likes || 0);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Removed !showMiniDashboard condition here as bookmarks are now global
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      const bookmarkedIds: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      setIsBookmarked(bookmarkedIds.includes(project.id));
    }
  }, [project.id]);

  const handleBookmark = () => {
    if (typeof window !== 'undefined') {
      const newBookmarkStatus = !isBookmarked;
      setIsBookmarked(newBookmarkStatus);
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      let bookmarkedIds: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      if (newBookmarkStatus) {
        if (!bookmarkedIds.includes(project.id)) {
          bookmarkedIds.push(project.id);
        }
      } else {
        bookmarkedIds = bookmarkedIds.filter(id => id !== project.id);
      }
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
      toast({
        title: newBookmarkStatus ? "Project Saved!" : "Project Unsaved",
        description: newBookmarkStatus ? `"${project.title}" added to your bookmarks.` : `"${project.title}" removed from your bookmarks.`,
      });
      onBookmarkToggle?.(project.id, newBookmarkStatus);
    }
  };

  const handleCopyInfo = () => {
    const projectInfo = `Project: ${project.title}\nCreator: ${project.creator}\nDescription: ${project.description.substring(0, 100)}...`;
    navigator.clipboard.writeText(projectInfo)
      .then(() => {
        toast({ title: "Copied to Clipboard", description: "Project info copied." });
      })
      .catch(err => {
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy project info." });
        console.error('Failed to copy text: ', err);
      });
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !user) return;

    const newComment: Comment = {
      id: String(Date.now()),
      author: {
        name: userProfile?.name || user.displayName || user.email || "Current User",
        avatarUrl: userProfile?.avatarUrl,
        avatarFallback: userProfile?.avatarFallback || userProfile?.name?.substring(0, 2).toUpperCase() || "ME",
        profileUrl: userProfile?.uid ? `/profiles/${userProfile.uid}` : undefined,
      },
      text: newCommentText.trim(),
      timestamp: "Just now",
    };
    setCurrentComments(prev => [newComment, ...prev]);
    setNewCommentText("");
  };

  const handleOpenApplyDialog = (role: string) => {
    setSelectedRoleForApplication(role);
    setApplicationMessage("");
    setIsApplyDialogOpen(true);
  };

  const handleApplicationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!applicationMessage.trim() || !selectedRoleForApplication) {
      toast({
        variant: "destructive",
        title: "Application Incomplete",
        description: "Please write a message for your application.",
      });
      return;
    }
    console.log("Simulated Application Submission:", {
      projectId: project.id,
      role: selectedRoleForApplication,
      message: applicationMessage,
    });
    toast({
      title: "Application Sent (Simulated)",
      description: `Your application for the ${selectedRoleForApplication} role on "${project.title}" has been submitted.`,
    });
    setIsApplyDialogOpen(false);
  };

  const handleLikeProject = () => {
    const newLikedState = !isLikedByCurrentUser;
    setIsLikedByCurrentUser(newLikedState);
    setCurrentLikes(prevLikes => newLikedState ? prevLikes + 1 : prevLikes - 1);
    toast({
      title: newLikedState ? "Project Liked!" : "Like Removed!",
      description: `You ${newLikedState ? 'liked' : 'unliked'} "${project.title}".`
    });
  };

  const statusColorMapping: Record<string, BadgeProps["variant"]> = {
    primary: 'default',
    secondary: 'secondary',
    accent: 'default',
    destructive: 'destructive',
    default: 'default',
    info: 'default',
    success: 'default',
    warning: 'destructive',
  };
  const badgeVariant = statusColorMapping[project.statusColor || 'default'] || 'default';

  let projectStatsAndInteractions: ReactNode;

  if (showMiniDashboard) {
    projectStatsAndInteractions = (
      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-xs font-semibold text-primary mb-1.5">Project Stats & Actions</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="flex items-center"><Eye className="mr-1 h-3 w-3" /> Views: {project.views || 'N/A'}</span>
          <span className="flex items-center"><ThumbsUp className="mr-1 h-3 w-3" /> Likes: {currentLikes}</span>
           <span className="flex items-center"><MessageSquare className="mr-1 h-3 w-3" /> Apps: N/A</span> {/* Placeholder for applications */}
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => toast({ title: "Edit Project (Simulated)", description: `Editing for "${project.title}" is a placeholder.` })}>
            <Edit3 className="mr-1 h-3 w-3" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => toast({ title: "Shared (Simulated)", description: `Link for "${project.title}" copied to clipboard!` })}>
            <Share2 className="mr-1 h-3 w-3" /> Share
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex-1 text-xs">
                <Trash2 className="mr-1 h-3 w-3" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the project "{project.title}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete?.(project.id)} className={cn(buttonVariants({ variant: "destructive" }))}>
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  } else {
    // Likes, Views for browse page
    projectStatsAndInteractions = (
       <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={handleLikeProject}>
            <ThumbsUp className={cn("h-4 w-4", isLikedByCurrentUser ? "fill-primary text-primary" : "")} />
            <span>Likes ({currentLikes})</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1" disabled>
            <Eye className="h-4 w-4" />
            <span>Views ({project.views || 0})</span>
          </Button>
          {/* Comment button removed from this view */}
        </div>
    );
  }


  return (
    <>
      <Card className="shadow-lg rounded-xl overflow-hidden flex flex-col h-full hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Badge
            variant={badgeVariant}
            className={cn(
              "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-br-lg rounded-tl-lg absolute top-0 left-0 z-10",
              project.statusColor === 'accent' ? 'bg-accent text-accent-foreground' : '',
              project.statusColor === 'primary' ? 'bg-primary text-primary-foreground' : ''
            )}
          >
            {project.status}
          </Badge>

          <div className="flex justify-center items-center h-24 bg-card-foreground/5 pt-8 pb-2 px-2">
            {project.logoUrl ? (
              <Image
                src={project.logoUrl}
                alt={`${project.title} logo`}
                width={project.title === 'GLOXA' ? 100 : 40}
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
              <span>Category: <span className="font-medium text-foreground">{project.category}</span></span>
              {project.teamSize && <span>Team Size: <span className="font-medium text-foreground">{project.teamSize}</span></span>}
            </div>
            <p>Creator: {project.creatorProfileUrl ?
              <Link href={project.creatorProfileUrl} className="font-medium text-primary hover:underline">{project.creator}</Link>
              : <span className="font-medium text-foreground">{project.creator}</span>
            }</p>
            <p>Posted: <span className="font-medium text-foreground">{project.datePosted}</span></p>
          </div>
          {projectStatsAndInteractions}
        </CardContent>

        <CardFooter className="p-2 border-t border-border/30 bg-card/50 flex items-center justify-around">
          {!showMiniDashboard && (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full" onClick={handleBookmark}>
                <BookmarkIcon className={cn("h-5 w-5", isBookmarked && "fill-primary text-primary")} />
                <span className="sr-only">Save Project</span>
              </Button>

              {project.lookingFor && project.lookingFor.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                       <Briefcase className="h-5 w-5" />
                       <span className="sr-only">Apply for Role</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Apply For Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {project.lookingFor.map(role => (
                      <DropdownMenuItem key={role} onSelect={() => handleOpenApplyDialog(role)}>
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full" onClick={handleCopyInfo}>
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy Info</span>
                </Button>
              )}
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {showMiniDashboard && project.lookingFor && project.lookingFor.length > 0 && (
                <>
                  <DropdownMenuLabel>Looking For Roles</DropdownMenuLabel>
                  {project.lookingFor.map(role => (
                    <DropdownMenuItem key={role} disabled> {/* Disabled in mini-dashboard view */}
                      {role}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onSelect={() => toast({ title: "Sharing Project (Simulated)", description: `Sharing link for "${project.title}" copied to clipboard.` })}>
                <Share2 className="mr-2 h-4 w-4" />
                Share this Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Reported (Simulated)", description: `Project "${project.title}" has been reported.` })}>
                <AlertTriangle className="mr-2 h-4 w-4 text-destructive/70" />
                Report Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border text-foreground rounded-lg">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-lg font-semibold">Comments on {project.title}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[300px] my-4 pr-3">
            {currentComments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-4">
                {currentComments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      {comment.author.avatarUrl && <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="commenter avatar" />}
                      <AvatarFallback className="text-xs bg-muted">{comment.author.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-background/50 p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">
                          {comment.author.profileUrl ? (
                            <Link href={comment.author.profileUrl} className="hover:underline">{comment.author.name}</Link>
                          ) : comment.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm text-foreground/90 mt-1 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleCommentSubmit} className="pt-4 border-t space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-9 w-9">
                {userProfile?.avatarUrl && <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name || 'User'} />}
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {userProfile?.avatarFallback || userProfile?.name?.substring(0, 2).toUpperCase() || <UserIcon className="h-4 w-4" />}
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
            <Button type="submit" disabled={!newCommentText.trim() || !user} className="w-full">
              <Send className="mr-2 h-4 w-4" /> Post Comment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground rounded-lg">
          <DialogHeader>
            <DialogTitle>Apply for: {selectedRoleForApplication} at {project.title}</DialogTitle>
            <DialogDescription>
              Let the project creator know why you're a great fit for this role.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplicationSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="applicationMessage" className="text-sm font-medium text-foreground">
                Your Message / Experience
              </Label>
              <Textarea
                id="applicationMessage"
                placeholder="Briefly describe your relevant experience and interest..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="min-h-[100px] mt-2 bg-input"
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
