import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'
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

  async removeTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (ticketToDelete.creatorId.toString() !== userId) {
      throw new Forbidden('You are not the creator.')
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId)
  }
}
export const ticketsService = new TicketsService()
