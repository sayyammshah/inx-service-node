// API Helpers
export const BASE_URL_V1 = 'http://localhost:3000/api/v1'
export const URL_INSIGHTS = `${BASE_URL_V1}/insights`

export enum HttpRequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
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

export const enum API_CODES {
  INSIGHT_CREATE = 'InsightsCreate',
  INSIGHT_GET_ALL = 'InsightsGetAll',
  USER_CREATE = 'UserCreate',
  USER_LOGIN = 'UserLogin'
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

export const PROJECTION_TYPES = {
  INSIGHT_CREATE: 'InsightCreate',
  INSIGHT_READ: 'InsightRead'
}

export const PROJECTIONS = {
  [PROJECTION_TYPES.INSIGHT_CREATE]: ['acknowledged', 'insertedId'],
  [PROJECTION_TYPES.INSIGHT_READ]: ['_id', 'title', 'content', 'createdAt', 'updatedAt']
}

export const ALLOWED_ORIGINS = ['http://localhost:3001']
export const TOKEN_ENCRYPTION_ALGORITHM = 'aes-256-gcm'
export const TOKEN_DELIMETER = '|'
