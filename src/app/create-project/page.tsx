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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, XCircle, PlusSquare, Users, Briefcase, Palette, BarChart3, Rocket, Zap, Globe, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

const projectCategories = [
  "Technology", "Healthcare", "E-commerce", "Education", "Gaming",
  "Sustainability", "Creative Arts", "Social Impact", "Finance", "Real Estate", "Other"
];

const projectVisibilities = [
  { value: "public", label: "Public - Anyone can see and apply" },
  { value: "private", label: "Private - Invite only" },
];

const startupStages = [
  "Idea Stage", "Building MVP", "MVP Stage", "Product Market Fit", 
  "Fundraising Stage", "Growth Stage", "Exit Stage"
];

const availableRoles = [
  { id: "developer", label: "Developer", icon: <Briefcase className="mr-2 h-4 w-4" /> },
  { id: "designer", label: "Designer", icon: <Palette className="mr-2 h-4 w-4" /> },
  { id: "marketer", label: "Marketer", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
  { id: "strategist", label: "Strategist", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "co_founder", label: "Co-founder", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "other", label: "Other", icon: <Briefcase className="mr-2 h-4 w-4" /> },
];

const projectFormSchema = z.object({
  projectTitle: z.string().min(5, {
    message: 'Project title must be at least 5 characters.',
  }).max(100, {
    message: 'Project title must not be longer than 100 characters.',
  }),
  projectDescription: z.string().min(20, {
    message: 'Project description must be at least 20 characters.',
  }).max(2000, {
    message: 'Project description must not be longer than 2000 characters.',
  }),
  projectTags: z.string().optional(),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  projectCategory: z.string({
    required_error: 'Please select a project category.',
  }),
  startupStage: z.string({
    required_error: 'Please select the current stage of your startup.',
  }),
  projectVisibility: z.string({
    required_error: 'Please select project visibility.',
  }),
  lookingFor: z.array(z.string()).optional().default([]),
  teamSize: z.coerce.number().int({ message: "Team size must be a whole number." }).positive({ message: "Team size must be positive." }).optional().or(z.literal('')),
  projectThumbnail: z.any().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const defaultValues: Partial<ProjectFormValues> = {
  projectTitle: '',
  projectDescription: '',
  projectTags: '',
  websiteUrl: '',
  projectCategory: '',
  startupStage: '',
  projectVisibility: 'public',
  lookingFor: [],
  teamSize: undefined,
};

export default function CreateProjectPage() {
  const router = useRouter();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFileName, setThumbnailFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProjectFormValues) {
    const projectDataToLog = {
      ...data,
      projectTags: data.projectTags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
      thumbnail: thumbnailFileName,
      teamSize: data.teamSize === '' ? undefined : data.teamSize, // Ensure empty string becomes undefined
    };

    toast({
      title: 'Project Creation Submitted (Simulated)',
      description: (
        <pre className="mt-2 w-full max-w-md rounded-md bg-card p-4 overflow-x-auto">
          <code className="text-card-foreground">{JSON.stringify(projectDataToLog, null, 2)}</code>
        </pre>
      ),
    });
    console.log('Simulated Project Data:', projectDataToLog);
    // router.push('/dashboard'); // Or wherever you want to redirect after creation
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('projectThumbnail', file);
    } else {
      setThumbnailPreview(null);
      setThumbnailFileName(null);
      form.setValue('projectThumbnail', null);
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setThumbnailFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.setValue('projectThumbnail', null);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col items-center min-h-screen">
      <Card className="w-full max-w-3xl shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/20 via-background to-background p-8">
          <div className="flex items-center space-x-4">
            <PlusSquare className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">Create a New Project</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-1">
                Launch your idea and find collaborators to build the future.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Project Details</h3>
            <p className="text-muted-foreground">Fill in the information below to get your project started.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground">Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EcoFriendly Drone Delivery System" {...field} className="text-base py-3 px-4"/>
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      Choose a catchy and descriptive title for your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project in detail. What problem does it solve? Who is it for? What makes it unique?"
                        className="min-h-[150px] text-base py-3 px-4"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription className="text-sm text-muted-foreground">
                      Provide a comprehensive overview of your startup idea.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-primary/80" /> Startup Website URL (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://yourstartup.com" {...field} className="text-base py-3 px-4"/>
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      If you have an existing website for your startup, add it here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground">Project Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI, Sustainability, SaaS, Mobile App" {...field} className="text-base py-3 px-4"/>
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      Add comma-separated tags to help others discover your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-foreground flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary/80" /> Team Size (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 3" 
                        {...field} 
                        onChange={event => field.onChange(event.target.value === '' ? '' : +event.target.value)} // Handle empty string for optional number
                        className="text-base py-3 px-4"
                        min="1"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      How many people are currently on your team, or desired team size?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                  control={form.control}
                  name="startupStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-foreground flex items-center"><Zap className="mr-2 h-5 w-5 text-primary/80" />Startup Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-3 px-4 h-auto">
                            <SelectValue placeholder="Select the current stage of your startup" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {startupStages.map((stage) => (
                            <SelectItem key={stage} value={stage} className="text-base">
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                       <FormDescription className="text-sm text-muted-foreground">
                        What phase is your startup currently in?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-foreground">Project Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-3 px-4 h-auto">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectCategories.map((category) => (
                            <SelectItem key={category} value={category} className="text-base">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-foreground">Project Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-3 px-4 h-auto">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectVisibilities.map((vis) => (
                            <SelectItem key={vis.value} value={vis.value} className="text-base">
                              {vis.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lookingFor"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-lg font-medium text-foreground">What are you looking for?</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Select the roles you need to fill for your project.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {availableRoles.map((role) => (
                        <FormField
                          key={role.id}
                          control={form.control}
                          name="lookingFor"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role.id}
                                className="flex flex-row items-center space-x-3 space-y-0 p-3 bg-card/50 border border-border rounded-md hover:bg-accent/10 transition-colors"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), role.id])
                                        : field.onChange(
                                            (field.value || []).filter(
                                              (value) => value !== role.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-foreground flex items-center cursor-pointer">
                                  {React.cloneElement(role.icon, { className: "mr-2 h-5 w-5 text-primary" })}
                                  {role.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="text-lg font-medium text-foreground">Project Thumbnail (Optional)</FormLabel>
                <FormControl>
                  <div className="mt-2 flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/70 transition-colors bg-card/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {thumbnailPreview ? (
                      <div className="relative group w-full max-w-xs">
                        <Image src={thumbnailPreview} alt="Thumbnail preview" width={400} height={210} className="rounded-md object-contain max-h-48 w-full" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-7 w-7 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); removeThumbnail(); }}
                          aria-label="Remove thumbnail"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                        {thumbnailFileName && <p className="text-xs text-muted-foreground mt-1 text-center truncate">{thumbnailFileName}</p>}
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-12 h-12 text-muted-foreground mb-3" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                        <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200 x 630 pixels</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/gif"
                      ref={fileInputRef}
                      onChange={handleThumbnailChange}
                      className="hidden"
                      id="projectThumbnail"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-sm text-muted-foreground">
                  A visual representation for your project.
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex justify-end gap-4 pt-6 border-t border-border">
                <Button type="button" variant="outline" size="lg" onClick={() => router.back()} className="text-base py-3 px-6">
                  Cancel
                </Button>
                <Button type="submit" size="lg" className="text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                   <Rocket className="mr-2 h-5 w-5" /> Create Project
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
