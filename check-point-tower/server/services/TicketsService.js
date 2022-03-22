import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { eventsService } from './EventsService'

class TicketsService {
  async createTicket(body) {
    const event = await eventsService.getEventById(body.eventId)
    if (event.capacity === 0) {
      throw new BadRequest('error')
    }
    const newTicket = await dbContext.Tickets.create(body)
    await newTicket.populate('account', 'name picture')
    event.capacity = event.capacity - 1
    await event.save()
    return newTicket
  }

  async getMyTickets(query) {
    const myTickets = await dbContext.Tickets.find(query).populate('account', 'name picture')
    return myTickets.map(mongooseDocument => {
      const eventTicket = mongooseDocument.toJSON()
      return {
        ticketId: eventTicket.id,
        capacity: eventTicket.capacity,
        accountId: query.accountId,
        ...eventTicket.event
      }
    })
  }

  async getEventTickets(query) {
    const eventTickets = await dbContext.Tickets.find(query).populate('account', 'name picture')
    return eventTickets.map(mongooseDocument => {
      const accountTicket = mongooseDocument.toJSON()
      return {
        ticketId: accountTicket.id,
        eventId: query.eventId,
        ...accountTicket.account
      }
    })
  }

  async removeTicket(ticketId, id) {
    const foundTicket = await dbContext.Tickets.findById(ticketId)
    const eventById = await eventsService.getEventById(id)
    // const event = await dbContext.Events.findById(eventId)
    eventById.capacity = eventById.capacity++
    await dbContext.Tickets.findByIdAndDelete(foundTicket)
    await foundTicket.save()
    return 'delorted'
  }
}
export const ticketsService = new TicketsService()
