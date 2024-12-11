import { IncomingMessage, ServerResponse } from 'node:http'
import { performance } from 'node:perf_hooks'
import { GlobalErrTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'

export default function requestLogger(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: GlobalErrTypeDef | unknown) => void
) {
  try {
    const start = performance.now()

    const { headers, url, method } = req

    loggerInst.info('Processing Request', {
      traceId: headers.traceId,
      host: headers.host,
      userAgent: headers['user-agent'],
      endpoint: url,
      method: method
    })

    res.on('finish', () => {
      const responseTime = `${(performance.now() - start).toFixed(2)} ms`
      loggerInst.info('Request Processed', {
        traceId: headers.traceId,
        host: headers.host,
        userAgent: headers['user-agent'],
        endpoint: url,
        method: method,
        responseTime
      })
    })
    next()
  } catch (error) {
    loggerInst.error(error)
    next({ statusCode: 500, error })
  }
}
