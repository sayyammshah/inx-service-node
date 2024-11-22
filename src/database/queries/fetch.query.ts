import { Db } from 'mongodb'
import { getDbInst } from '../config/connection.config'
import { COLLECTIONS } from '../config/db.config'
import { QueryResponseTypeDef } from 'src/types/types'

export const FetchAll = async (): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null

  try {
    const db: Db = getDbInst()
    const collectionName = COLLECTIONS.INSIGHTS
    const collection = db.collection(collectionName)

    response = await collection.find().toArray()
    if (response.length > 0) {
      console.log('Documents fetched successfully:', response)
    } else {
      console.log('Failed to fetch documents')
    }
  } catch (error) {
    console.log(error)
  }
  return response
}
