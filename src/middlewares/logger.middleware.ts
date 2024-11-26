import { IncomingMessage, ServerResponse } from 'node:http'
import { performance } from 'node:perf_hooks'
import loggerInst from 'src/utils/logger'

export default function requestLogger(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void
) {
  try {
    const start = performance.now()

    const { customHeaders, url, method } = req
    const { traceId, userAgent, host } = customHeaders

    loggerInst.info('Processing Request', {
      traceId,
      host,
      userAgent,
      endpoint: url,
      method: method
    })

    res.on('finish', () => {
      const responseTime = `${(performance.now() - start).toFixed(2)} ms`
      loggerInst.info('Request Processed', {
        traceId,
        host,
        userAgent,
        endpoint: url,
        method: method,
        responseTime
      })
    })
    next()
  } catch (error) {
    loggerInst.error(error)
    next(error)
  }
}
