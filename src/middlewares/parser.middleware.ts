import { IncomingMessage, ServerResponse } from 'node:http'
import loggerInst from 'src/utils/logger'

export default function bodyParser(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void
) {
  const bufferBody: Buffer[] = []

  loggerInst.info('ParserMiddleware called')

  try {
    req.on('data', (reqBodyChunk: Buffer) => {
      bufferBody.push(reqBodyChunk)
    })
    req.on('end', () => {
      req.body = bufferBody.length > 0 ? JSON.parse(Buffer.concat(bufferBody).toString()) : {}
      next()
    })
  } catch (error) {
    loggerInst.error(error)
    next(error)
  }
}
