import http, { IncomingMessage, ServerResponse } from 'node:http'
import { ErrorResponseTypeDef, ParamsTypeDef, RequestBodyTypeDef } from './types/types'
import { getParams } from './utils/helper'
import { handleIncomingRequest } from './routes/index'
import { closeDbConnection, createDbConnection } from '@database'
import { loggerInst } from './utils/logger'
import { middlewareManager } from './middlewares'
import { ResponseManager } from './utils/responseHandler'

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  middlewareManager().applyMiddlewares(req, res, async (err) => {
    if (err) {
      loggerInst.error('Error occured:', { error: err, traceId: req.customHeaders.traceId })
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal Server Error' }))
      return
    }

    const { generateErrorResponse } = new ResponseManager()

    try {
      const { method, url, body, headers, customHeaders } = req
      const traceId = customHeaders.traceId as string
      const requestBody: RequestBodyTypeDef = {
        endpoint: url?.split('?')[0] ?? '',
        method,
        traceId,
        queryParams: getParams(url as string) as ParamsTypeDef,
        body,
        headers
      }

      const response = await handleIncomingRequest(requestBody)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
    } catch (error) {
      const data = generateErrorResponse(error as ErrorResponseTypeDef)
      res.writeHead((error as ErrorResponseTypeDef).statusCode || 500, {
        'Content-Type': 'application/json'
      })
      res.end(data)
    }
  })
})

server.listen(3000, () => loggerInst.info('Server running on port 3000'))
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
