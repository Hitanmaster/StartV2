'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ListFilter, PlusCircle, Globe, Briefcase } from "lucide-react";
import Link from "next/link";
import DashboardProjectCard, { type Project } from '@/components/dashboard-project-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data for all projects, including those not by the current user
export const sampleAllProjects: Project[] = [
  {
    id: 'proj-solstart',
    status: 'Building MVP',
    statusColor: 'destructive',
    title: 'Solstart',
    logoUrl: 'https://placehold.co/40x40.png',
    logoHint: 'abstract logo',
    description: 'Hey I need a tech developer partner for my startup please dm me, will share equity also 😊 We aim to launch before 7 june. Dm me on my telegram @priiincegupta or whatsapp me on 8674927930',
    category: 'Creativity',
    teamSize: 1,
    creator: 'Prince Gupta',
    creatorProfileUrl: '/profiles/prince-gupta',
    datePosted: 'May 20th',
    isUserProject: false,
    lookingFor: ["Developer", "Co-founder"],
    comments: [
      {id: 'c1-1', author: {name: 'Collaborator X', avatarFallback: 'CX', profileUrl: '/profiles/collaborator-x'}, text: 'Interesting idea! What tech stack?', timestamp: '2h ago'},
    ],
    likes: 42,
    views: 150,
  },
  {
    id: 'proj-ainaz',
    status: 'Idea Stage',
    statusColor: 'accent',
    title: 'ainaz',
    logoUrl: 'https://placehold.co/40x40.png',
    logoHint: 'fashion logo',
    description: 'i want to start a project on modest clothing abays with classy designs',
    category: 'Creativity',
    teamSize: 1,
    creator: 'Muzammil Abdulrazack',
    creatorProfileUrl: '/profiles/muzammil-abdulrazack',
    datePosted: 'May 20th',
    isUserProject: false,
    lookingFor: ["Designer", "Marketer"],
    comments: [
      {id: 'c2-1', author: {name: 'Fashionista', avatarFallback: 'F', profileUrl: '/profiles/fashionista'}, text: 'Love this concept!', timestamp: '5h ago'},
    ],
    likes: 78,
    views: 220,
  },
  {
    id: 'proj-iflux',
    status: 'Building MVP',
    statusColor: 'destructive',
    title: 'iFlux flight',
    logoUrl: 'https://placehold.co/40x40.png',
    logoHint: 'rocket icon',
    description: 'FluxFlight is my concept for an AI-powered flying car - not just a vehicle that flies, but a smart, next-generation solution for personal air mobility. Instead of using traditional propellers, it relies on...',
    category: 'Artificial Intelligence',
    teamSize: 2,
    creator: 'AKSHAY Crln',
    creatorProfileUrl: '/profiles/akshay-crln',
    datePosted: 'May 20th',
    isUserProject: false,
    lookingFor: ["AI Engineer", "Aerospace Designer", "Software Developer"],
    likes: 105,
    views: 300,
  },
  {
    id: 'proj-gloria',
    status: 'Idea Stage',
    statusColor: 'accent',
    title: 'GLOXA',
    logoUrl: 'https://placehold.co/100x40.png',
    logoHint: 'gaming logo',
    description: 'Launching new gaming with leaderboard, chatting, private message, video calling features.',
    category: 'Gaming',
    teamSize: 4,
    creator: 'Ujwal Anand',
    creatorProfileUrl: '/profiles/ujwal-anand',
    datePosted: 'May 20th',
    isUserProject: true,
    lookingFor: ["Game Developer", "UI/UX Designer", "Backend Engineer"],
    comments: [
      {id: 'c4-1', author: {name: 'GamerPro', avatarFallback: 'GP', profileUrl: '/profiles/gamer-pro'}, text: 'Sounds epic!', timestamp: '1d ago'},
      {id: 'c4-2', author: {name: 'Investor123', avatarFallback: 'I2', profileUrl: '/profiles/investor-123'}, text: 'DM me your pitch deck.', timestamp: '20h ago'},
    ],
    likes: 150,
    views: 500,
  },
   {
    id: 'proj-ecoharvest',
    status: 'Seeking Co-founder',
    statusColor: 'primary',
    title: 'EcoHarvest Connect',
    logoUrl: 'https://placehold.co/40x40.png',
    logoHint: 'leaf icon',
    description: 'A platform to connect local farmers directly with consumers and businesses, promoting sustainable agriculture and reducing food waste. Looking for a marketing co-founder.',
    category: 'Sustainability',
    teamSize: 1,
    creator: 'Aisha Khan',
    creatorProfileUrl: '/profiles/aisha-khan',
    datePosted: 'May 18th',
    isUserProject: false,
    lookingFor: ["Marketing Co-founder", "Strategist"],
    likes: 95,
    views: 280,
  },
  {
    id: 'proj-devlink',
    status: 'Launched',
    statusColor: 'secondary',
    title: 'DevLink Pro',
    logoUrl: 'https://placehold.co/40x40.png',
    logoHint: 'code brackets',
    description: 'A premium networking tool for developers, featuring advanced profile building, project showcases, and skill endorsement. Already live, looking for feedback.',
    category: 'Developer Tools',
    teamSize: 3,
    creator: 'John Doe',
    creatorProfileUrl: '/profiles/john-doe',
    datePosted: 'April 25th',
    isUserProject: true,
    lookingFor: ["Community Manager", "DevRel"],
    comments: [
      {id: 'c6-1', author: {name: 'CodeNinja', avatarFallback: 'CN', profileUrl: '/profiles/codeninja'}, text: 'Great tool, using it daily!', timestamp: '3d ago'},
    ],
    likes: 210,
    views: 1000,
  }
];


export default function BrowseProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const filteredProjects = sampleAllProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.lookingFor && project.lookingFor.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())))
  );


  if (loading) {
    return (
       <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-10 w-1/3 rounded-md" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Skeleton className="h-10 w-full md:flex-1 rounded-md" /> {/* Search bar */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-md" /> {/* Filter icon */}
              <Skeleton className="h-10 w-10 rounded-md" /> {/* Sort icon */}
            </div>
            <Skeleton className="h-10 w-full md:w-auto rounded-md" /> {/* Create Project button */}
          </div>
          <Skeleton className="h-6 w-1/4 rounded-md" /> {/* project count text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
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


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="mb-8 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/20 via-background to-background p-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">Browse All Projects</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Discover innovative startups and collaboration opportunities in the community.
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
            placeholder="Search all projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-24 py-3 text-base rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
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
                <DropdownMenuItem onSelect={() => console.log('Filter by Category clicked (placeholder)')}>Category</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Filter by Tags clicked (placeholder)')}>Tags</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Filter by Team Size clicked (placeholder)')}>Team Size</DropdownMenuItem>
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
                <DropdownMenuItem onSelect={() => console.log('Sort by Newest clicked (placeholder)')}>Newest</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Sort by Most Popular clicked (placeholder)')}>Most Popular</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Sort by Team Size Needed clicked (placeholder)')}>Team Size Needed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
         <Button size="lg" className="w-full md:w-auto text-base font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-shadow" asChild>
            <Link href="/create-project">
              <PlusCircle className="mr-2 h-5 w-5" />
              Start a Project
            </Link>
          </Button>
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <p className="text-muted-foreground mb-6 text-sm">{searchTerm ? `Found ${filteredProjects.length} project(s).` : `Displaying ${filteredProjects.length} projects.`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <DashboardProjectCard key={project.id} project={project} showMiniDashboard={false} />
            ))}
          </div>
        </>
      ) : (
        <Card className="text-center py-12 shadow-lg rounded-xl">
          <CardContent className="pt-6">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-2xl mb-2">{searchTerm ? "No projects match your search" : "No Projects Listed Yet"}</CardTitle>
            <CardDescription className="mb-6">{searchTerm ? "Try a different search term." : "The community hasn't listed any projects yet. Be the first!"}</CardDescription>
            <Button size="lg" asChild>
              <Link href="/create-project">
                <PlusCircle className="mr-2 h-5 w-5" />
                List Your Project
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
