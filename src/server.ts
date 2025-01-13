import { closeDbConnection, createDbConnection } from '@database'
import cors, { CorsOptions } from 'cors'
import 'dotenv/config'
import express from 'express'
import requestLogger from './middlewares/logger.middleware'
import { handleIncomingRequest } from './routes'
import {
  ApiCodesType,
  ErrorResponseTypeDef,
  IncomingRequestBody,
  ParamsTypeDef
} from './types/types'
import { ALLOWED_HEADERS, ALLOWED_METHODS, ALLOWED_ORIGINS } from './utils/constants'
import { loggerInst } from './utils/logger'
import { ResponseManager } from './utils/responseHandler'

const PORT = process.env.PORT

const app = express()

// Middlewares
app.use(requestLogger)
app.use(
  cors((req, callback) => {
    let corsOptions: CorsOptions = {
      origin: false,
      methods: '',
      allowedHeaders: []
    }
    if (ALLOWED_ORIGINS.indexOf(req.headers.origin as string) !== -1)
      corsOptions = {
        origin: true,
        methods: ALLOWED_METHODS,
        allowedHeaders: ALLOWED_HEADERS
      }
    callback(null, corsOptions)
  })
)
app.use(express.json({ limit: '10mb' }))

// Routes
app.get('/api/v1/health-check', (req, res) => {
  res.json({
    message: 'Server health check - Working fine'
  })
})
app.all('/api/v1/*', async (req, res) => {
  const { generateErrorDto } = new ResponseManager()
  try {
    const requestBody: IncomingRequestBody = {
      req,
      traceId: req.headers['x-correlation-id'] as string,
      apiCode: req.headers.apicode as ApiCodesType,
      queryParams: req.query as ParamsTypeDef,
      body: req.body
    }

    const reponse = await handleIncomingRequest(requestBody)
    res.json(reponse)
  } catch (error) {
    loggerInst.error('Error occured:', error)
    const errorResponse = generateErrorDto(error as ErrorResponseTypeDef)
    res.json(errorResponse)
  }
})

// Server Setup
app.listen(PORT, async () => {
  loggerInst.info(`Server running on port ${PORT}`)
  try {
    await createDbConnection()
  } catch (error) {
    loggerInst.error('Error occured:', error)
  }
})

// Graceful shutdown
process.on('exit', async () => {
  loggerInst.info('exit - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGINT', async () => {
  loggerInst.info('SIGNINT - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  loggerInst.info('SIGTERM - Closing DB connection...')
  await closeDbConnection()
  process.exit(0)
})
