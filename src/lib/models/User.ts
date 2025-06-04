import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string // This will be hashed
  name: string
  createdAt: Date
  updatedAt: Date
  emailVerified?: boolean
  provider?: "email" | "google"
  providerId?: string
}

export interface UserProfile {
  _id?: ObjectId
  userId: ObjectId | string
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
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  _id?: ObjectId
  userId: ObjectId | string
  email: string
  name: string
  createdAt: Date
  expiresAt: Date
}

// Client-side user type (without sensitive data)
export interface ClientUser {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface ClientUserProfile {
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
