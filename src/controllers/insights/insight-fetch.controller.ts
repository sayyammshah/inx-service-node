import { COLLECTIONS, FetchAll } from '@database'
import { FetchById } from 'src/database/queries/fetch.query'
import { QueryResponseTypeDef, IncomingRequestBody, ResponseTypeDef } from 'src/types/types'
import { requestAuth } from 'src/utils/auth'
import { ResponseManager } from 'src/utils/responseHandler'

export async function insightsFetchController(req: IncomingRequestBody): Promise<ResponseTypeDef> {
  const { handleResponse, handleError } = new ResponseManager()
  const { traceId, req: httpRequestBody } = req
  let response: QueryResponseTypeDef | null = null
  const _token: string = httpRequestBody.headers.authorization as string

  const isUsrAuthenticated = requestAuth().decodeToken(_token)
  if (!isUsrAuthenticated) throw handleError(null, 'Access Denied')

  try {
    response = await FetchAll({ traceId })
    if (!response) response = { message: `No data found` }
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightsFetchController.name}`)
  }
  return handleResponse(response)
}

export async function insightFetchByIdController(
  req: IncomingRequestBody
): Promise<ResponseTypeDef> {
  const { handleResponse, handleError } = new ResponseManager()
  const { traceId, req: httpRequestBody } = req
  let response: QueryResponseTypeDef | null = null
  const _token: string = httpRequestBody.headers.authorization as string
  const { postId } = req.queryParams || {}
  const filter = { postId }

  const isUsrAuthenticated = requestAuth().decodeToken(_token)
  if (!isUsrAuthenticated) throw handleError(null, 'Access Denied')

  try {
    response = await FetchById({ traceId, collectionName: COLLECTIONS.INSIGHTS, filter })
    if (!response) response = { message: `No data found` }
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightFetchByIdController.name}`)
  }
  return handleResponse(response)
}
