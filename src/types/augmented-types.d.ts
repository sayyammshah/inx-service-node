import { LoggerMetaDataTypeDef } from './types'

declare module 'http' {
  interface IncomingMessage {
    body: Record<string, string>
    customHeaders: Partial<LoggerMetaDataTypeDef>
  }
}

// declare global {
//   interface ErrorOptions {
//     cause?: unknown
//     traceId: string
//   }
// }
