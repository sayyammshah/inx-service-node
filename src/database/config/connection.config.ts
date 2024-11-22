import { MongoClient, Db } from 'mongodb'
import { DB_NAME, URI } from './db.config'

const client = new MongoClient(URI)
let dbInstance: Db | null = null

export async function createDbConnection() {
  if (dbInstance) return dbInstance

  try {
    await client.connect()
    dbInstance = client.db(DB_NAME)
  } catch (error) {
    console.error('Error connecting to Database:', error)
    throw error
  }
}

export function getDbInst(): Db {
  if (!dbInstance) throw new Error('Database Not Connected!')
  return dbInstance
}

export async function closeDbConnection(): Promise<void> {
  try {
    await client.close()
    dbInstance = null
    console.log('Database connection closed')
  } catch (error) {
    console.error('Failed to close the database connection:', error)
  }
}
