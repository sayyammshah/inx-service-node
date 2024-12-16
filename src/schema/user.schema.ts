import { Schema } from 'ajv'

export const schema: Schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
    password: { type: 'string', minLength: 6 },
    profilePicture: { type: 'string', pattern: '^([A-Za-z0-9+/=]){1,}==?$' },
    bio: { type: 'string', minLength: 3 },
    // role: 'user',
    // status: 'active',
    // socialLinks: {
    //   twitter: 'https://twitter.com/john_doe',
    //   linkedin: 'https://linkedin.com/in/john_doe'
    // },
    preferences: {
      darkMode: true,
      notifications: {
        email: true,
        sms: false
      }
    },
    // followersCount: 150,
    // followingCount: 75,
    activity: {
      commentsCount: 50,
      postsCount: 10,
      upvotesGiven: 250,
      downvotesGiven: 30
    }
  }
}
