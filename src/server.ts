import http, { IncomingMessage, ServerResponse } from 'node:http'
import {
  ApiCodesType,
  ErrorResponseTypeDef,
  GlobalErrTypeDef,
  ParamsTypeDef,
  IncomingRequestBody
} from './types/types'
import { getParams } from './utils/helper'
import { handleIncomingRequest } from './routes/index'
import { closeDbConnection, createDbConnection } from '@database'
import { loggerInst } from './utils/logger'
import { middlewareManager } from './middlewares'
import { ResponseManager } from './utils/responseHandler'
import 'dotenv/config'

const PORT = process.env.PORT

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  middlewareManager().applyMiddlewares(req, res, async (err: GlobalErrTypeDef | unknown) => {
    const { generateErrorDto, handleError } = new ResponseManager()

    if (err) {
      const { statusCode = 500, error = 'Internal Server Error' } = err as GlobalErrTypeDef

      const sanitizedError = handleError(error, '', statusCode)
      const generateBuffer = generateErrorDto(sanitizedError as ErrorResponseTypeDef)

      loggerInst.error('Error occured:', { error: err, traceId: req.headers.traceId })
      res.writeHead(sanitizedError.statusCode as number, { 'Content-Type': 'application/json' })
      res.end(generateBuffer)
      return
    }

    try {
      const { url, body, headers } = req
      const { traceId, apicode } = headers
      const requestBody: IncomingRequestBody = {
        traceId: traceId as string,
        apiCode: apicode as ApiCodesType,
        req,
        queryParams: getParams(url as string) as ParamsTypeDef,
        body
      }

      const response = await handleIncomingRequest(requestBody)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
    } catch (error) {
      const errorResponse = generateErrorDto(error as ErrorResponseTypeDef)
      res.writeHead((error as ErrorResponseTypeDef).statusCode || 500, {
        'Content-Type': 'application/json'
      })
      res.end(errorResponse)
    }
  })
})

server.listen(PORT, () => loggerInst.info(`Server running on port ${PORT}`))
server.on('listening', async () => await createDbConnection())

process.on('exit', async () => {
  loggerInst.info('exit - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGINT', async () => {
  loggerInst.info('SIGNINT - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  loggerInst.info('SIGTERM - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
