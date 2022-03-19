import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async getEventComments(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'event')
    return comments
  }

  async createComment(body) {
    const newComment = await dbContext.Comments.create(body)
    await newComment.populate('creator', 'name')
    return newComment
  }

  async removeComment(userId, commentId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (commentToDelete.creatorId.toString() !== userId) {
      throw new Forbidden("This isn't your comment")
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
    return 'deleted'
  }
}

export const commentsService = new CommentsService()
