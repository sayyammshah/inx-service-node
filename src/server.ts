import http, { IncomingMessage, ServerResponse } from 'node:http'
import { ParamsTypeDef, RequestBodyTypeDef } from './types/types'
import { getParams } from './utils/helper'
import { handleIncomingRequest } from './routes/index'
import { closeDbConnection, createDbConnection } from '@database'
import { loggerInst } from './utils/logger'
import { middlewareManager } from './middlewares'

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  middlewareManager().applyMiddlewares(req, res, async (err) => {
    if (err) {
      loggerInst.error('Unhandled error:', err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal Server Error' }))
      return
    }

    try {
      const { method, url, body, headers } = req
      const requestBody: RequestBodyTypeDef = {
        endpoint: url?.split('?')[0] ?? '',
        method,
        queryParams: getParams(url as string) as ParamsTypeDef,
        body,
        headers
      }

      const response = await handleIncomingRequest(requestBody)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
    } catch (error) {
      console.error('Error parsing request body:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end('Internal Server Error\n')
    }
  })
})

server.listen(3000, () => {
  loggerInst.info('Server running on port 3000')
})

server.on('listening', async () => {
  try {
    await createDbConnection()
    loggerInst.info('Database Connected Successfully!')
  } catch (error) {
    loggerInst.error('Error Connecting DB', { error })
  }
})

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
