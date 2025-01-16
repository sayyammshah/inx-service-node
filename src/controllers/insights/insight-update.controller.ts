import { COLLECTIONS, UpdateOne } from '@database'
import { InsightUpdatePayload } from '@models'
import { insightUpdateSchema } from '@schema'
import { Document } from 'mongodb'
import {
  QueryResponseTypeDef,
  IncomingRequestBody,
  ResponseTypeDef,
  ActionHandlersParams,
  ActionHandlerReturnValue
} from 'src/types/types'
import { validateDocument } from '../../utils/helper'
import loggerInst from '../../utils/logger'
import { ResponseManager } from '../../utils/responseHandler'
import { actionHandlers } from './insight-update.helper'

export async function insightsUpdateController(req: IncomingRequestBody): Promise<ResponseTypeDef> {
  const { handleResponse, handleError } = new ResponseManager()
  const { body: _document, traceId } = req
  let queryResponse: QueryResponseTypeDef = null

  loggerInst.info('insightsUpdate called, Validating Params')

  const { isValid, validationErrors } = validateDocument(_document, insightUpdateSchema)
  if (!isValid) throw handleError(validationErrors, `${traceId}: Invalid Document`, 400)
  loggerInst.info('Params validations completed ')

  const { contentId, content, author, actionCode } = _document as unknown as InsightUpdatePayload

  loggerInst.info('Generating meta for document updation')
  const actionHandler: (params: ActionHandlersParams) => ActionHandlerReturnValue =
    actionHandlers[actionCode]

  if (!actionHandler) {
    loggerInst.error(`${traceId}: Invalid Action Code`)
    throw handleError(null, `${traceId}: Error occured in ${insightsUpdateController.name}`, 404)
  }

  const { filter, payload, options } = actionHandler({
    contentId,
    content,
    author
  })

  try {
    loggerInst.info(`${traceId}: Fetching existing insight with id: ${contentId}`)

    loggerInst.info(`${traceId}: Document Updation Initialised`)
    queryResponse = await UpdateOne({
      _document: payload as Document,
      filter,
      options,
      traceId,
      collectionName: COLLECTIONS.INSIGHTS
    })
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightsUpdateController.name}`)
  }
  return handleResponse(queryResponse)
}
