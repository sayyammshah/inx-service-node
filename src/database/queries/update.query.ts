import { Document, Filter, UpdateFilter, UpdateOptions, UpdateResult } from 'mongodb'
import { QueryResponseTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'
import { getDbInst } from '../config/connection.config'

/**
 * Updates a single document in the specified MongoDB collection based on the provided filter.
 *
 * @param _document - The update operations to be applied to the matched document.
 * @param filter - The filter used to select the document to update.
 * @param options - Additional options for the update operation.
 * @param traceId - A unique identifier for the operation, used for logging and tracing purposes.
 * @param collectionName - The name of the MongoDB collection where the update operation will be performed.
 *
 * @returns A promise that resolves to the result of the update operation.
 *
 * @throws Throws an error if any of the required parameters are missing or if an error occurs during the update operation.
 */
export const UpdateOne = async ({
  _document,
  filter,
  options,
  traceId,
  collectionName
}: {
  _document: UpdateFilter<Document>
  filter: Filter<unknown>
  options: UpdateOptions
  traceId: string
  collectionName: string
}): Promise<UpdateResult<Document>> => {
  let response: QueryResponseTypeDef = null

  if (!_document || !filter || !options || !collectionName) {
    loggerInst.error(`${traceId}: Input Params Failed, ${UpdateOne.name}`)
    throw new Error(`${traceId}: Input Params Failed, ${UpdateOne.name}`)
  }

  try {
    const db = getDbInst()
    const collection = db.collection(collectionName)

    response = await collection.updateOne(filter, _document, options)
    if (response?.modifiedCount === 1) loggerInst.info(`${traceId}: Document updated successfully:`)
    else loggerInst.info(`${traceId}: Failed to update document`)
  } catch (error) {
    loggerInst.error(`${traceId}: Error occurred in ${UpdateOne.name}`, error)
    throw new Error(`${traceId}: ${error}`)
  }
  return response
}

export const UpdateOneAndReturn = () => {}

export const updateMany = () => {}
