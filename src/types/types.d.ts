import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'node:http'
import { Document, InsertOneResult } from 'mongodb'
import { HttpRequestMethods } from 'src/utils/constants'

export type HttpMethodTypeDef = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Represents the type of query parameters in a URL.
 */
export type ParamsTypeDef = {
  [key: string]: string
}

/**
 * Represents the Http incoming request payload.
 */

/**
 * Represents the body of incoming Http reques.
 */
export interface RequestBodyTypeDef {
  endpoint: string | undefined
  method: string | undefined
  traceId: string
  queryParams?: ParamsTypeDef | undefined
  body?: Record<string, string>
  headers?: IncomingHttpHeaders
}

/**
 * Represents the type defination of router config.
 */
export interface RouterConfigTypeDef {
  version: string
  routes: {
    [key: string]: {
      [key: string]: {
        title: string
        method: HttpRequestMethods
        endpoint: string
        auth: boolean
        handler: (req: RequestBodyTypeDef) => Promise<ResponseTypeDef>
      }
    }
  }
}

export type RouteConfigDetailsTypeDef = RouterConfigTypeDef['routes'][string][string]

export type ErrorResponseTypeDef = {
  message: string
  cause: string
  stack: string
  statusCode?: number
}

export interface ResponseTypeDef {
  data: unknown | null
  error: ErrorResponseTypeDef | null
}

export type QueryResponseTypeDef = InsertOneResult<Document> | Record<string, unknown>[] | null

export type MiddlewareTypeDef = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void
) => void

export type LoggerMetaDataTypeDef = {
  traceId: string
  host: string
  userAgent: string
  endpoint: string
  method: HttpMethodTypeDef
  responseTime: number
  error?: unknown | null
}
