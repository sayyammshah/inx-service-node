import { Document } from 'mongodb'
import { getDbInst } from '../config/connection.config'
import { COLLECTIONS } from '../config/db.config'
import { QueryResponseTypeDef } from 'src/types/types'

export const InsertOne = async (_document: Document): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null

  try {
    const db = getDbInst()
    const collectionName = COLLECTIONS.INSIGHTS
    const collection = db.collection(collectionName)

    response = await collection.insertOne(_document)
    if (response.insertedId) {
      console.log('Document inserted successfully:', response.insertedId)
    } else {
      console.log('Failed to insert document')
    }
  } catch (error) {
    console.log(error)
  }
  return response
}
