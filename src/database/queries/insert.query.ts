import { Document } from 'mongodb'
import { getDbInst } from '../config/connection.config'
import { QueryResponseTypeDef } from 'src/types/types'
import loggerInst from '../../utils/logger'
import { ResponseManager } from '../../utils/responseHandler'

export const InsertOne = async ({
  _document,
  traceId,
  collectionName
}: {
  _document: Document
  traceId: string
  collectionName: string
}): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null
  const { handleError } = new ResponseManager()

  try {
    const db = getDbInst()
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
