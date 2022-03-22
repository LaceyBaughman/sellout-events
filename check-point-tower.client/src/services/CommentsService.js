import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
  async getEventComments(id) {
    const res = await api.get(`api/events/${id}/comments`)
    logger.log(res.data);
    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log(ProxyState.comments);
    ProxyState.events = ProxyState.events
  }
  async addComment(rawComment) {
    const res = await api.post(`api/events/${id}/comments`, rawComment)
    logger.log(res.data);
    let createdComment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, createdComment]
    ProxyState.events = ProxyState.events
  }

  async removeComment(id) {
    const res = await api.delete(`api/commentss/${id}`)
    logger.log(res.data)
  }
}


export const commentsService = new CommentsService()