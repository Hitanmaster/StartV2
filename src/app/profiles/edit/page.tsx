'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { Loader2, Save, X, UserCircle, Briefcase, Info as InfoIcon, Brain, Heart, Linkedin, Github, Instagram, Twitter, UploadCloud } from 'lucide-react';
import Image from 'next/image';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).max(50, {
    message: 'Name must not be longer than 50 characters.',
  }),
  title: z.string().max(100, { message: 'Title must not be longer than 100 characters.'}).optional().or(z.literal('')),
  bio: z.string().max(500, { message: 'Bio must not be longer than 500 characters.'}).optional().or(z.literal('')),
  skills: z.string().optional().or(z.literal('')), 
  interests: z.string().optional().or(z.literal('')), 
  linkedinUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  githubUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  instagramUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  twitterUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  // avatarUrl will be handled separately, not part of Zod schema for direct form input
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { user, userProfile, updateUserProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      skills: '',
      interests: '',
      linkedinUrl: '',
      githubUrl: '',
      instagramUrl: '',
      twitterUrl: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        title: userProfile.title || '',
        bio: userProfile.bio || '',
        skills: userProfile.skills?.join(', ') || '',
        interests: userProfile.interests?.join(', ') || '',
        linkedinUrl: userProfile.linkedinUrl || '',
        githubUrl: userProfile.githubUrl || '',
        instagramUrl: userProfile.instagramUrl || '',
        twitterUrl: userProfile.twitterUrl || '',
      });
      setNewAvatarPreview(userProfile.avatarUrl || null);
    }
  }, [userProfile, form]);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatarPreview = () => {
    setNewAvatarPreview(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: ProfileFormValues) {
    if (!user) { 
        toast({ variant: "destructive", title: "Error", description: "User not authenticated." });
        return;
    }
    setIsSubmitting(true);

    const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];
    const interestsArray = data.interests ? data.interests.split(',').map(interest => interest.trim()).filter(interest => interest) : [];

    const updatedProfileData: Partial<UserProfile> = {
      ...data, 
      skills: skillsArray,
      interests: interestsArray,
    };
    
    if (newAvatarPreview !== userProfile?.avatarUrl) { 
       updatedProfileData.avatarUrl = newAvatarPreview || ""; 
    }
    
    try {
      await updateUserProfile(updatedProfileData);
      router.push('/profiles');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading && !userProfile) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !authLoading) {
     router.push('/login');
     return null;
  }


  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col items-center min-h-screen">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/20 via-background to-background p-8">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">Edit Your Profile</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-1">
                Keep your information up-to-date.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormItem>
                <FormLabel className="text-lg font-medium text-foreground flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary/80" />Profile Picture</FormLabel>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={newAvatarPreview || userProfile?.avatarUrl || undefined} alt={userProfile?.name || "User"} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {userProfile?.name?.substring(0,2).toUpperCase() || <UserCircle className="h-full w-full" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <UploadCloud className="mr-2 h-4 w-4" /> Change Picture
                    </Button>
                    {(newAvatarPreview || userProfile?.avatarUrl) && (
                      <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={removeAvatarPreview}>
                        Remove Current Picture
                      </Button>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <FormDescription className="text-sm text-muted-foreground mt-1">
                  Upload a new profile picture. JPG, PNG, GIF.
                </FormDescription>
              </FormItem>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary/80" />Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alex Johnson" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary/80" />Title/Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Full-Stack Developer | Aspiring Entrepreneur" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><InfoIcon className="mr-2 h-5 w-5 text-primary/80" />Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a bit about yourself, your passions, and what you're looking for..."
                        className="min-h-[120px] text-base py-3 px-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Brain className="mr-2 h-5 w-5 text-primary/80" />Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, Node.js, Python, AWS" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      Enter your skills, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Heart className="mr-2 h-5 w-5 text-primary/80" />Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI Ethics, Sustainable Tech, Space Exploration" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                     <FormDescription className="text-sm text-muted-foreground">
                      Enter your interests, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Linkedin className="mr-2 h-5 w-5 text-primary/80" />LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://linkedin.com/in/yourprofile" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Github className="mr-2 h-5 w-5 text-primary/80" />GitHub Profile URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://github.com/yourusername" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="instagramUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Instagram className="mr-2 h-5 w-5 text-primary/80" />Instagram Profile URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://instagram.com/yourusername" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="twitterUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center"><Twitter className="mr-2 h-5 w-5 text-primary/80" />X (formerly Twitter) Profile URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://x.com/yourusername" {...field} className="text-base py-3 px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-6 border-t border-border">
                <Button type="button" variant="outline" size="lg" onClick={() => router.push('/profiles')} className="text-base py-3 px-6" disabled={isSubmitting}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button type="submit" size="lg" className="text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting || authLoading}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
