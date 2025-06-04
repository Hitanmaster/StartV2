'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, Lightbulb, Code2, Globe2 as Earth, Zap, ArrowRight, Star, Rocket } from "lucide-react"; // Renamed Globe2 to Earth to avoid conflict
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation"; 
import { useState, useEffect, type ElementType, type ReactNode } from "react"; 
import MicrosoftLogo from "@/components/icons/microsoft-logo";
import LinkedinLogo from "@/components/icons/linkedin-logo"; 
import TelegramLogo from "@/components/icons/telegram-logo";
import YoutubeLogo from "@/components/icons/youtube-logo"; 
// IbmLogo is no longer used
// import IbmLogo from "@/components/icons/ibm-logo";


const trendingProjects = [
  { id: "1", name: "AI Content Creation", href: "/projects/ai-content" },
  { id: "2", name: "Sustainable Marketplace", href: "/projects/sustainable-marketplace" },
  { id: "3", name: "Remote Team Tools", href: "/projects/remote-tools" },
];

const featureItems = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Find Co-Founders",
    description: "Connect with talented individuals who complement your skills and share your vision.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Validate Ideas",
    description: "Test your ideas with our community of entrepreneurs, investors, and early adopters.",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Build MVPs",
    description: "Collaborate on product development using our integrated planning and tracking tools.",
  },
  {
    icon: <Earth className="h-6 w-6" />, // Using the renamed import
    title: "Launch Globally",
    description: "Take your startup to the next level with resources for global reach and scalability.",
  },
];

const successStories = [
  {
    quote: "StartLinker helped us find the perfect technical co-founder within weeks. Our startup just closed a seed round!",
    name: "Sarah Johnson",
    title: "Founder, HealthTech Solutions",
    avatarUrl: "https://placehold.co/64x64.png",
    avatarFallback: "SJ",
    avatarHint: "woman portrait",
  },
  {
    quote: "The community feedback on our MVP was invaluable. We completely pivoted our approach and found product-market fit.",
    name: "Michael Chen",
    title: "CTO, DataViz App",
    avatarUrl: "https://placehold.co/64x64.png",
    avatarFallback: "MC",
    avatarHint: "man portrait",
  },
  {
    quote: "As a solo founder, StartLinker connected me with like-minded individuals who shared my vision. Now we're a team of 5.",
    name: "Elena Rodriguez",
    title: "CEO, EcoTech Innovations",
    avatarUrl: "https://placehold.co/64x64.png",
    avatarFallback: "ER",
    avatarHint: "woman profile",
  },
];

interface CompanyLogo {
  name: string;
  src?: string;
  alt?: string;
  hint?: string; 
  component?: ElementType | { default: ElementType }; 
  width: number; 
  height: number;
}


const companyLogos: CompanyLogo[] = [
  { name: "LinkedIn", component: LinkedinLogo, width: 40, height: 40 },
  { name: "YouTube", component: YoutubeLogo, width: 56, height: 40 }, 
  { name: "Microsoft", component: MicrosoftLogo, width: 40, height: 40 },
  { name: "Telegram", component: TelegramLogo, width: 40, height: 40 },
];

export default function HomePage() { 
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isMounted && !loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router, isMounted]);

  if (!isMounted || loading) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground text-xl">Loading application...</div>
      </div>
    );
  }

  if (user) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground text-xl">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-hero-animated">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight animate-fadeInSlideUp">
            Collaborate, Build,
            <br className="hidden md:block" /> and Launch Your Startup
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fadeInSlideUp delay-300">
            StartLinker is your launchpad for turning visionary ideas into reality. We provide a dynamic ecosystem where entrepreneurs, developers, designers, and strategists connect, collaborate on projects, find co-founders, and access the resources needed to build and scale successful startups. Whether you have a groundbreaking concept or are looking to contribute your skills to an exciting venture, StartLinker empowers you to link up, innovate, and thrive in the competitive startup landscape.
          </p>
          <div className="flex justify-center animate-fadeInSlideUp delay-500">
             <Button
              asChild
              className="relative group overflow-hidden rounded-md bg-gradient-brand-button text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100"
            >
              <Link href="/projects" className="relative z-10 flex items-center justify-center w-full h-full">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose StartLinker Section */}
      <section className="py-16 md:py-24 bg-card/50 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Why Choose StartLinker?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            StartLinker is more than just a platform; it&apos;s a vibrant community dedicated to fostering innovation and collaboration. We bridge the gap between brilliant ideas and the talent needed to bring them to life. Our unique matchmaking capabilities (coming soon!) will help you find the perfect co-founders and team members, while our project management tools streamline development. Get valuable feedback on your ideas, access mentorship opportunities, and launch your startup with confidence. Join us and be part of the next wave of innovation!
          </p>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl text-muted-foreground mb-8">
            Trusted by entrepreneurs from
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {companyLogos.map((logoItem) => {
              let ActualComponent: ElementType | undefined = undefined;
              if (logoItem.component) {
                if (typeof logoItem.component === 'object' && (logoItem.component as any).default) {
                  ActualComponent = (logoItem.component as any).default;
                } else {
                  ActualComponent = logoItem.component as ElementType;
                }
              }

              return (
                <div key={logoItem.name} className="opacity-75 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ height: `${logoItem.height}px` }}>
                  {ActualComponent && typeof ActualComponent === 'function' ? (
                    <ActualComponent className="h-full w-auto" style={{ width: `${logoItem.width}px` }} />
                  ) : logoItem.src ? ( 
                    <Image
                      src={logoItem.src}
                      alt={logoItem.alt || logoItem.name}
                      width={logoItem.width}
                      height={logoItem.height}
                      className="object-contain"
                      data-ai-hint={logoItem.hint}
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Logo: {logoItem.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Projects Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center p-3 mb-6 rounded-md bg-card border border-border shadow">
            <Search className="h-5 w-5 mr-3 text-muted-foreground" />
            <span className="text-muted-foreground">Discover trending projects</span>
          </div>
          <ul className="space-y-3">
            {trendingProjects.map((project) => (
              <li key={project.id}>
                <Link href={project.href} className="block">
                  <div className="flex items-center py-3 px-4 bg-card rounded-md shadow-sm hover:bg-card/80 transition-colors cursor-pointer border border-transparent hover:border-primary/50">
                    <span className="h-2.5 w-2.5 bg-primary rounded-full mr-4 shrink-0"></span>
                    <span className="text-foreground">{project.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-16 md:py-24 text-center bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything You Need To Build Your Startup
          </h2>
          <p className="text-lg text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto">
            Our platform brings together founders, developers, designers, and mentors to help turn your idea into reality.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {featureItems.map((item, index) => (
              <Card key={index} className="bg-card text-left p-6 rounded-lg shadow-md hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/20 text-primary mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-4">
                <Star className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Hear from founders who found success through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <blockquote className="text-lg text-foreground italic mb-6 border-l-4 border-primary pl-4 flex-grow">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center mt-auto pt-4 border-t border-border/50">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={story.avatarUrl} alt={story.name} data-ai-hint={story.avatarHint} />
                      <AvatarFallback>{story.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Launch CTA Section */}
      <section className="py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the community of entrepreneurs who are turning their ideas into reality with STARTLINKER&apos;s powerful platform.
          </p>
          <Button 
            asChild
            className="relative group overflow-hidden rounded-md bg-gradient-brand-button text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100"
          >
            <Link href="/signup" className="relative z-10 flex items-center justify-center w-full h-full">
              <Rocket className="mr-2 h-5 w-5" />
              Start Your Journey
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
