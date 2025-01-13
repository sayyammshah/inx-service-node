// API Helpers
export const BASE_URL_V1 = 'http://localhost:3000/api/v1'
export const URL_INSIGHTS = `${BASE_URL_V1}/insights`

export enum HttpRequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}
export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
}

// API Constants
export const enum API_CODES {
  INSIGHT_CREATE = 'InsightsCreate',
  INSIGHT_GET_ALL = 'InsightsGetAll',
  INSIGHT_GET_BY_ID = 'InsightsGetById',
  INSIGHT_UPDATE_ONE = 'InsightUpdateOne',
  USER_CREATE = 'UserCreate',
  USER_LOGIN = 'UserLogin'
}

/**
 * Enum containing action codes for insight updates.
 *
 * @enum {string}
 */
export enum ACTION_CODES {
  UPDATE_REPLY = 'UpdateReply',
  UPDATE_COMMENT = 'UpdateComment'
}

export const BASE_V1 = {
  INSIGHTS: '/api/v1/insights',
  INSIGHTS_BY_ID: '/api/v1/insights/:id',
  USER: '/api/v1/user'
}

export const Routes = {
  InsightCreate: 'InsightCreate',
  InsightsRead: 'InsightsRead'
}

export const ENDPOINTS_V1 = {
  [`${BASE_V1.INSIGHTS}`]: {
    [HttpRequestMethods.POST]: Routes.InsightCreate
  },
  [`${BASE_V1.INSIGHTS_BY_ID}`]: {
    [HttpRequestMethods.GET]: Routes.InsightCreate
  }
}
export const TYPES = {
  ERROR_RESPONSE: 'ErrorResponse'
}

// Projections
export const PROJECTION_TYPES = {
  INSIGHT_CREATE: 'InsightCreate',
  INSIGHT_READ: 'InsightRead'
}
export const PROJECTIONS = {
  [PROJECTION_TYPES.INSIGHT_CREATE]: ['acknowledged', 'insertedId'],
  [PROJECTION_TYPES.INSIGHT_READ]: ['_id', 'title', 'content', 'createdAt', 'updatedAt']
}

// CORS Config
export const ALLOWED_ORIGINS = ['http://localhost:3001', 'http://localhost:5173']
export const ALLOWED_HEADERS = ['Content-Type', 'Authorization', 'x-correlation-id', 'apiCode']
export const ALLOWED_METHODS = [
  HttpRequestMethods.GET,
  HttpRequestMethods.POST,
  HttpRequestMethods.PUT,
  HttpRequestMethods.DELETE,
  HttpRequestMethods.PATCH,
  HttpRequestMethods.OPTIONS
]

// Secrets
export const TOKEN_ENCRYPTION_ALGORITHM = 'aes-256-gcm'
export const PASSWORD_HASH_ENCRYPTION_ALGORITHM = 'md5'
export const TOKEN_DELIMETER = '|'
export const CORS_ALLOWED_HEADERS = ['apicode', 'content-type', 'authorization']
