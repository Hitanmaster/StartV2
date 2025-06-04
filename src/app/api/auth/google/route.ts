import { type NextRequest, NextResponse } from "next/server"
import { createUser, generateToken, getUserProfile } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import type { User } from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { uid, email, name, photoURL } = body

    // Validate input
    if (!uid || !email || !name) {
      return NextResponse.json({ error: "Missing required Google user data" }, { status: 400 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      // User exists, generate token and return user data
      const token = generateToken(existingUser._id!.toString())
      const userProfile = await getUserProfile(existingUser._id!.toString())

      const response = NextResponse.json({
        success: true,
        user: {
          id: existingUser._id!.toString(),
          email: existingUser.email,
          name: existingUser.name,
          createdAt: existingUser.createdAt.toISOString(),
        },
        profile: userProfile,
        message: "Google sign-in successful",
      })

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return response
    } else {
      // Create new user with Google data
      const user = await createUser(email, "google-oauth", name)
      const token = generateToken(user.id)
      const userProfile = await getUserProfile(user.id)

      // Update profile with Google photo if available
      if (photoURL && userProfile) {
        await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `auth-token=${token}`,
          },
          body: JSON.stringify({
            avatarUrl: photoURL,
          }),
        })
      }

      const response = NextResponse.json({
        success: true,
        user,
        profile: userProfile,
        message: "Google account created successfully",
      })

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return response
    }
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Google authentication failed",
        success: false,
      },
      { status: 500 },
    )
  }
}
