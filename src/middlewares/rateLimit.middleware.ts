import { ServerResponse } from 'http'
import { IncomingMessage } from 'http'
import { BucketType, GlobalErrTypeDef } from 'src/types/types'
import loggerInst from 'src/utils/logger'

const DEFAULT_RATE_LIMIT_CONFIG = {
  requestCnt: 1,
  maxRequests: 10,
  timeWindow: 60,
  expiry: Math.floor(Date.now() / 1000) + 60
}
const bucket = new Map<string, BucketType>()

// Helper functions
const isLimitExceeded = (rlMeta: BucketType): boolean => {
  const { maxRequests, requestCnt } = rlMeta
  const isExceedCnt = requestCnt > maxRequests
  return isExceedCnt
}
const isLimitExpire = (expiry: number): boolean => {
  return Math.floor(Date.now() / 1000) > expiry
}
const ifLimitReset = (expiry: number): boolean => {
  return expiry + 30 < Math.floor(Date.now() / 1000) // Reset after 30 seconds
}

export const limitRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: GlobalErrTypeDef | unknown) => void
): void => {
  loggerInst.info('Request limit called')

  const { headers, socket } = req
  const clientIp = headers['x-real-ip'] || socket.remoteAddress
  let rlBody: BucketType | undefined = bucket.has(clientIp as string)
    ? bucket.get(clientIp as string)
    : undefined

  if (rlBody) {
    const isRlLimitExceeded: boolean = isLimitExceeded(rlBody as BucketType)
    const isRlExpire: boolean = isLimitExpire(rlBody?.expiry as number)
    const isRlReset: boolean = ifLimitReset(rlBody?.expiry as number)

    if (!isRlLimitExceeded) {
      rlBody = {
        ...rlBody,
        requestCnt: rlBody.requestCnt + 1
      }
      bucket.set(clientIp as string, rlBody)
    } else if ((isRlLimitExceeded || isRlExpire) && isRlReset) {
      const newRlBody = DEFAULT_RATE_LIMIT_CONFIG
      bucket.delete(clientIp as string)
      bucket.set(clientIp as string, newRlBody)
    } else next({ statusCode: 429, error: 'Too many requests' })
  } else {
    const newRlBody = DEFAULT_RATE_LIMIT_CONFIG
    bucket.set(clientIp as string, newRlBody)
  }
  next()
}
