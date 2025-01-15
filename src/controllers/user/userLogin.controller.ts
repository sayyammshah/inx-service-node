import { COLLECTIONS, FetchById } from '@database'
import { QueryResponseTypeDef, IncomingRequestBody, ResponseTypeDef } from 'src/types/types'
import { requestAuth } from 'src/utils/auth'
import { ResponseManager } from 'src/utils/responseHandler'

export const loginUserController = async (req: IncomingRequestBody): Promise<ResponseTypeDef> => {
  const { handleResponse, handleError } = new ResponseManager()
  const { traceId, body } = req
  const { email, password } = body || {}
  let response: QueryResponseTypeDef = null
  const filter = { email }

  if (!email || !password) throw handleError(null, `${traceId}: Missing email or password`)

  try {
    response = await FetchById({ traceId, collectionName: COLLECTIONS.USER, filter })
    if (!response) response = { message: `${email} not found`, statusCode: 404 }
    else {
      const hashedPassword = requestAuth().generatePasswordHash(password)
      if (hashedPassword !== response.password) {
        response = { message: 'Incorrect password', statusCode: 401 }
      } else
        response = {
          ...requestAuth().generateToken({ username: response.username, email }),
          statusCode: 200
        }
    }
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${loginUserController.name}`)
  }
  return handleResponse(response)
}
