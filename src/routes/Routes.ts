import { insightCreate, insightFetch, insightUpdate, userCreate, userLogin } from '@controllers'
import { RouterConfigsTypeDef } from 'src/types/types'
import { API_CODES, BASE_V1, HttpRequestMethods } from '../utils/constants'

const RouterConfig: RouterConfigsTypeDef = {
  version: '1.0',
  routes: {
    [API_CODES.INSIGHT_CREATE]: {
      title: 'Create Insights',
      method: HttpRequestMethods.POST,
      endpoint: BASE_V1.INSIGHTS,
      auth: true,
      handler: insightCreate
    },
    [API_CODES.INSIGHT_GET_ALL]: {
      title: 'Get all Insights',
      method: HttpRequestMethods.GET,
      endpoint: BASE_V1.INSIGHTS,
      auth: true,
      handler: insightFetch
    },
    [API_CODES.INSIGHT_UPDATE_ONE]: {
      title: 'Update Insight',
      method: HttpRequestMethods.PATCH,
      endpoint: BASE_V1.INSIGHTS,
      auth: true,
      handler: insightUpdate
    },
    [API_CODES.USER_CREATE]: {
      title: 'Create User',
      method: HttpRequestMethods.POST,
      endpoint: BASE_V1.USER,
      auth: false,
      handler: userCreate
    },
    [API_CODES.USER_LOGIN]: {
      title: 'Login User',
      method: HttpRequestMethods.POST,
      endpoint: BASE_V1.USER,
      auth: false,
      handler: userLogin
    }
  }
}

export default RouterConfig
