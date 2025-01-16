import { Db } from 'mongodb'
import { getDbInst } from '../config/connection.config'
import { COLLECTIONS } from '../config/db.config'
import { QueryResponseTypeDef } from 'src/types/types'
import loggerInst from '../../utils/logger'
import { ResponseManager } from '../../utils/responseHandler'

export const FetchAll = async ({ traceId }: { traceId: string }): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null
  const { handleError } = new ResponseManager()

  try {
    const db: Db = getDbInst()
    const collectionName = COLLECTIONS.INSIGHTS
    const collection = db.collection(collectionName)

    response = await collection.find().toArray()
    if (response.length > 0) loggerInst.info(`${traceId}: Documents fetched successfully!`)
    else loggerInst.info(`${traceId}: No documents found!`)
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${FetchAll.name}`)
  }
  return response
}

export const FetchById = async ({
  traceId,
  collectionName,
  filter
}: {
  traceId: string
  collectionName: string
  filter: Record<string, string>
}): Promise<QueryResponseTypeDef> => {
  let response: QueryResponseTypeDef = null
  const { handleError } = new ResponseManager()

  try {
    const db: Db = getDbInst()
    const collection = db.collection(collectionName)

    response = await collection.findOne(filter)
    if (response) loggerInst.info(`${traceId}: Document fetched successfully!`)
    else loggerInst.info(`${traceId}: No document found!`)
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${FetchById.name}`)
  }
  return response
}
