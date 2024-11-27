import { FetchAll } from '@database'
import { QueryResponseTypeDef, RequestBodyTypeDef, ResponseTypeDef } from 'src/types/types'
import { ResponseManager } from 'src/utils/responseHandler'

export async function insightsFetchController(
  requestBody: RequestBodyTypeDef
): Promise<ResponseTypeDef> {
  const { traceId } = requestBody
  const { handleResponse } = new ResponseManager()
  let response: QueryResponseTypeDef | null = null
  const { handleError } = new ResponseManager()

  try {
    response = await FetchAll({ traceId })
  } catch (error: unknown) {
    throw handleError(error, `${traceId}: Error occured in ${insightsFetchController.name}`)
  }
  return handleResponse(response)
}
