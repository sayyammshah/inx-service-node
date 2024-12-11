import { RequestAuthPayload } from 'src/types/types'
import crypto, { randomBytes } from 'node:crypto'
import { ResponseManager } from './responseHandler'
import loggerInst from './logger'
import { TOKEN_ENCRYPTION_ALGORITHM, TOKEN_DELIMETER } from './constants'

export const requestAuth = (): {
  generateToken: (_payload: RequestAuthPayload) => { token: string }
  decodeToken: (_token: string) => boolean
} => {
  const { handleError } = new ResponseManager()
  const generateToken = (_payload: RequestAuthPayload): { token: string } => {
    const iv: Buffer = randomBytes(12)
    const key: Buffer = randomBytes(32)
    let encryptedPayload: string, authTag: string

    const parsedPayload: string = JSON.stringify({
      ..._payload,
      expiry: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiry
    })

    try {
      const cipher = crypto.createCipheriv(
        TOKEN_ENCRYPTION_ALGORITHM,
        key, // key - should be of 32 bytes
        iv // initialization vector - should be of 12 bytes
      )
      encryptedPayload = cipher.update(parsedPayload, 'utf-8', 'base64')
      encryptedPayload += cipher.final('base64')
      authTag = cipher.getAuthTag().toString('base64')
    } catch (error) {
      loggerInst.error(error)
      throw handleError(null, 'Token Generation Failed', 401)
    }
    // token format -> iv + key + token + authTag
    return {
      token: `${iv.toString('base64')}${TOKEN_DELIMETER}${key.toString(
        'base64'
      )}${TOKEN_DELIMETER}${encryptedPayload}${TOKEN_DELIMETER}${authTag}`
    }
  }

  const decodeToken = (_token: string): boolean => {
    const [iv, key, encryptedPayload, authTag] = _token.split(' ')[1].split(TOKEN_DELIMETER)
    let payload: string
    try {
      loggerInst.info('Decoding token')
      const decipher = crypto.createDecipheriv(
        TOKEN_ENCRYPTION_ALGORITHM,
        Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64')
      )
      decipher.setAuthTag(Buffer.from(authTag, 'base64'))
      payload = decipher.update(encryptedPayload, 'base64', 'utf-8')
      payload += decipher.final('utf-8')
    } catch (error) {
      loggerInst.error(error)
      throw handleError(null, 'Access Denied', 403)
    }
    return JSON.parse(payload) ? true : false
  }

  return { generateToken, decodeToken }
}
