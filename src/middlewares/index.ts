import requestLogger from './logger.middleware'
import bodyParser from './parser.middleware'
import { IncomingMessage, ServerResponse } from 'node:http'
import { MiddlewareTypeDef } from 'src/types/types'
import { getHeaders } from 'src/utils/helper'
import loggerInst from 'src/utils/logger'

export const middlewareManager = () => {
  const middlewares: MiddlewareTypeDef[] = [requestLogger, bodyParser]

  const applyMiddlewares = (
    req: IncomingMessage,
    res: ServerResponse,
    done: (err?: unknown) => void
  ) => {
    let index = 0

    req.customHeaders = getHeaders(req)
    const next = (err?: unknown) => {
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
