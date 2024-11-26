import { IncomingMessage } from 'node:http'
import { LoggerMetaDataTypeDef, ParamsTypeDef } from '../types/types'

/**
 * Extracts query parameters into an object.
 *
 * @param reqUrl - The request url string.
 * @returns {ParamsTypeDef} An object containing the query parameters, or `undefined` if the request url does not have any query params.
 *
 * @see {@link ParamsTypeDef} for the structure of the returned object.
 *
 * Example usage:
 * ```typescript
 * const url:string = "https://example.com?param1=value1&param2=value2";
 * const params: ParamsTypeDef = getParams(url);
 * console.log(params); // Output: { param1: "value1", param2: "value2" }
 * ```
 */
export const getParams = (reqUrl: string): ParamsTypeDef | undefined => {
  if (!reqUrl) return
  let params: ParamsTypeDef | undefined = undefined

  if (reqUrl.includes('?')) {
    const queryParams = reqUrl.split('?')[1]
    const paramPairs = queryParams.split('&')

    paramPairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      if (params === undefined) {
        params = {} as { [key: string]: string }
      }
      params[key] = value
    })
  }

  return params
}

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char: string) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export const getHeaders = (req: IncomingMessage): Partial<LoggerMetaDataTypeDef> => {
  const traceId = (req.headers['x-correlation-id'] as string) || generateUUID()
  const userAgent = req.headers['user-agent'] as string
  const host = req.headers.host as string

  return {
    traceId,
    userAgent,
    host
  } as Partial<LoggerMetaDataTypeDef>
}
