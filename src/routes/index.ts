import { ResponseManager } from '../utils/responseHandler'
import { IncomingRequestBody, ResponseTypeDef, RouteConfigTypeDef } from '../types/types'
import RouterConfig from './Routes'
import loggerInst from '../utils/logger'

/**
 * Handles the incoming request and routes it to the appropriate handler based on the provided endpoint and method.
 *
 * @param {IncomingRequestBody} requestBody - The request body containing the relevant data.
 * @returns The response object containing the result or error details.
 *
 * @throws Throws an error if the request is invalid or if an error occurs during the handling process.
 *
 */
export const handleIncomingRequest = async (requestBody: IncomingRequestBody) => {
  let response: ResponseTypeDef | null = null
  const { handleError } = new ResponseManager()

  const { apiCode, traceId } = requestBody
  const { routes } = RouterConfig

  try {
    const routerConfig: RouteConfigTypeDef | undefined = routes?.[`${apiCode}`]

    if (routerConfig) {
      const { handler } = routerConfig
      loggerInst.info(`${traceId}: Handler Invoked`)
      response = await handler(requestBody)
    } else throw handleError({}, `Not Found`, 404)
  } catch (error) {
    throw handleError(error, `${traceId}: Invalid request ${handleIncomingRequest.name}`)
  }

  return response
}
