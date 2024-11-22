import { FetchAll } from '@database'
import { QueryResponseTypeDef, ResponseTypeDef } from 'src/types/types'
import { ResponseHandler } from 'src/utils/responseHandler'

export async function insightsFetchController(): Promise<ResponseTypeDef> {
  const { handleResponse } = new ResponseHandler()
  const data: QueryResponseTypeDef = await FetchAll()
  return handleResponse(data)
}
