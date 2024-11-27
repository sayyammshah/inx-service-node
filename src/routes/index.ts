import { ResponseManager } from 'src/utils/responseHandler'
import { RequestBodyTypeDef, ResponseTypeDef, RouteConfigDetailsTypeDef } from '../types/types'
import RouterConfig from './Routes'
import loggerInst from 'src/utils/logger'

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
  const { handleError } = new ResponseManager()

  const { endpoint, method, traceId } = requestBody
  const { routes } = RouterConfig

  try {
    const requestHandler: RouteConfigDetailsTypeDef | undefined =
      routes?.[`${endpoint}`]?.[`${method}`]

    if (requestHandler) {
      const { handler } = requestHandler
      loggerInst.info(`${traceId}: Handler Invoked`)
      response = await handler(requestBody)
    } else {
      throw handleError({}, `Not Found`, 404)
    }
  } catch (error) {
    throw handleError(error, `${traceId}: Invalid request ${handleIncomingRequest.name}`)
  }

  return response
}
