import { Document } from 'mongodb'
import { getDbInst } from '../config/connection.config'
import { COLLECTIONS } from '../config/db.config'
import { QueryResponseTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'
import { ResponseManager } from 'src/utils/responseHandler'

export const InsertOne = async ({
  _document,
  traceId
}: {
  _document: Document
  traceId: string
}): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null
  const { handleError } = new ResponseManager()

  try {
    const db = getDbInst()
    const collectionName = COLLECTIONS.INSIGHTS
    const collection = db.collection(collectionName)

    response = await collection.insertOne(_document)
    if (response.insertedId)
      loggerInst.info(`${traceId}: Document inserted successfully:`, response.insertedId)
    else loggerInst.info(`${traceId}: Failed to insert document`)
  } catch (error) {
    throw handleError(error, `${traceId}: Error occured in ${InsertOne.name}`)
  }
  return response
}
