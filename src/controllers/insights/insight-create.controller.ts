import { InsertOne } from '@database'
import { Document } from 'mongodb'
import { QueryResponseTypeDef, RequestBodyTypeDef, ResponseTypeDef } from 'src/types/types'
import { ResponseHandler } from 'src/utils/responseHandler'

export async function insightsCreateController(req: RequestBodyTypeDef): Promise<ResponseTypeDef> {
  const { handleResponse } = new ResponseHandler()
  const _document = req.body as Document
  const queryResponse: QueryResponseTypeDef = await InsertOne(_document)
  return handleResponse(queryResponse)
}
