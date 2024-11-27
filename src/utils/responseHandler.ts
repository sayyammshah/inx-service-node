import { ErrorResponseTypeDef, QueryResponseTypeDef } from 'src/types/types'

class ResponseBody {
  data: unknown
  error: ErrorResponseTypeDef | null
  constructor(data: unknown, error: ErrorResponseTypeDef | null) {
    this.data = data
    this.error = error
  }
}
export class ErrorBody {
  constructor(
    public message: string,
    public cause: unknown,
    public stack?: string | undefined,
    public statusCode?: number | undefined
  ) {
    this.message = message ?? 'Unknown error occurred'
    this.stack = stack ?? ''
    this.cause = cause ?? ''
    this.statusCode = statusCode ?? 400
  }
}

export class ResponseManager {
  handleResponse(res: QueryResponseTypeDef) {
    const responseBody = new ResponseBody(res, null)
    return responseBody
  }

  handleError(error: unknown, message?: string, statusCode?: number) {
    if (error instanceof ErrorBody) return error
    else {
      const newError: Error = new Error(message, {
        cause: (error as Error).message
      })
      const stackTrace = statusCode === 404 ? '' : newError.stack
      const errorBody = new ErrorBody(newError.message, newError.cause, stackTrace, statusCode)
      return errorBody
    }
  }

  generateErrorResponse(err: ErrorResponseTypeDef) {
    const response = new ResponseBody(null, err)
    const buffer = Buffer.from(JSON.stringify(response))
    return buffer
  }
}
