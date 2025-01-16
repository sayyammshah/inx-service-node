import { QueryResponseTypeDef, ResponseTypeDef } from 'src/types/types'
import { ResponseManager } from '../../utils/responseHandler'

export const generateRandomUser = async (): Promise<ResponseTypeDef> => {
  const { handleResponse, handleError } = new ResponseManager()
  const randomUserApiUrl: string = process.env.RANDOM_USER_API_URL as string
  let response: QueryResponseTypeDef | null = null
  let parsedResponse: ResponseTypeDef

  try {
    response = await fetch(randomUserApiUrl)
    parsedResponse = await response.json()
    return handleResponse(parsedResponse)
  } catch (error) {
    throw handleError(error)
  }
}
