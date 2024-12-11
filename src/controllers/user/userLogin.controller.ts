import { COLLECTIONS } from '@database'
import { FetchById } from 'src/database/queries/fetch.query'
import { QueryResponseTypeDef, IncomingRequestBody, ResponseTypeDef } from 'src/types/types'
import { requestAuth } from 'src/utils/auth'
import { ResponseManager } from 'src/utils/responseHandler'

export const loginUserController = async (req: IncomingRequestBody): Promise<ResponseTypeDef> => {
  const { handleResponse, handleError } = new ResponseManager()
  const { traceId, body } = req
  const { email, username } = body || {}
  let response: QueryResponseTypeDef = null
  const filter = { email, username }

  try {
    response = await FetchById({ traceId, collectionName: COLLECTIONS.USER, filter })
    if (!response) response = { message: `${username} User not found` }
    else response = requestAuth().generateToken({ username, email })
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${loginUserController.name}`)
  }
  return handleResponse(response)
}
