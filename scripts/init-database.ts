import { getDatabase } from "../src/lib/mongodb"

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing StartLinker database...")

    const db = await getDatabase()

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    // Users collection
    if (!collectionNames.includes("users")) {
      await db.createCollection("users")
      console.log("✅ Created 'users' collection")

      // Create indexes for users
      await db.collection("users").createIndex({ email: 1 }, { unique: true })
      console.log("✅ Created unique index on email field")
    } else {
      console.log("ℹ️ 'users' collection already exists")
    }

    // Profiles collection
    if (!collectionNames.includes("profiles")) {
      await db.createCollection("profiles")
      console.log("✅ Created 'profiles' collection")

      // Create indexes for profiles
      await db.collection("profiles").createIndex({ userId: 1 }, { unique: true })
      await db.collection("profiles").createIndex({ email: 1 })
      console.log("✅ Created indexes for profiles collection")
    } else {
      console.log("ℹ️ 'profiles' collection already exists")
    }

    // Projects collection
    if (!collectionNames.includes("projects")) {
      await db.createCollection("projects")
      console.log("✅ Created 'projects' collection")

      // Create indexes for projects
      await db.collection("projects").createIndex({ createdBy: 1 })
      await db.collection("projects").createIndex({ status: 1 })
      await db.collection("projects").createIndex({ createdAt: -1 })
      console.log("✅ Created indexes for projects collection")
    } else {
      console.log("ℹ️ 'projects' collection already exists")
    }

    // Messages collection
    if (!collectionNames.includes("messages")) {
      await db.createCollection("messages")
      console.log("✅ Created 'messages' collection")

      // Create indexes for messages
      await db.collection("messages").createIndex({ chatId: 1 })
      await db.collection("messages").createIndex({ senderId: 1 })
      await db.collection("messages").createIndex({ createdAt: -1 })
      console.log("✅ Created indexes for messages collection")
    } else {
      console.log("ℹ️ 'messages' collection already exists")
    }

    // Chats collection
    if (!collectionNames.includes("chats")) {
      await db.createCollection("chats")
      console.log("✅ Created 'chats' collection")

      // Create indexes for chats
      await db.collection("chats").createIndex({ participants: 1 })
      await db.collection("chats").createIndex({ lastMessageAt: -1 })
      console.log("✅ Created indexes for chats collection")
    } else {
      console.log("ℹ️ 'chats' collection already exists")
    }

    console.log("🎉 Database initialization completed successfully!")

    // Test the connection
    await db.admin().ping()
    console.log("🔗 Database connection test successful!")

    // Show database stats
    const stats = await db.stats()
    console.log(`📊 Database: ${stats.db}`)
    console.log(`📁 Collections: ${stats.collections}`)
    console.log(`💾 Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`)
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    throw error
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("✨ Database setup complete! Your StartLinker app is ready to go!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("💥 Setup failed:", error)
    process.exit(1)
  })
