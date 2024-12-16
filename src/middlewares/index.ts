import requestLogger from './logger.middleware'
import bodyParser from './parser.middleware'
import { IncomingMessage, ServerResponse } from 'node:http'
import { GlobalErrTypeDef, MiddlewareTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'
import { limitRequest } from './rateLimit.middleware'
import { cors } from './cors.middleware'
import { generateXId } from 'src/utils/helper'

export const middlewareManager = () => {
  // Sequence of is significant
  const middlewares: MiddlewareTypeDef[] = [requestLogger, cors, limitRequest, bodyParser]

  const applyMiddlewares = (
    req: IncomingMessage,
    res: ServerResponse,
    done: (err?: GlobalErrTypeDef | unknown) => void
  ) => {
    const { headers } = req
    const { traceId } = headers
    let index = 0

    headers.traceId = traceId ? String(traceId).trim() : generateXId(16)
    const next = (err?: GlobalErrTypeDef | unknown) => {
      if (err) return done(err)
      if (index >= middlewares.length) return done()

      try {
        const middleware = middlewares[index++]
        middleware(req, res, next)
      } catch (error) {
        loggerInst.error(error)
      }
    }
    next()
  }

  return { applyMiddlewares }
}
