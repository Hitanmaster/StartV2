import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getUserProfile } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import type { User } from "@/lib/models/User"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user from database
    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    let userId: ObjectId
    try {
      userId = new ObjectId(decoded.userId)
    } catch {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 401 })
    }

    const user = await usersCollection.findOne({ _id: userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user profile
    const profile = await getUserProfile(decoded.userId)

    return NextResponse.json({
      success: true,
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      },
      profile,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
