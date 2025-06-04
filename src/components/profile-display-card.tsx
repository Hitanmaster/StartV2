import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Briefcase, Lightbulb, Brain, Users, Mail, ExternalLink, UserCircle, Info as InfoIcon, Heart, Instagram, Twitter } from "lucide-react"; 
import Link from "next/link";

export interface Profile {
  uid?: string;
  email?: string | null;
  name: string;
  title?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  website?: string; 
  collaborationScore?: number; 
  reason?: string; 
}


interface ProfileDisplayCardProps {
  profile: Profile;
  className?: string;
}

export default function ProfileDisplayCard({ profile, className }: ProfileDisplayCardProps) {
  const fallback = profile.avatarFallback || profile.name?.substring(0, 2).toUpperCase() || <UserCircle className="h-full w-full"/>;
  
  return (
    <Card className={className ? className : "shadow-lg rounded-xl"}>
      <CardHeader className="bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8 rounded-t-xl">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            {profile.avatarUrl && <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="profile avatar" />}
            <AvatarFallback className="text-4xl bg-muted text-muted-foreground">{fallback}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground">{profile.name}</CardTitle>
            {profile.title && <CardDescription className="text-lg text-primary mt-1">{profile.title}</CardDescription>}
            {profile.email && <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center md:justify-start">
                <Mail className="mr-2 h-4 w-4" /> {profile.email}
            </p>}
            {profile.collaborationScore !== undefined && (
              <div className="mt-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Collaboration Score: {Math.round(profile.collaborationScore * 100)}%
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        {profile.bio && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
              <InfoIcon className="mr-2 h-5 w-5 text-primary" /> About Me
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap bg-card/50 p-4 rounded-md border border-border">{profile.bio}</p>
          </div>
        )}

        {profile.reason && (
           <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
                <Lightbulb className="mr-2 h-5 w-5 text-accent" /> Collaboration Insight (AI Generated)
            </h3>
            <p className="text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-md border border-secondary">{profile.reason}</p>
          </div>
        )}

        {profile.skills && profile.skills.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
              <Brain className="mr-2 h-5 w-5 text-primary" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1.5">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        {profile.interests && profile.interests.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
              <Heart className="mr-2 h-5 w-5 text-accent" /> Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-sm px-3 py-1.5 border-dashed">{interest}</Badge>
              ))}
            </div>
          </div>
        )}

        {(profile.linkedinUrl || profile.githubUrl || profile.instagramUrl || profile.twitterUrl || profile.website) && (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {profile.linkedinUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Link>
                </Button>
              )}
              {profile.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              )}
              {profile.instagramUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
                    <Instagram className="mr-2 h-4 w-4" /> Instagram
                  </Link>
                </Button>
              )}
              {profile.twitterUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-sm">
                    <Twitter className="mr-2 h-4 w-4" /> X (formerly Twitter)
                  </Link>
                </Button>
              )}
              {profile.website && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm">
                    <ExternalLink className="mr-2 h-4 w-4" /> Website
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
