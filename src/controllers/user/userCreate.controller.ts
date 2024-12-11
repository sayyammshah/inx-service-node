import { COLLECTIONS, InsertOne } from '@database'
import { userCreateSchema } from '@schema'
import { QueryResponseTypeDef, IncomingRequestBody, ResponseTypeDef } from 'src/types/types'
import { validateDocument } from 'src/utils/helper'
import loggerInst from 'src/utils/logger'
import { ResponseManager } from 'src/utils/responseHandler'

export const userCreateController = async (req: IncomingRequestBody): Promise<ResponseTypeDef> => {
  const { handleResponse, handleError } = new ResponseManager()
  const { body: _document, traceId } = req
  let queryResponse: QueryResponseTypeDef | null = null

  const { isValid, validationErrors } = validateDocument(_document, userCreateSchema)
  if (!isValid) throw handleError(validationErrors, `${traceId}: Invalid Document`, 400)

  try {
    loggerInst.info(`${traceId}: User Document Insertion Initiated`)
    queryResponse = await InsertOne({
      _document: _document as unknown as Document,
      traceId,
      collectionName: COLLECTIONS.USER
    })
    loggerInst.info(`${traceId}: User Record Created Successfully!`)
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${userCreateController.name}`)
  }
  return handleResponse(queryResponse)
}
