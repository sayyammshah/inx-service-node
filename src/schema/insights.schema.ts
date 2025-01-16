import { Schema } from 'ajv'
import { ACTION_CODES } from '../utils/constants'

export const schema: Schema = {
  type: 'object',
  properties: {
    userId: { type: 'string', minLength: 3 },
    insightId: { type: 'string', minLength: 3 }, // 'userId_date.now()'
    title: { type: 'string', minLength: 3 },
    description: { type: 'string', minLength: 3 },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    upvotes: { type: 'number' },
    downvotes: { type: 'number' },
    media: {
      type: 'array',
      uniqueItems: true,
      properties: {
        source: { type: 'string', pattern: '^([A-Za-z0-9+/=]){1,}==?$' },
        type: { type: 'string' }
      }
    },
    comments: {
      type: 'array',
      properties: {
        commentId: { type: 'string', minLength: 3 },
        topLevelComment: { type: 'string' },
        author: { type: 'string' },
        createdAt: { type: 'string' },
        replies: {
          type: 'array',
          properties: {
            type: 'object',
            properties: {
              replyId: { type: 'string', minLength: 3 },
              reply: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        }
      }
    }
  }
}

export const insightUpdateSchema = {
  type: 'object',
  properties: {
    contentId: { type: 'string', minLength: 3 },
    content: { type: 'string', minLength: 3 },
    author: { type: 'string', minLength: 3 },
    actionCode: { enum: Object.values(ACTION_CODES) }
  },
  required: ['contentId', 'content', 'author', 'actionCode']
}
