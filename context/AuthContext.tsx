"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export interface UserProfile {
  uid: string
  name: string
  email?: string | null
  title?: string
  avatarUrl?: string
  avatarFallback?: string
  bio?: string
  skills?: string[]
  interests?: string[]
  linkedinUrl?: string
  githubUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  website?: string
  collaborationScore?: number
  reason?: string
}

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (name: string, email: string, password: string) => Promise<void>
  logIn: (email: string, password: string) => Promise<void>
  logInWithGoogle: () => Promise<void>
  logOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  updateUserProfile: (updatedData: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Mock user for demo purposes
  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = async () => {
      // For demo, we'll set a mock user
      const mockUser: User = {
        uid: "demo-user-123",
        email: "demo@startlinker.com",
        displayName: "Demo User",
      }

      const mockProfile: UserProfile = {
        uid: "demo-user-123",
        name: "Demo User",
        email: "demo@startlinker.com",
        title: "Entrepreneur",
        avatarFallback: "DU",
        bio: "Welcome to StartLinker! This is a demo account.",
        skills: ["React", "TypeScript", "Entrepreneurship"],
        interests: ["Startups", "Technology", "Innovation"],
      }

      setUser(mockUser)
      setUserProfile(mockProfile)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Mock signup
      const newUser: User = {
        uid: `user-${Date.now()}`,
        email,
        displayName: name,
      }

      const newProfile: UserProfile = {
        uid: newUser.uid,
        name,
        email,
        title: "StartLinker Member",
        avatarFallback: name.substring(0, 2).toUpperCase(),
        bio: "Welcome to StartLinker!",
        skills: [],
        interests: [],
      }

      setUser(newUser)
      setUserProfile(newProfile)

      toast({
        title: "Account Created",
        description: "Welcome to StartLinker!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please try again",
      })
    } finally {
      setLoading(false)
    }
  }

  const logIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock login
      const mockUser: User = {
        uid: "demo-user-123",
        email,
        displayName: "Demo User",
      }

      const mockProfile: UserProfile = {
        uid: "demo-user-123",
        name: "Demo User",
        email,
        title: "Entrepreneur",
        avatarFallback: "DU",
        bio: "Welcome back to StartLinker!",
        skills: ["React", "TypeScript", "Entrepreneurship"],
        interests: ["Startups", "Technology", "Innovation"],
      }

      setUser(mockUser)
      setUserProfile(mockProfile)

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials",
      })
    } finally {
      setLoading(false)
    }
  }

  const logInWithGoogle = async () => {
    setLoading(true)
    try {
      // Mock Google login
      const mockUser: User = {
        uid: "google-user-123",
        email: "google@startlinker.com",
        displayName: "Google User",
      }

      const mockProfile: UserProfile = {
        uid: "google-user-123",
        name: "Google User",
        email: "google@startlinker.com",
        title: "Entrepreneur",
        avatarFallback: "GU",
        bio: "Signed in with Google!",
        skills: [],
        interests: [],
      }

      setUser(mockUser)
      setUserProfile(mockProfile)

      toast({
        title: "Google Sign-In Successful",
        description: "Welcome to StartLinker!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: "Please try again",
      })
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    setLoading(true)
    try {
      setUser(null)
      setUserProfile(null)

      toast({
        title: "Logged Out",
        description: "See you soon!",
      })

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      toast({
        title: "Password Reset Email Sent",
        description: `If ${email} is registered, a reset link has been sent.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: "Please try again",
      })
    }
  }

  const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return

    try {
      setUserProfile((prev) => (prev ? { ...prev, ...updatedData } : null))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your profile.",
      })
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
    forgotPassword,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.warn("useAuth called outside of AuthProvider")
    const noop = async () => {}
    return {
      user: null,
      userProfile: null,
      loading: false,
      signUp: noop,
      logIn: noop,
      logInWithGoogle: noop,
      logOut: noop,
      forgotPassword: noop,
      updateUserProfile: noop,
    }
  }
  return context
}
