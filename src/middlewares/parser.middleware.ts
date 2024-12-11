import { IncomingMessage, ServerResponse } from 'node:http'
import { GlobalErrTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'

export default function bodyParser(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: GlobalErrTypeDef | unknown) => void
) {
  const bufferBody: Buffer[] = []

  loggerInst.info('Request Body Parsing Initiated')

  try {
    req.on('data', (chunk: Buffer) => {
      bufferBody.push(chunk)
    })
    req.on('end', () => {
      req.body = bufferBody.length > 0 ? JSON.parse(Buffer.concat(bufferBody).toString()) : {}
      next()
    })
  } catch (error) {
    loggerInst.error(error)
    next({ statusCode: 500, error })
  }
}
