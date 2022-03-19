import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.removeComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.createComment(req.body)
      res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.id
      const message = await commentsService.removeComment(userId, commentId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
