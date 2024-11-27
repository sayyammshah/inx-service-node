import { MongoClient, Db } from 'mongodb'
import { DB_NAME, URI } from './db.config'
import loggerInst from 'src/utils/logger'

const client = new MongoClient(URI)
let dbInstance: Db | null = null

export async function createDbConnection() {
  if (dbInstance) return dbInstance

  try {
    await client.connect()
    dbInstance = client.db(DB_NAME)
    loggerInst.info('Database Connected Successfully!')
  } catch (error) {
    loggerInst.error('Error connecting to Database:', { error })
  }
}

export function getDbInst(): Db {
  if (!dbInstance) throw new Error('Database Not Connected')
  return dbInstance
}

export async function closeDbConnection(): Promise<void> {
  try {
    await client.close()
    dbInstance = null
    loggerInst.info('Database connection closed')
  } catch (error) {
    loggerInst.info('Failed to close the database connection:', { error })
  }
}
