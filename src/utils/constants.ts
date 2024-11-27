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

export const BASE_V1 = {
  INSIGHTS: '/api/v1/insights',
  INSIGHTS_BY_ID: '/api/v1/insights/:id'
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
