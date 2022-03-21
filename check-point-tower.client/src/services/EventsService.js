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
    AppState.type = res.data.events.type
  }
}



export const eventsService = new EventsService()