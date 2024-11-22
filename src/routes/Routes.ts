import { insightCreate, insightFetch } from '@controllers'
import { RouterConfigTypeDef } from 'src/types/types'
import { BASE_V1, HttpRequestMethods } from '../utils/constants'

const RouterConfig: RouterConfigTypeDef = {
  version: '1.0',
  routes: {
    [BASE_V1.INSIGHTS]: {
      [HttpRequestMethods.POST]: {
        title: 'Create Insights',
        method: HttpRequestMethods.POST,
        endpoint: BASE_V1.INSIGHTS,
        auth: true,
        handler: insightCreate
      },
      [HttpRequestMethods.GET]: {
        title: 'Get all Insights',
        method: HttpRequestMethods.GET,
        endpoint: BASE_V1.INSIGHTS,
        auth: false,
        handler: insightFetch
      }
    }
  }
}

export default RouterConfig
