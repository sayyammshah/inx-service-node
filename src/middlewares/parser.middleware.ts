import { IncomingMessage, ServerResponse } from 'node:http'
import { HttpRequestMethods } from 'src/utils/constants'
import loggerInst from 'src/utils/logger'

export default function bodyParser(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void
) {
  const { method } = req
  if (method === HttpRequestMethods.GET || method === HttpRequestMethods.DELETE) next()

  const bufferBody: Buffer[] = []

  loggerInst.info('Request Body Parsing Initiated')

  try {
    req.on('data', (reqBodyChunk: Buffer) => {
      bufferBody.push(reqBodyChunk)
    })
    req.on('end', () => {
      req.body = bufferBody.length > 0 ? JSON.parse(Buffer.concat(bufferBody).toString()) : {}
      next()
    })
    loggerInst.info('Request body parsed successfully')
  } catch (error) {
    loggerInst.error(error)
    next(error)
  }
}
