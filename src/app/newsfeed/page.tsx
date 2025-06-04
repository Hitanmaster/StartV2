'use client';

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import NewsCard, { type NewsPost, type UserDisplayInfo as NewsCardUserDisplayInfo } from '@/components/news-card';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper, PlusCircle, Send, Image as ImageIcon, X as CloseIcon, User } from 'lucide-react';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type UserDisplayInfo = NewsCardUserDisplayInfo;

const initialNewsPostsData: NewsPost[] = [
  {
    id: '1',
    userId: 'user-elara', 
    user: {
      name: 'Elara Vance',
      avatarUrl: 'https://placehold.co/40x40.png',
      avatarFallback: 'EV',
      profileUrl: '/profiles/user-elara', // Link to Elara's profile
    },
    timestamp: '3 hours ago',
    content: 'Just launched the beta for my new AI-driven project management tool, "TaskFlow AI"! Looking for early adopters and feedback. #AI #SaaS #ProductLaunch',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'software dashboard',
    likes: 125,
    comments: 18,
  },
  {
    id: '2',
    userId: 'user-marcus', 
    user: {
      name: 'Marcus Chen',
      avatarUrl: 'https://placehold.co/40x40.png',
      avatarFallback: 'MC',
      profileUrl: '/profiles/user-marcus', // Link to Marcus's profile
    },
    timestamp: '5 hours ago',
    content: 'Excited to announce our pre-seed funding round for EcoWidgets! We are building sustainable alternatives for everyday tech. 🌱 #Sustainability #Hardware #Funding',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'eco friendly product',
    likes: 230,
    comments: 45,
  },
  {
    id: '3',
    userId: 'user-sophia', 
    user: {
      name: 'Sophia Al-Jamil',
      avatarUrl: 'https://placehold.co/40x40.png',
      avatarFallback: 'SA',
      profileUrl: '/profiles/user-sophia', // Link to Sophia's profile
    },
    timestamp: '1 day ago',
    content: 'Looking for a UX/UI designer with experience in fintech to join a disruptive new payment platform. DM me if interested! #Hiring #Fintech #Design',
    likes: 98,
    comments: 12,
  },
   {
    id: '4',
    userId: 'user-techinnovator',
    user: {
      name: 'TechInnovator_77',
      avatarUrl: 'https://placehold.co/40x40.png',
      avatarFallback: 'TI',
      profileUrl: '/profiles/user-techinnovator', // Link to TechInnovator's profile
    },
    timestamp: '2 days ago',
    content: 'Just published a deep dive into the future of decentralized social media. What are your thoughts on the Web3 creator economy? Link in bio. #Web3 #Decentralization #FutureTech',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'blockchain network',
    likes: 150,
    comments: 33,
  },
];

export default function NewsfeedPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>(initialNewsPostsData);
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImageDataUri, setSelectedImageDataUri] = useState<string | null>(null);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) { // Added !user check for robustness
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading newsfeed...</p>
      </div>
    );
  }

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && !selectedImageDataUri) return; 

    const currentUserDisplayInfo: UserDisplayInfo = {
      name: userProfile?.name || user.displayName || user.email || 'Anonymous User',
      avatarUrl: userProfile?.avatarUrl,
      avatarFallback: userProfile?.avatarFallback || userProfile?.name?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase() || 'AU',
      profileUrl: `/profiles/${user.uid}`, 
    };

    const newPost: NewsPost = {
      id: String(Date.now()),
      userId: user.uid, 
      user: currentUserDisplayInfo,
      timestamp: 'Just now',
      content: newPostContent,
      imageUrl: selectedImageDataUri || undefined,
      imageHint: selectedImageDataUri ? 'user uploaded content' : undefined,
      likes: 0,
      comments: 0,
    };

    setNewsPosts(prevPosts => [newPost, ...prevPosts]);
    setNewPostContent('');
    setSelectedFileName(null);
    setSelectedImageDataUri(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    setIsCreatePostOpen(false);
  };

  const handleDeletePost = (postId: string) => {
    setNewsPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName(null);
      setSelectedImageDataUri(null);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="mb-8 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/20 via-background to-background p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <Newspaper className="h-8 w-8 md:h-10 md:w-10 text-primary mt-1" />
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">Community Newsfeed</CardTitle>
                <CardDescription className="text-base md:text-lg text-muted-foreground mt-1">
                  Stay updated with the latest from the StartLinker community.
                </CardDescription>
              </div>
            </div>
             {/* Create Post button moved outside this card in the next div */}
          </div>
        </CardHeader>
      </Card>

      <div className="flex justify-end my-6 px-4 md:px-0">
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="font-semibold text-base md:text-lg py-2.5 px-4 md:py-3 md:px-6">
              <PlusCircle className="mr-2 h-5 w-5" /> Create Post
            </Button>
          </DialogTrigger>
          <DialogContent hideDefaultClose={true} className="sm:max-w-[550px] p-0 bg-card text-foreground border-border shadow-2xl rounded-xl">
             <div className="flex items-center justify-between p-4 border-b border-border">
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <CloseIcon className="h-6 w-6" />
                      <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
                <DialogTitle className="text-lg font-semibold text-foreground text-center flex-1">Create Post</DialogTitle>
                <Button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim() && !selectedImageDataUri}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-full text-sm"
                >
                    Post
                </Button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 mt-1">
                  {userProfile?.avatarUrl && <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name || 'User'} data-ai-hint="user avatar"/>}
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {userProfile?.avatarFallback || userProfile?.name?.substring(0,2).toUpperCase() || <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="What's happening?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px] flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-muted-foreground resize-none"
                />
              </div>
              {selectedImageDataUri && (
                <div className="pl-14 relative group"> 
                  <Image src={selectedImageDataUri} alt="Preview" width={400} height={210} className="max-h-48 rounded-md border border-border object-contain" data-ai-hint="image preview"/>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-7 w-7 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {setSelectedImageDataUri(null); setSelectedFileName(null); if (fileInputRef.current) fileInputRef.current.value = "";}}
                    aria-label="Remove image"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </Button>
                  {selectedFileName && <p className="text-xs text-muted-foreground mt-1 truncate">{selectedFileName}</p>}
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageSelect}
            />
            <div className="flex items-center justify-start p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full" onClick={handleImageButtonClick}>
                  <ImageIcon className="h-8 w-8" /> 
                  <span className="sr-only">Add image</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsPosts.map((post) => (
          <NewsCard 
            key={post.id} 
            post={post} 
            currentUserId={user?.uid} 
            currentUserProfile={userProfile}
            onDelete={handleDeletePost} 
          />
        ))}
      </div>
      {newsPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">The newsfeed is quiet right now... Be the first to post!</p>
        </div>
      )}
    </div>
  );
}
