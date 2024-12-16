import isEmpty from 'lodash/isEmpty'
import winston, { format, Logger } from 'winston'

export const loggerInst: Logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sssZ' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    format.printf(({ message, timestamp, metadata, level }) => {
      const metadataObj = !isEmpty(metadata) ? ` ${JSON.stringify(metadata)}` : ''
      return `${level}: [${timestamp}] ${message}${metadataObj}`
    })
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ message, timestamp, metadata, level }) => {
          const metadataString = !isEmpty(metadata) ? ` ${JSON.stringify(metadata)}` : ''
          return `${level}: [${timestamp}] ${message}${metadataString}`
        })
      )
    })
    // new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: './logs/combined.log' })
  ]
})

export default loggerInst
