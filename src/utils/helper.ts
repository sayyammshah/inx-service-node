import { ParamsTypeDef } from '../types/types'

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
