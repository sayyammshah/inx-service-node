import { ACTION_CODES } from 'src/utils/constants'

// Update Comments and Replies

export interface InsightUpdatePayload {
  author: string
  actionCode: InsightUpdateActionCodes
  content: string // contains reply or comment content
  contentId: string // commentId in case of updateReply and insightIdIncase of updateComment
}

export type InsightUpdateActionCodes = ACTION_CODES.UPDATE_COMMENT | ACTION_CODES.UPDATE_REPLY
