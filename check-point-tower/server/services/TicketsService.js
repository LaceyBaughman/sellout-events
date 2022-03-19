import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class TicketsService {
  async createTicket(body) {
    const newTicket = await dbContext.Tickets.create(body)
    await newTicket.populate('creator', 'name')
    return newTicket
  }

  async getMyTickets(query) {
    const myTickets = await dbContext.Tickets.find(query).populate('event')
    return myTickets.map(mongooseDocument => {
      const attendeeTicket = mongooseDocument.toJSON()
      return {
        ticketId: attendeeTicket.id,
        ...attendeeTicket.attendee
      }
    })
  }

  async getEventTickets(query) {
    const eventTickets = await dbContext.Tickets.find(query).populate('attendee', 'event')
    return eventTickets.map(mongooseDocument => {
      const attendeeTicket = mongooseDocument.toJSON()
      return {
        ticketId: attendeeTicket.id,
        ...attendeeTicket.attendee
      }
    })
  }
}
export const ticketsService = new TicketsService()
