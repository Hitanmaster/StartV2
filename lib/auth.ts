// Mock authentication functions for demo purposes

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface UserProfile {
  id: string
  userId: string
  email: string
  name: string
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
  createdAt: string
  updatedAt: string
}

export async function hashPassword(password: string): Promise<string> {
  // Mock implementation
  return `hashed_${password}`
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // Mock implementation
  return hashedPassword === `hashed_${password}`
}

export function generateToken(userId: string): string {
  // Mock implementation
  return `token_${userId}_${Date.now()}`
}

export function verifyToken(token: string): { userId: string } | null {
  // Mock implementation
  if (token.startsWith("token_")) {
    const parts = token.split("_")
    return { userId: parts[1] || "demo-user" }
  }
  return null
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  // Mock implementation
  const user: User = {
    id: `user_${Date.now()}`,
    email: email.toLowerCase(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  }
  return user
}

export async function authenticateUser(email: string, password: string): Promise<User> {
  // Mock implementation
  const user: User = {
    id: "demo-user-123",
    email: email.toLowerCase(),
    name: "Demo User",
    createdAt: new Date().toISOString(),
  }
  return user
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // Mock implementation
  const profile: UserProfile = {
    id: "profile-123",
    userId,
    email: "demo@startlinker.com",
    name: "Demo User",
    title: "Entrepreneur",
    avatarFallback: "DU",
    bio: "Welcome to StartLinker!",
    skills: ["React", "TypeScript", "Entrepreneurship"],
    interests: ["Startups", "Technology", "Innovation"],
    linkedinUrl: "",
    githubUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return profile
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
  // Mock implementation
  const profile: UserProfile = {
    id: "profile-123",
    userId,
    email: "demo@startlinker.com",
    name: "Demo User",
    title: "Entrepreneur",
    avatarFallback: "DU",
    bio: "Welcome to StartLinker!",
    skills: ["React", "TypeScript", "Entrepreneurship"],
    interests: ["Startups", "Technology", "Innovation"],
    linkedinUrl: "",
    githubUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...updates,
  }
  return profile
}
