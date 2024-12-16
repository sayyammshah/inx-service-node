import { COLLECTIONS, InsertOne } from '@database'
import { insightCreateSchema } from '@schema'
import { Document } from 'mongodb'
import { QueryResponseTypeDef, IncomingRequestBody, ResponseTypeDef } from 'src/types/types'
import { generateXId, validateDocument } from 'src/utils/helper'
import loggerInst from 'src/utils/logger'
import { ResponseManager } from 'src/utils/responseHandler'

export async function insightsCreateController(req: IncomingRequestBody): Promise<ResponseTypeDef> {
  const { handleResponse, handleError } = new ResponseManager()
  const { body: _document, traceId } = req
  let queryResponse: QueryResponseTypeDef = null

  const { isValid, validationErrors } = validateDocument(_document, insightCreateSchema)
  if (!isValid) throw handleError(validationErrors, `${traceId}: Invalid Document`, 400)

  try {
    const payload: Document = {
      ..._document,
      insightId: generateXId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    loggerInst.info(`${traceId}: Document Insertion Initialised`)
    queryResponse = await InsertOne({
      _document: payload,
      traceId,
      collectionName: COLLECTIONS.INSIGHTS
    })
    loggerInst.info(`${traceId}: Record Created Successfully!`)
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightsCreateController.name}`)
  }
  return handleResponse(queryResponse)
}
