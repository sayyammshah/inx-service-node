import http, { IncomingMessage, ServerResponse } from 'http'
import { ParamsTypeDef, RequestBodyTypeDef } from './types/types'
import { getParams } from './utils/helper'
import { handleIncomingRequest } from './routes/index'
import { closeDbConnection, createDbConnection } from '@database'

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req
  let requestBody: RequestBodyTypeDef
  let queryParams: ParamsTypeDef | undefined = {}
  const body: Buffer[] = []

  req.on('data', (reqBodyChunk: Buffer) => {
    body.push(reqBodyChunk)
  })

  req.on('end', async () => {
    try {
      queryParams = getParams(url as string)
      const bodyData = Buffer.concat(body).toString()
      requestBody = {
        endpoint: url?.split('?')[0] ?? '',
        method,
        queryParams,
        body: (bodyData && JSON.parse(bodyData)) ?? {},
        headers: req.headers
      }

      const response = await handleIncomingRequest(requestBody)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
    } catch (error) {
      console.error('Error parsing request body:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end('Internal Server Error\n')
      return
    }
  })
})

server.listen(3000, () => {
  console.log('Server running on port 3000')
})

server.on('listening', async () => {
  try {
    await createDbConnection()
    console.log('Database Connected Successfully!')
  } catch (error) {
    console.log('Error Connecting DB', error)
  }
})

process.on('exit', async () => {
  console.log('exit - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGINT', async () => {
  console.log('SIGNINT - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  console.log('SIGTERM - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
