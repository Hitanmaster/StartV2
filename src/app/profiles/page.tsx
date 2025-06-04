'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Edit3, Loader2 } from "lucide-react";
import Image from "next/image";
import ProfileDisplayCard from "@/components/profile-display-card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


// Sample projects data - could be fetched or part of userProfile in a real app
const sampleUserProjects = [
    {
      name: "My First Startup Idea",
      description: "A revolutionary app for tracking personal carbon footprint.",
      imageUrl: "https://placehold.co/300x200.png",
      imageHint: "eco app interface"
    },
    {
      name: "Side Project: DevLinker Tool",
      description: "A utility to help developers find open-source projects.",
      imageUrl: "https://placehold.co/300x200.png",
      imageHint: "code editor"
    }
  ];


export default function ProfilesPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login'); 
    }
  }, [user, authLoading, router]);

  if (authLoading || !userProfile) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }
  
  // Use the userProfile from AuthContext
  const displayProfile = {
    ...userProfile, // Spread all properties from AuthContext's userProfile
    name: userProfile.name || 'Anonymous User', // Ensure name has a fallback
    // avatarFallback can be derived in ProfileDisplayCard if not set
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Profile</h1>
        <div className="flex items-center space-x-3">
            <Button variant="outline" size="lg" asChild className="text-base font-medium py-2.5 px-5">
                <Link href="/profiles/edit">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
            </Button>
            {/* Settings button removed as per request in previous step */}
        </div>
      </div>
      
      <ProfileDisplayCard profile={displayProfile} className="mb-8 shadow-xl rounded-xl"/>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card/50 p-6">
          <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
            <Briefcase className="mr-3 h-6 w-6 text-primary" />
            My Projects
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Showcasing your current and past startup ventures. (Feature in development)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {sampleUserProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleUserProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow rounded-lg border border-border">
                  {project.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                        <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={300}
                        height={169} // for 16:9 aspect ratio
                        className="w-full h-full object-cover"
                        data-ai-hint={project.imageHint}
                        />
                    </div>
                  )}
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-medium text-foreground">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">You haven't added any projects yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/create-project">Create Your First Project</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
