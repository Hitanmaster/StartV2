'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessagesSquare, Loader2, Search as SearchIcon, UserCircle, Check, CheckCheck, ImageIcon as ImageIconLucide } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Consistent sample chat data (can be moved to a shared file later)
const sampleChats = [
  { id: 'chat1', name: 'Billionaire (You)', lastMessage: 'Photo', timestamp: '2:54 PM', avatarFallback: 'BY', avatarUrl: 'https://placehold.co/40x40.png?text=B', isYou: true, lastMessageType: 'photo', lastMessageStatus: 'read', imageHint: 'man suit' },
  { id: 'chat2', name: 'Omm Bro', lastMessage: 'Sure, sounds good! Let me review the docs.', timestamp: '3:07 PM', avatarFallback: 'OB', avatarUrl: 'https://placehold.co/40x40.png?text=O', isTyping: false, imageHint: 'person student', lastMessageStatus: 'delivered' },
  { id: 'chat3', name: 'Ankit Dost', lastMessage: 'Ok, will do.', timestamp: '2:28 PM', avatarFallback: 'AD', avatarUrl: 'https://placehold.co/40x40.png?text=A', lastMessageStatus: 'read', imageHint: 'friends group' },
  { id: 'chat4', name: 'Sunny', lastMessage: 'Khel raha hai ki nahi? Waiting for you!', timestamp: '2:14 PM', avatarFallback: 'S', avatarUrl: 'https://placehold.co/40x40.png?text=S', unreadCount: 3, imageHint: 'boy redshirt' },
  { id: 'chat5', name: 'Anand', lastMessage: 'Bhukh lagal hai, chalo kuch khate hain.', timestamp: '1:01 PM', avatarFallback: 'A', avatarUrl: 'https://placehold.co/40x40.png?text=An', imageHint: 'man glasses', lastMessageStatus: 'sent'},
  { id: 'chat6', name: 'Sri Lanka Project Team', lastMessage: "Don't worry about equity for now. Just focus on the MVP. We need a solid presentation by Friday.", timestamp: '12:16 PM', avatarFallback: 'SL', avatarUrl: 'https://placehold.co/40x40.png?text=SL', lastMessageStatus: 'read', imageHint: 'abstract icon' },
  { id: 'chat7', name: 'New Applicant: Sarah', lastMessage: "Hi! I'm interested in the designer role for Project Phoenix.", timestamp: 'Yesterday', avatarFallback: 'SA', avatarUrl: 'https://placehold.co/40x40.png?text=S', unreadCount: 1, imageHint: 'woman professional' },
];

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-10rem)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  const filteredChats = sampleChats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col flex-1">
      <Card className="shadow-2xl rounded-xl overflow-hidden flex flex-col flex-1">
        <CardHeader className="bg-gradient-to-br from-primary/10 via-background to-background p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessagesSquare className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-bold text-foreground">My Conversations</CardTitle>
            </div>
            {/* Removed New Chat and Settings buttons as per previous request */}
          </div>
          <CardDescription className="text-muted-foreground">
            View and manage all your direct messages and group chats.
          </CardDescription>
           <div className="mt-3 relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 text-base rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {filteredChats.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredChats.map((chat) => (
                  <Link key={chat.id} href={`/messages/${chat.id}`} className="block hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        {chat.avatarUrl && <AvatarImage src={chat.avatarUrl} alt={chat.name} data-ai-hint={chat.imageHint || 'profile picture'} />}
                        <AvatarFallback className="text-lg">{chat.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-md truncate">{chat.name}</p>
                         <p className={cn(
                            "text-sm truncate flex items-center", 
                            chat.isTyping ? "text-primary italic" : "text-muted-foreground",
                            chat.unreadCount && chat.unreadCount > 0 && !chat.isTyping ? "text-foreground font-medium" : ""
                          )}>
                          {chat.isYou && chat.lastMessageStatus === 'read' && <CheckCheck className="inline h-4 w-4 mr-1 text-primary flex-shrink-0" />}
                          {chat.isYou && chat.lastMessageStatus === 'delivered' && <Check className="inline h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" />}
                          {chat.lastMessageType === 'photo' && <ImageIconLucide className="inline h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" />}
                          <span className="truncate">{chat.lastMessage}</span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end text-xs ml-2 flex-shrink-0">
                        <p className={cn("whitespace-nowrap", chat.unreadCount && chat.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground")}>
                          {chat.timestamp}
                        </p>
                        {chat.unreadCount && chat.unreadCount > 0 && (
                          <Badge variant="default" className="mt-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-green-500 text-white text-[10px] font-bold">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                <UserCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">{searchTerm ? "No conversations match your search." : "No conversations found."}</p>
                {searchTerm && <p className="text-sm text-muted-foreground mt-1">Try a different search term or clear the search.</p>}
              </div>
            )}
          </ScrollArea>
        </CardContent>
         {filteredChats.length > 0 && (
          <CardFooter className="p-3 border-t border-border text-center text-xs text-muted-foreground">
            {filteredChats.length} conversation(s) displayed.
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
