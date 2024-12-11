import { ServerResponse } from 'http'
import { IncomingMessage } from 'http'
import { GlobalErrTypeDef } from 'src/types/types'
import { ALLOWED_ORIGINS } from 'src/utils/constants'
import loggerInst from 'src/utils/logger'

export const cors = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: GlobalErrTypeDef) => void
) => {
  const allowedOrigins = ALLOWED_ORIGINS
  const origin = req.headers.origin

  loggerInst.info('Checking cross origin access')

  if (allowedOrigins?.includes(origin as string)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header')
    next()
  } else {
    loggerInst.error('Cross origin access denied')
    next({
      statusCode: 500,
      error: `Access Denied - CORS Error: origin ${req.headers.origin} not allowed`
    })
  }
}
