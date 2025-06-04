'use client';

import { useParams, useRouter } from 'next/navigation';
import ProfileDisplayCard from '@/components/profile-display-card';
import { sampleUserProfiles } from '@/lib/sample-data/users';
import type { UserProfile } from '@/context/AuthContext'; // Import UserProfile type
import { useEffect, useState } from 'react';
import { Loader2, AlertTriangle, UserCircle2, Eye, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = typeof params.userId === 'string' ? params.userId : null;
  const [profile, setProfile] = useState<UserProfile | null | undefined>(undefined); // undefined means loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      // Simulate fetching profile data
      const foundProfile = sampleUserProfiles[userId];
      // Add a small delay to simulate network latency
      setTimeout(() => {
        setProfile(foundProfile || null); // null if not found
        setIsLoading(false);
      }, 300);
    } else {
      setProfile(null); // No userId, so no profile
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col justify-center items-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md text-center shadow-xl rounded-xl">
          <CardHeader className="p-8 bg-card-foreground/5">
            <UserCircle2 className="mx-auto h-16 w-16 text-destructive mb-4" />
            <CardTitle className="text-3xl font-bold">User Not Found</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              The profile you are looking for does not exist or is unavailable.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Button asChild variant="outline">
              <Link href="/projects">Browse Projects</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <ProfileDisplayCard profile={profile} className="shadow-xl rounded-xl"/>
      {/* Placeholder for user's projects or activity feed if needed in the future */}
      <Card className="mt-8 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>{profile.name}'s Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Projects by this user will be listed here.</p>
          {/* Example project placeholder */}
          <div className="mt-4 p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Example Project Title</h3>
            <p className="text-sm text-muted-foreground mt-1">A brief description of the example project.</p>
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>Likes (0)</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>Views (0)</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>Comments (0)</span>
              </Button>
            </div>
          </div>
           {/* Another example project placeholder */}
           <div className="mt-4 p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Another Project</h3>
            <p className="text-sm text-muted-foreground mt-1">Details about another project.</p>
             <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1"><ThumbsUp className="h-4 w-4" /><span>Likes (0)</span></Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1"><Eye className="h-4 w-4" /><span>Views (0)</span></Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1"><MessageSquare className="h-4 w-4" /><span>Comments (0)</span></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
