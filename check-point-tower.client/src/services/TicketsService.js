import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {

  async createTicket(ticketData) {
    const res = await api.post(`/api/tickets`, ticketData)
    logger.log('[new bid]', res.data)

    const newTicket = { ...res.data, name: res.data.account.name, picture: res.data.account.picture }
    AppState.bids.push(newTicket)
  }

  //Should this be attendee instead of account? 

  async removeTicket(ticketData) {
    const res = await api.put('/api/tickets/' + ticketData.id, ticketData)
    logger.log('[update ticket]', res.data)
  }
}

export const ticketsService = new TicketsService()