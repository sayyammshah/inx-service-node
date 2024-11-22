import { IncomingHttpHeaders } from 'http'
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
export interface BodyTypeDef {
  apiCode: string
}

/**
 * Represents the body of incoming Http reques.
 */
export interface RequestBodyTypeDef {
  endpoint: string | undefined
  method: string | undefined
  queryParams?: ParamsTypeDef | undefined
  body?: BodyTypeDef
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

export interface ResponseTypeDef {
  result: {
    data:
      | { [key: string]: unknown }
      | Array<{ [key: string]: unknown }>
      | QueryResponseTypeDef
      | null
  } | null
  error: Record<string, string> | null
}

export type QueryResponseTypeDef = InsertOneResult<Document> | Record<string, unknown>[] | null
