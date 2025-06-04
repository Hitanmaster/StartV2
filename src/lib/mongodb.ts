// Mock MongoDB functions for demo purposes

export interface Database {
  collection: (name: string) => any
}

let mockConnected = false

export default Promise.resolve({
  db: (name: string) => ({
    collection: (collectionName: string) => ({
      findOne: async (query: any) => null,
      insertOne: async (doc: any) => ({ insertedId: "mock-id" }),
      findOneAndUpdate: async (query: any, update: any, options: any) => null,
    }),
  }),
})

export async function getDatabase(): Promise<Database> {
  // Mock implementation
  return {
    collection: (name: string) => ({
      findOne: async (query: any) => null,
      insertOne: async (doc: any) => ({ insertedId: "mock-id" }),
      findOneAndUpdate: async (query: any, update: any, options: any) => null,
    }),
  }
}

export async function testConnection(): Promise<boolean> {
  // Mock implementation
  console.log("Mock MongoDB connection successful!")
  mockConnected = true
  return true
}
