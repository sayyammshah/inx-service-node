import { InsertOne } from '@database'
import { Document } from 'mongodb'
import { QueryResponseTypeDef, RequestBodyTypeDef, ResponseTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'
import { ResponseManager } from 'src/utils/responseHandler'

export async function insightsCreateController(req: RequestBodyTypeDef): Promise<ResponseTypeDef> {
  const { handleResponse, handleError } = new ResponseManager()
  const { body: _document, traceId } = req

  let queryResponse: QueryResponseTypeDef | null = null

  try {
    loggerInst.info(`${traceId}: Document Insertion Initialed`)
    queryResponse = await InsertOne({ _document: _document as Document, traceId })
    loggerInst.info(`${traceId}: Record Created Successfully!`)
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightsCreateController.name}`)
  }
  return handleResponse(queryResponse)
}
