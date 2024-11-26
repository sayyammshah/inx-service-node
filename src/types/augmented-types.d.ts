// import * as http from 'node:http'

import { LoggerMetaDataTypeDef } from './types'

declare module 'http' {
  interface IncomingMessage {
    body: Record<string, string>
    customHeaders: Partial<LoggerMetaDataTypeDef>
  }
}
