import { ResponseHandler } from 'src/utils/responseHandler'
import { RequestBodyTypeDef, ResponseTypeDef, RouteConfigDetailsTypeDef } from '../types/types'
import RouterConfig from './Routes'

/**
 * Handles the incoming request and routes it to the appropriate handler based on the provided endpoint and method.
 *
 * @param {RequestBodyTypeDef} requestBody - The request body containing the relevant data.
 * @returns The response object containing the result or error details.
 *
 * @throws Throws an error if the request is invalid or if an error occurs during the handling process.
 *
 */
export const handleIncomingRequest = async (requestBody: RequestBodyTypeDef) => {
  let response: ResponseTypeDef | null = null
  const { handleResponse } = new ResponseHandler()

  const { endpoint, method } = requestBody
  const { routes } = RouterConfig

  try {
    const requestHandler: RouteConfigDetailsTypeDef | undefined =
      routes?.[`${endpoint}`]?.[`${method}`]

    if (requestHandler) {
      const { handler } = requestHandler
      response = await handler(requestBody)
    } else {
      response = handleResponse(undefined, {
        message: 'Invalied API',
        trace: handleIncomingRequest.name
      })
    }
  } catch (error) {
    throw new Error('Invalid request', { cause: error })
  }

  return response
}
