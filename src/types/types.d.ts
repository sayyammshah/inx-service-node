import { IncomingMessage, ServerResponse } from 'node:http'
import { Document, InsertOneResult, WithId } from 'mongodb'
import { API_CODES, HttpRequestMethods } from 'src/utils/constants'

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
export interface IncomingRequestBody {
  traceId: string
  apiCode: ApiCodesType
  req: IncomingMessage
  queryParams?: ParamsTypeDef | undefined
  body?: Record<string, string>
}

/**
 * Represents the type defination of router config.
 */
export interface RouterConfigsTypeDef {
  version: string
  routes: {
    [key: string]: {
      title: string
      method: HttpRequestMethods
      endpoint: string
      auth: boolean
      handler: (req: IncomingRequestBody) => Promise<ResponseTypeDef>
    }
  }
}

export type RouteConfigTypeDef = RouterConfigsTypeDef['routes'][string][string]

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

export type QueryResponseTypeDef =
  | InsertOneResult<Document>
  | UpdateResult<Document>
  | Record<string, unknown>[]
  | Document
  | WithId<Document>
  | null

export type MiddlewareTypeDef = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void
) => void

export type ApiCodesType =
  | API_CODES.INSIGHT_CREATE
  | API_CODES.INSIGHT_GET_ALL
  | API_CODES.USER_CREATE
  | API_CODES.USER_LOGIN

export type LoggerMetaDataTypeDef = {
  traceId: string
  host: string
  userAgent: string
  endpoint: string
  method: HttpMethodTypeDef
  apiCode: ApiCodesType
  responseTime: number
  error?: unknown | null
}

export const enum ProjectionTypes {
  InsightCreate = 'InsightCreate'
}

export type GlobalErrTypeDef = {
  statusCode: number
  error: string // custom message
}

export type BucketType = {
  requestCnt: number
  maxRequests: number
  timeWindow: number // in seconds
  expiry: number
}

export type RequestAuthPayload = {
  username: string
  email: string
  expiry?: number
}

// Models

export type Reply = {
  replyId: string
  author: string
  reply: string
  createdAt: Date
}
export type Comment = {
  commentId: string
  author: string
  topLevelComment: string
  replies: Reply[]
  createdAt: string
}

export interface InsightSchemaType {
  userId: string
  insightId: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  upvotes: string
  downvotes: string
  media: string
  comments: Comment[]
}

export type ActionHandlersParams = {
  contentId: string
  author: string
  content: string
}

export interface ActionHandlerReturnValue {
  filter: Filter<unknown>
  payload: UpdateFilter<Document>
  options: UpdateOptions
}
