'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, ListFilter, PlusCircle, FolderKanban, Search, Bookmark as BookmarkIcon } from "lucide-react";
import Link from "next/link";
import DashboardProjectCard, { type Project } from '@/components/dashboard-project-card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleAllProjects as allProjectsData } from '../projects/page'; // Import shared sample data
import { useToast } from '@/hooks/use-toast';

const BOOKMARKS_KEY = 'startlinker-bookmarks'; 

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [bookmarkedProjectIds, setBookmarkedProjectIds] = useState<string[]>([]);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        setUserProjects(allProjectsData.filter(p => p.isUserProject));
        if (typeof window !== 'undefined') {
          const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
          const ids = storedBookmarks ? JSON.parse(storedBookmarks) : [];
          setBookmarkedProjectIds(ids);
        }
        setTimeout(() => setPageLoading(false), 300); // Slightly reduced delay
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (bookmarkedProjectIds.length > 0 && allProjectsData.length > 0) {
      const filtered = allProjectsData.filter(p => bookmarkedProjectIds.includes(p.id));
      setBookmarkedProjects(filtered);
    } else {
      setBookmarkedProjects([]);
    }
  }, [bookmarkedProjectIds]);

  const handleBookmarkUpdate = (projectId: string, isBookmarked: boolean) => {
    let updatedIds;
    if (isBookmarked) {
        updatedIds = [...bookmarkedProjectIds, projectId];
    } else {
        updatedIds = bookmarkedProjectIds.filter(id => id !== projectId);
    }
    setBookmarkedProjectIds(updatedIds); 
    if (typeof window !== 'undefined') { 
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedIds));
    }
  };

  const handleDeleteUserProject = (projectId: string) => {
    const projectToDelete = userProjects.find(p => p.id === projectId);
    setUserProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    toast({
      title: "Project Deleted",
      description: `"${projectToDelete?.title || 'The project'}" has been removed from your projects.`,
    });
  };

  if (authLoading || pageLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Skeleton className="h-10 w-full md:flex-1 rounded-md" /> 
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-md" /> 
              <Skeleton className="h-10 w-10 rounded-md" /> 
            </div>
            <Skeleton className="h-10 w-full md:w-auto rounded-md" /> 
          </div>
          <Skeleton className="h-6 w-1/4 rounded-md mt-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="shadow-lg rounded-xl">
                <CardHeader className="p-0">
                  <Skeleton className="h-8 w-1/3 m-4 rounded-md" />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <div className="flex justify-between text-xs text-muted-foreground pt-2">
                    <Skeleton className="h-4 w-1/4 rounded" />
                    <Skeleton className="h-4 w-1/4 rounded" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <Skeleton className="h-4 w-1/3 rounded" />
                    <Skeleton className="h-4 w-1/4 rounded" />
                  </div>
                </CardContent>
                 <Skeleton className="h-10 rounded-b-xl" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const filteredUserProjects = userProjects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-10">
      {/* My Projects Section */}
      <section>
        <Card className="mb-8 shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary/20 via-background to-background p-6">
            <div className="flex items-center space-x-3">
              <FolderKanban className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold text-foreground">My Projects</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Manage your startup ventures and collaborations.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your projects..."
                className="w-full pl-10 pr-4 py-3 text-base rounded-md shadow-sm focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="flex items-center gap-2 md:ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="sr-only">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => console.log('Filter by Status clicked (placeholder)')}>Status</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Filter by Category clicked (placeholder)')}>Category</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Filter by Date clicked (placeholder)')}>Date Created</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <ListFilter className="h-5 w-5" />
                  <span className="sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => console.log('Sort by Date Posted clicked (placeholder)')}>Date Posted</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Sort by Title clicked (placeholder)')}>Title</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Sort by Team Size clicked (placeholder)')}>Team Size</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button size="lg" className="w-full md:w-auto text-base font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-shadow" asChild>
            <Link href="/create-project">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Project
            </Link>
          </Button>
        </div>

        {filteredUserProjects.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6 text-sm">{searchTerm ? `Found ${filteredUserProjects.length} project(s).` : `You have ${filteredUserProjects.length} project(s).`}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUserProjects.map((project) => (
                <DashboardProjectCard 
                  key={project.id} 
                  project={project} 
                  showMiniDashboard={true} 
                  onBookmarkToggle={handleBookmarkUpdate}
                  onDelete={handleDeleteUserProject} // Pass delete handler
                />
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12 shadow-lg rounded-xl">
            <CardContent className="pt-6">
              <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl mb-2">
                  {searchTerm ? "No projects match your search" : "No Projects Yet"}
              </CardTitle>
              <CardDescription className="mb-6">
                  {searchTerm ? "Try a different search term." : "You haven't created or joined any projects yet."}
              </CardDescription>
              <Button size="lg" asChild>
                <Link href="/create-project">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Your First Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Saved Projects Section */}
      <section>
         <Card className="mb-8 shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-accent/20 via-background to-background p-6">
            <div className="flex items-center space-x-3">
              <BookmarkIcon className="h-10 w-10 text-accent" />
              <div>
                <CardTitle className="text-3xl font-bold text-foreground">Saved Projects</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Projects you've bookmarked for later.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {bookmarkedProjects.length > 0 ? (
           <>
            <p className="text-muted-foreground mb-6 text-sm">{`You have ${bookmarkedProjects.length} saved project(s).`}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedProjects.map((project) => (
                <DashboardProjectCard 
                    key={project.id} 
                    project={project} 
                    showMiniDashboard={false} 
                    onBookmarkToggle={handleBookmarkUpdate} 
                />
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12 shadow-lg rounded-xl">
            <CardContent className="pt-6">
              <BookmarkIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl mb-2">No Saved Projects</CardTitle>
              <CardDescription className="mb-6">Browse projects and save the ones you're interested in!</CardDescription>
              <Button size="lg" asChild>
                <Link href="/projects">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Projects
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
