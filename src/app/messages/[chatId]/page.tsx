'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Send, 
  Check, 
  CheckCheck, 
  ImageIcon as ImageIconLucide, 
  AlertTriangle, 
  FolderOpen,
  UserCircle as UserProfileIcon,
  Search as SearchIconLucide, // Renamed to avoid conflict with state variable
  BellOff,
  Trash2,
  Ban,
  ShieldAlert,
  PlayCircle, // For voice message placeholder
  XCircle, // For closing search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button'; // Added buttonVariants import
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';


interface Message {
  id: string;
  sender: 'you' | 'other';
  type: 'text' | 'image' | 'link' | 'project_share' | 'voice_placeholder';
  content?: string; 
  imageUrl?: string; 
  imageHint?: string;
  projectDetails?: {
    title: string;
    description: string;
    tags: string;
    category: string;
    projectId?: string;
  };
  hd?: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  statusText: string;
  imageHint?: string;
}

interface ChatData {
  participant: ChatParticipant;
  messages: Message[];
}

// Enhanced sample data for more realistic chat flow
const sampleChatsData: Record<string, ChatData> = {
  chat1: {
    participant: { id: 'user2', name: 'Billionaire (You)', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'BY', statusText: 'Message yourself', imageHint: 'man suit' },
    messages: [
      { id: 'm0', sender: 'other', type: 'text', content: 'This is a test message to myself.', timestamp: '2:10 PM', status: 'read' },
      { id: 'm1', sender: 'other', type: 'project_share', projectDetails: { title: 'Project Idea: EcoLearn', description: 'An AI platform for personalized environmental education for K-12 students.', tags: 'AI, EdTech, Sustainability', category: 'Education', projectId: 'proj123' }, hd: true, timestamp: '2:19 PM', status: 'read' },
      { id: 'm2', sender: 'other', type: 'link', content: 'https://www.startlinker.com', timestamp: '2:52 PM', status: 'read' },
      { id: 'm3', sender: 'you', type: 'image', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'train window', hd: true, timestamp: '2:54 PM', status: 'read' },
      { id: 'm11', sender: 'you', type: 'text', content: 'Looks good! Checking out the link now.', timestamp: '2:55 PM', status: 'read'},
      { id: 'm12', sender: 'other', type: 'text', content: 'Great, let me know your thoughts on the project idea as well!', timestamp: '2:56 PM', status: 'read' },
      { id: 'm16', sender: 'you', type: 'voice_placeholder', content: '🎤 Voice Message - 0:08 (Simulated)', timestamp: '2:57 PM', status: 'read'},
    ],
  },
  chat2: {
    participant: { id: 'user3', name: 'Omm Bro', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'OB', statusText: 'Online', imageHint: 'person student' },
    messages: [
      { id: 'm4', sender: 'other', type: 'text', content: 'Hey, how are you?', timestamp: '3:00 PM', status: 'read' },
      { id: 'm5', sender: 'you', type: 'text', content: 'Doing great! You?', timestamp: '3:01 PM', status: 'delivered' },
      { id: 'm6', sender: 'other', type: 'text', content: 'Good too. Working on the new feature.', timestamp: '3:05 PM', status: 'read' },
      { id: 'm13', sender: 'you', type: 'text', content: 'Awesome! Need any help?', timestamp: '3:06 PM', status: 'delivered' },
      { id: 'm14', sender: 'other', type: 'text', content: 'Not right now, but thanks for asking! Maybe later this week.', timestamp: '3:07 PM', status: 'read'},
    ],
  },
  chat3: { participant: { id: 'user4', name: 'Ankit Dost', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'AD', statusText: 'Last seen 2:30 PM', imageHint: 'friends group' }, messages: [{id: 'm7', sender: 'other', type: 'text', content: 'Ok, will do.', timestamp: '2:28 PM', status: 'read' }] },
  chat4: { participant: { id: 'user5', name: 'Sunny', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'S', statusText: 'Offline', imageHint: 'boy redshirt' }, messages: [{id: 'm8', sender: 'other', type: 'text', content: 'Khel raha hai ki nahi? Waiting for you!', timestamp: '2:14 PM', status: 'delivered' }] },
  chat5: { participant: { id: 'user6', name: 'Anand', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'A', statusText: 'Online', imageHint: 'man glasses' }, messages: [{id: 'm9', sender: 'other', type: 'text', content: 'Bhukh lagal hai, chalo kuch khate hain.', timestamp: '1:01 PM', status: 'read' }] },
  chat6: { participant: { id: 'user7', name: 'Sri Lanka Project Team', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'SL', statusText: 'Active on project', imageHint: 'abstract icon' }, messages: [{id: 'm10', sender: 'other', type: 'text', content: "Don't worry about equity for now. Just focus on the MVP. We need a solid presentation by Friday.", timestamp: '12:16 PM', status: 'read' }] },
  chat7: { participant: { id: 'user8', name: 'New Applicant: Sarah', avatarUrl: 'https://placehold.co/40x40.png', avatarFallback: 'SA', statusText: 'Awaiting reply', imageHint: 'woman professional' }, messages: [{id: 'm15', sender: 'other', type: 'text', content: "Hi! I'm interested in the designer role for Project Phoenix. My portfolio is attached.", timestamp: 'Yesterday', status: 'delivered' }] },
};


export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const chatId = typeof params.chatId === 'string' ? params.chatId : null;
  const { toast } = useToast();
  
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (chatId && sampleChatsData[chatId]) {
      setChatData(sampleChatsData[chatId]);
      setMessages(sampleChatsData[chatId].messages);
    } else if (chatId) {
      setChatData(null); 
      setMessages([]);
    }
    setIsSearchVisible(false); // Reset search visibility on chat change
    setSearchTerm(''); // Reset search term on chat change
  }, [chatId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = (e?: FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() && !selectedImagePreview) return;

    let sentMessage: Message;

    if (selectedImagePreview) {
      sentMessage = {
        id: `msg-${Date.now()}`,
        sender: 'you',
        type: 'image',
        imageUrl: selectedImagePreview,
        imageHint: 'uploaded chat image', 
        hd: true, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
      setSelectedImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      sentMessage = {
        id: `msg-${Date.now()}`,
        sender: 'you',
        type: 'text',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
    }
    
    setMessages(prevMessages => [...prevMessages, sentMessage]);
    setNewMessage('');
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result as string);
        // Immediately send image
        const imageMessage: Message = {
            id: `msg-${Date.now()}-img`,
            sender: 'you',
            type: 'image',
            imageUrl: reader.result as string,
            imageHint: 'uploaded chat image',
            hd: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };
        setMessages(prevMessages => [...prevMessages, imageMessage]);
        setSelectedImagePreview(null); // Clear preview after adding to messages
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceMessageAction = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      toast({ title: "Recording voice (simulated)...", description: "Click the send icon again to 'send'." });
    } else {
      const voiceMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'you',
        type: 'voice_placeholder',
        content: '🎤 Voice Message - 0:07 (Simulated)', // Dynamic duration could be added
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
      setMessages(prevMessages => [...prevMessages, voiceMessage]);
      setIsRecordingVoice(false); // Reset to Mic icon
      toast({ title: "Voice message 'sent' (simulated)" });
    }
  };


  const handleClearChat = () => {
    setMessages([]);
    toast({ title: "Chat Cleared", description: "All messages in this chat have been removed (client-side)." });
  };

  const filteredMessages = messages.filter(msg => 
    !searchTerm || (msg.content && msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (authLoading) {
    return <div className="flex items-center justify-center h-screen bg-background text-foreground"><p>Loading chat...</p></div>;
  }
  if (!user && !authLoading) return null;

  if (!chatId || !chatData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Chat Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center">The chat you are looking for does not exist or is unavailable.</p>
        <Button asChild variant="outline">
          <Link href="/messages">Go to Messages</Link>
        </Button>
      </div>
    );
  }

  const { participant } = chatData;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center p-3 border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" onClick={() => router.push('/messages')} className="mr-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={participant.avatarUrl} alt={participant.name} data-ai-hint={participant.imageHint || 'profile avatar'} />
          <AvatarFallback>{participant.avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-foreground">{participant.name}</h2>
          <p className="text-xs text-muted-foreground">{participant.statusText}</p>
        </div>
         {isSearchVisible && (
          <div className="relative flex-1 max-w-xs mx-2">
            <SearchIconLucide className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-md bg-input focus:ring-primary focus:border-primary"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => { setIsSearchVisible(false); setSearchTerm('');}}>
                <XCircle className="h-4 w-4"/>
            </Button>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast({ title: "View Profile (Simulated)", description: `Viewing profile of ${participant.name}.`})}>
              <UserProfileIcon className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
             <DropdownMenuItem onSelect={() => setIsSearchVisible(!isSearchVisible)}>
              <SearchIconLucide className="mr-2 h-4 w-4" />
              {isSearchVisible ? "Hide Search" : "Search in Conversation"}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast({ title: "Mute Notifications (Simulated)", description: `Notifications for ${participant.name} toggled.` })}>
              <BellOff className="mr-2 h-4 w-4" />
              Mute Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Chat
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all messages in this chat (client-side). This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearChat} className={cn(buttonVariants({variant: "destructive"}))}>Clear Chat</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10" onSelect={() => toast({ variant: "destructive", title: "Block User (Simulated)", description: `${participant.name} has been blocked.`})}>
              <Ban className="mr-2 h-4 w-4" />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10" onSelect={() => toast({ variant: "destructive", title: "Report User (Simulated)", description: `${participant.name} has been reported.`})}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              Report User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ScrollArea className="flex-1 p-4 space-y-4" ref={scrollAreaRef}>
        {filteredMessages.map(msg => {
            let contentElement;
            if (msg.type === 'text' && msg.content) {
                contentElement = <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>;
            } else if (msg.type === 'link' && msg.content) {
                contentElement = <a href={msg.content} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all text-sm">{msg.content}</a>;
            } else if (msg.type === 'image' && msg.imageUrl) {
                contentElement = (
                <div className="relative my-1">
                    <Image src={msg.imageUrl} alt="Sent image" width={250} height={150} className="rounded-md object-cover max-h-60" data-ai-hint={msg.imageHint || "chat image"}/>
                    {msg.hd && <Badge variant="outline" className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 border-none rounded-sm">HD</Badge>}
                </div>
                );
            } else if (msg.type === 'project_share' && msg.projectDetails) {
                contentElement = (
                <div className={cn(
                    "p-2.5 rounded-md border my-1",
                    msg.sender === 'you' ? 'bg-primary/70 border-primary-foreground/30' : 'bg-input border-border'
                )}>
                    <p className="font-semibold text-sm mb-1 flex items-center">
                    <FolderOpen className="h-4 w-4 mr-1.5 flex-shrink-0" />
                    {msg.projectDetails.title}
                    </p>
                    <p className="text-xs line-clamp-2 mb-1.5 opacity-90">{msg.projectDetails.description}</p>
                    <p className="text-[11px] opacity-80">Category: <span className="font-medium">{msg.projectDetails.category}</span></p>
                    <p className="text-[11px] opacity-80">Tags: <span className="font-medium">{msg.projectDetails.tags}</span></p>
                    {msg.projectDetails.projectId && 
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1 text-current/80 hover:text-current" asChild>
                        <Link href={`/projects/${msg.projectDetails.projectId}`}>View Project</Link>
                    </Button>}
                    {msg.hd && <Badge variant="outline" className="mt-1.5 bg-black/60 text-white text-xs px-1.5 py-0.5 border-none rounded-sm">HD</Badge>}
                </div>
                );
            } else if (msg.type === 'voice_placeholder' && msg.content) {
                 contentElement = (
                    <div className={cn(
                        "flex items-center space-x-2 p-2 rounded-md",
                         msg.sender === 'you' ? "pr-3" : "pl-3" 
                    )}>
                        <PlayCircle className={cn("h-6 w-6 flex-shrink-0", msg.sender === 'you' ? "text-primary-foreground/90" : "text-foreground/90")} />
                        <p className="text-sm">{msg.content}</p>
                    </div>
                );
            } else {
                contentElement = <p className="text-sm text-muted-foreground italic">Unsupported message type</p>;
            }

            return (
            <div key={msg.id} className={cn("flex w-full", msg.sender === 'you' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                "max-w-[70%] p-2.5 rounded-lg shadow-md", 
                msg.type === 'image' && '!p-1', // Less padding for images
                msg.type === 'voice_placeholder' && '!p-1', // Less padding for voice
                msg.sender === 'you' ? 'bg-primary/90 text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'
                )}>
                {contentElement}
                <div className={cn("text-[11px] mt-1.5 flex items-center", msg.sender === 'you' ? 'justify-end text-primary-foreground/80' : 'text-muted-foreground/80')}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'you' && msg.status === 'read' && <CheckCheck className="ml-1 h-3.5 w-3.5 text-blue-400" />}
                    {msg.sender === 'you' && msg.status === 'delivered' && <CheckCheck className="ml-1 h-3.5 w-3.5" />}
                    {msg.sender === 'you' && msg.status === 'sent' && <Check className="ml-1 h-3.5 w-3.5" />}
                </div>
                </div>
            </div>
            );
        })}
         {searchTerm && filteredMessages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No messages match your search.</p>
        )}
      </ScrollArea>

      <footer className="p-3 border-t border-border bg-background sticky bottom-0">
        {selectedImagePreview && ( // This preview div might be redundant if images are sent immediately
          <div className="mb-2 p-2 border border-dashed rounded-md relative max-w-xs">
            <Image src={selectedImagePreview} alt="Preview" width={80} height={80} className="rounded object-contain"/>
            <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-6 w-6 text-destructive" onClick={() => {setSelectedImagePreview(null); if(fileInputRef.current) fileInputRef.current.value = "";}}>
              <XCircle className="h-4 w-4"/>
            </Button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" onClick={() => fileInputRef.current?.click()}>
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-full px-4 py-2.5 text-sm bg-input focus-visible:ring-primary"
            disabled={isRecordingVoice}
          />
          {newMessage.trim() && !isRecordingVoice ? (
             <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground w-9 h-9">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
             </Button>
          ) : (
            <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" onClick={handleVoiceMessageAction}>
              {isRecordingVoice ? <Send className="h-5 w-5 text-primary" /> : <Mic className="h-5 w-5" />}
              <span className="sr-only">{isRecordingVoice ? "Send Voice Message" : "Record voice message"}</span>
            </Button>
          )}
        </form>
      </footer>
    </div>
  );
}
