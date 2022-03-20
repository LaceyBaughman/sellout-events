import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
  async getAll() {
    const res = await api.get(`api/events/${id}/comments`)
    console.log(res.data);
    ProxyState.comments = res.data.map(c => new Comment(c))
    console.log(ProxyState.comments);
    ProxyState.events = ProxyState.events
  }
  async addComment(rawComment) {
    const res = await api.post(`api/events/${id}/comments`, rawComment)
    console.log(res.data);
    let createdComment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, createdComment]
    ProxyState.events = ProxyState.events
  }
}


export const commentsService = new CommentsService()