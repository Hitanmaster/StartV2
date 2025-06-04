"use client"

import Link from "next/link"
import { Inter } from "next/font/google"
import type React from "react"
import { useEffect, useState } from "react"
import {
  UserCircle,
  Menu,
  Newspaper,
  LayoutDashboard,
  FolderSearch,
  LogOut,
  Bell,
  Info,
  LifeBuoy,
  Mail,
} from "lucide-react"
import { usePathname, useRouter as useNextRouterHook } from "next/navigation"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import Logo from "../components/icons/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

interface NotificationItem {
  id: string
  type: "comment" | "friend_request" | "application"
  title: string
  timestamp: string
  applicantName?: string
  applicantAvatarUrl?: string
  applicantAvatarFallback?: string
  applicantHandle?: string
  applicantProfileUrl?: string
  roleAppliedFor?: string
  projectName?: string
  applicationMessage?: string
  isRead?: boolean
}

const sampleNotifications: NotificationItem[] = [
  {
    id: "notif1",
    type: "application",
    title: "New application for Project Solstart",
    timestamp: "2h ago",
    applicantName: "Abinash Das",
    applicantAvatarUrl: "https://placehold.co/40x40.png",
    applicantAvatarFallback: "AD",
    applicantHandle: "@Abinash._.das",
    applicantProfileUrl: "/profiles/abinash-das",
    roleAppliedFor: "Developer",
    projectName: "Solstart",
    applicationMessage:
      "I am very interested in this project and have 5 years of experience in the required tech stack. My portfolio showcases similar projects.",
    isRead: false,
  },
  {
    id: "notif3",
    type: "friend_request",
    title: "You got 2 new friend request",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "notif4",
    type: "comment",
    title: 'New comment on your "EcoLearn" project idea.',
    timestamp: "3 days ago",
    isRead: true,
  },
]

function AppMainContent({ children }: { children: React.ReactNode }) {
  const { user, userProfile, logOut, loading } = useAuth()
  const pathname = usePathname()
  const router = useNextRouterHook()
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = async () => {
    if (logOut) {
      try {
        await logOut()
        router.push("/")
      } catch (error) {
        console.error("Logout failed:", error)
      }
    }
  }

  const handleApplicationAction = (action: "Accepted" | "Declined" | "Asked for more info", applicantName: string) => {
    toast({
      title: `Application ${action} (Simulated)`,
      description: `Action taken for ${applicantName}.`,
    })
  }

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between gap-4 border-b border-border/60 bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-xl md:text-2xl font-bold text-gradient-brand">StartLinker</h1>
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <div className="text-foreground">Loading application...</div>
        </main>
        <Footer />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between gap-4 border-b border-border/60 bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Logo className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-xl md:text-2xl font-bold text-gradient-brand">StartLinker</h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex gap-3 lg:gap-4 items-center">
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
            >
              About
            </Link>
            <Link
              href="/support"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === "/support" ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
            >
              Support
            </Link>
            {user && (
              <>
                <Link
                  href="/newsfeed"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === "/newsfeed" ? "text-primary" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  Newsfeed
                </Link>
                <Link
                  href="/projects"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === "/projects" ? "text-primary" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  Browse Projects
                </Link>
              </>
            )}
          </nav>

          {user ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-[calc(100vw-2rem)] max-w-md sm:w-96 p-0 border-border shadow-2xl rounded-xl"
                >
                  <div className="p-4 font-medium border-b border-border text-foreground">Notifications</div>
                  {sampleNotifications.length > 0 ? (
                    <ScrollArea className="h-[400px]">
                      <Accordion type="single" collapsible className="w-full">
                        {sampleNotifications.map((notif) => (
                          <AccordionItem value={notif.id} key={notif.id} className="border-b-0 last:border-b-0">
                            <AccordionTrigger
                              className={cn(
                                "px-4 py-3 text-sm hover:bg-accent/50 hover:no-underline rounded-md",
                                !notif.isRead && "font-semibold",
                              )}
                            >
                              <div className="flex items-center gap-3 w-full">
                                {!notif.isRead && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"></div>
                                )}
                                <span
                                  className={cn(
                                    "flex-1 text-left truncate min-w-0",
                                    !notif.isRead ? "text-foreground" : "text-muted-foreground",
                                  )}
                                >
                                  {notif.title}
                                </span>
                                <span className="text-xs text-muted-foreground flex-shrink-0 ml-auto">
                                  {notif.timestamp}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-1 bg-background/30">
                              {notif.type === "application" && notif.applicantName ? (
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    {notif.applicantProfileUrl ? (
                                      <Link href={notif.applicantProfileUrl}>
                                        <Avatar className="h-10 w-10 mt-1 cursor-pointer">
                                          {notif.applicantAvatarUrl && (
                                            <AvatarImage
                                              src={notif.applicantAvatarUrl || "/placeholder.svg"}
                                              alt={notif.applicantName}
                                              data-ai-hint="applicant avatar"
                                            />
                                          )}
                                          <AvatarFallback>{notif.applicantAvatarFallback}</AvatarFallback>
                                        </Avatar>
                                      </Link>
                                    ) : (
                                      <Avatar className="h-10 w-10 mt-1">
                                        {notif.applicantAvatarUrl && (
                                          <AvatarImage
                                            src={notif.applicantAvatarUrl || "/placeholder.svg"}
                                            alt={notif.applicantName}
                                            data-ai-hint="applicant avatar"
                                          />
                                        )}
                                        <AvatarFallback>{notif.applicantAvatarFallback}</AvatarFallback>
                                      </Avatar>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-foreground truncate">
                                        {notif.applicantProfileUrl ? (
                                          <Link href={notif.applicantProfileUrl} className="hover:underline">
                                            {notif.applicantName}
                                          </Link>
                                        ) : (
                                          notif.applicantName
                                        )}
                                        {notif.applicantHandle && (
                                          <span className="text-xs text-muted-foreground truncate ml-1">
                                            {notif.applicantHandle}
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        applied for role:{" "}
                                        <span className="font-medium text-foreground">{notif.roleAppliedFor}</span> on{" "}
                                        <span className="font-medium text-foreground">{notif.projectName}</span>
                                      </p>
                                    </div>
                                  </div>
                                  {notif.applicationMessage && (
                                    <div>
                                      <p className="text-sm font-medium text-foreground mb-1">Message:</p>
                                      <p className="text-xs text-muted-foreground bg-card p-2 rounded-md whitespace-pre-wrap break-words">
                                        {notif.applicationMessage}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex flex-wrap justify-end gap-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                                      onClick={() =>
                                        handleApplicationAction("Declined", notif.applicantName || "Applicant")
                                      }
                                    >
                                      DECLINE
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                      onClick={() =>
                                        handleApplicationAction(
                                          "Asked for more info",
                                          notif.applicantName || "Applicant",
                                        )
                                      }
                                    >
                                      ASK MORE
                                    </Button>
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() =>
                                        handleApplicationAction("Accepted", notif.applicantName || "Applicant")
                                      }
                                    >
                                      ACCEPT
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  {notif.title} - Details for this notification will appear here.
                                </p>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground text-center">No new notifications.</div>
                  )}
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                      {userProfile?.avatarUrl && (
                        <AvatarImage
                          src={userProfile.avatarUrl || "/placeholder.svg"}
                          alt={userProfile.name || "User"}
                          data-ai-hint="user avatar"
                        />
                      )}
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {userProfile?.avatarFallback || userProfile?.name?.substring(0, 2)?.toUpperCase() || (
                          <UserCircle className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {userProfile?.name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{userProfile?.title || user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center w-full cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profiles" className="flex items-center w-full cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="flex items-center w-full cursor-pointer">
                      <Mail className="mr-2 h-4 w-4" /> Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/projects" className="flex items-center w-full cursor-pointer">
                      <FolderSearch className="mr-2 h-4 w-4" /> Browse Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center w-full cursor-pointer text-destructive hover:!text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              asChild
              className="relative group overflow-hidden rounded-full bg-gradient-brand-button text-primary-foreground px-4 py-1.5 text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100"
            >
              <Link href="/login" className="relative z-10 flex items-center justify-center w-full h-full">
                Let&apos;s Go
              </Link>
            </Button>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-background p-4">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/about"
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-colors",
                      pathname === "/about" ? "text-primary" : "text-foreground hover:text-primary",
                    )}
                  >
                    <Info className="h-5 w-5" /> About
                  </Link>
                  <Link
                    href="/support"
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-colors",
                      pathname === "/support" ? "text-primary" : "text-foreground hover:text-primary",
                    )}
                  >
                    <LifeBuoy className="h-5 w-5" /> Support
                  </Link>
                  <Separator className="my-2 bg-border/60" />
                  {user ? (
                    <>
                      <Link
                        href="/newsfeed"
                        className={cn(
                          "flex items-center gap-2 text-lg font-medium transition-colors",
                          pathname === "/newsfeed" ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <Newspaper className="h-5 w-5" /> Newsfeed
                      </Link>
                      <Link
                        href="/projects"
                        className={cn(
                          "flex items-center gap-2 text-lg font-medium transition-colors",
                          pathname === "/projects" ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <FolderSearch className="h-5 w-5" /> Browse Projects
                      </Link>
                      <Separator className="my-2 bg-border/60" />
                      <Link
                        href="/dashboard"
                        className={cn(
                          "flex items-center gap-2 text-lg font-medium transition-colors",
                          pathname === "/dashboard" ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                      </Link>
                      <Link
                        href="/profiles"
                        className={cn(
                          "flex items-center gap-2 text-lg font-medium transition-colors",
                          pathname === "/profiles" ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <UserCircle className="h-5 w-5" /> My Profile
                      </Link>
                      <Link
                        href="/messages"
                        className={cn(
                          "flex items-center gap-2 text-lg font-medium transition-colors",
                          pathname === "/messages" ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <Mail className="h-5 w-5" /> Messages
                      </Link>
                      <Separator className="my-2 bg-border/60" />
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-lg font-medium text-destructive hover:!text-destructive-foreground justify-start p-0 h-auto"
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      variant="default"
                      className="relative group rounded-full bg-gradient-brand-button text-primary-foreground w-full mt-4 px-4 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 ease-in-out"
                    >
                      <Link href="/login" className="flex items-center justify-center w-full h-full">
                        Let&apos;s Go
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background flex flex-col">{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(inter.variable, "antialiased font-sans bg-background text-foreground min-h-screen flex flex-col")}
      >
        <AuthProvider>
          <AppMainContent>{children}</AppMainContent>
        </AuthProvider>
      </body>
    </html>
  )
}
