import { Schema } from 'ajv'

export const schema: Schema = {
  type: 'object',
  properties: {
    userId: { type: 'string', minLength: 3 },
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
        topLevelComment: { type: 'string' },
        replies: { type: 'string' }
      }
    }
  }
}
