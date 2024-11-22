import { QueryResponseTypeDef, ResponseTypeDef } from 'src/types/types'

// class ResponseBody {
//   data: unknown
//   error: unknown
//   constructor(data: unknown, error: unknown) {
//     this.data = data
//     this.error = error
//   }
// }

export class ResponseHandler {
  handleResponse(res?: QueryResponseTypeDef, err?: Record<string, string>): ResponseTypeDef {
    let response: ResponseTypeDef | null = null

    response = {
      result: {
        data: res ?? null
      },
      error: err ?? null
    }
    return response
  }
}
