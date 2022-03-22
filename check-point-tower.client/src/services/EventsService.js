import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
  }

  async getEventById(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeEvent = res.data
  }

  async filterEvents(type) {
    const res = await api.get(type)
    logger.log('[EventServ: Filter]', res.data)
    AppState.events = res.data.events
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    AppState.events.push(res.data)
    return res.data
  }

  async getEventComments() {
    const res = await api.get(`api/events/${id}/comments`)

    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log(res.data)
    ProxyState.comments = ProxyState.comments
  }

  async addComment(commentData) {
    const res = await api.post(`api/events/${id}/comments`, commentData)
    console.log(res.data);
    let createdComment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, createdComment]
    ProxyState.events = ProxyState.events
  }
  async getEventTickets(id) {
    const events = AppState.events
    const res = await api.post(`api/events/${id}/tickets`)
    const index = events.findIndex(e => e.id == res.data.id)
    posts.splice(index, 1, res.data)
    logger.log('[EventsServe: Capacity]', res.data)
  }

}




export const eventsService = new EventsService()