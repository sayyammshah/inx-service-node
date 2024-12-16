import { InsightUpdateActionCodes } from '@models'
import { Filter, UpdateFilter, UpdateOptions } from 'mongodb'
import { ActionHandlerReturnValue, ActionHandlersParams } from 'src/types/types'
import { ACTION_CODES } from 'src/utils/constants'
import { generateXId } from 'src/utils/helper'

const updateCommentParams = ({ author, content, contentId }: ActionHandlersParams) => {
  const filter: Filter<unknown> = {
    insightId: contentId
  }

  const payload: UpdateFilter<Document> = {
    $push: {
      comments: {
        author,
        topLevelComment: content,
        commentId: generateXId(),
        replies: [],
        createdAt: Date.now()
      }
    }
  }

  const options: UpdateOptions = {
    upsert: true
  }

  return { filter, payload, options }
}

const updateReplyParams = ({ contentId, author, content }: ActionHandlersParams) => {
  const filter: Filter<unknown> = {
    comments: { $elemMatch: { commentId: { $eq: contentId } } }
  }

  const payload: UpdateFilter<Document> = {
    $push: {
      'comments.$[x].replies': {
        author,
        reply: content,
        replyId: generateXId(),
        createdAt: Date.now()
      }
    }
  }

  const options: UpdateOptions = {
    arrayFilters: [{ 'x.commentId': contentId }]
  }

  return { filter, payload, options }
}

/**
 * A record containing functions for handling various insight update actions.
 *
 * @property {InsightUpdateActionCodes.UPDATE_COMMENT} {@link ACTION_CODES.UPDATE_COMMENT} - Function to generate the parameters required for updating a comment in an insight collection.
 * @property {InsightUpdateActionCodes.UPDATE_REPLY} {@link ACTION_CODES.UPDATE_REPLY} - Function to generate the parameters required for updating a reply to a comment in an insight collection.
 */

export const actionHandlers: Record<
  InsightUpdateActionCodes,
  (params: ActionHandlersParams) => ActionHandlerReturnValue
> = {
  [ACTION_CODES.UPDATE_COMMENT]: updateCommentParams,
  [ACTION_CODES.UPDATE_REPLY]: updateReplyParams
}
