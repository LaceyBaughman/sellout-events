import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class EventsService {
  async createEvent(body) {
    const newEvent = await dbContext.Events.create(body)
    await newEvent.populate('creator', 'name')
    return newEvent
  }

  async getAllEvents(query = {}) {
    const allEvents = await dbContext.Events.find(query).populate('creator', 'name')
    return allEvents
  }

  async getEventById(id) {
    const eventById = await dbContext.Events.findById(id)
    if (!eventById) {
      throw new BadRequest('Invalid Id')
    }
    return eventById
  }

  async editEvent(update) {
    // const originalEvent = await dbContext.Events.findById(body.id)
    const originalEvent = await this.getEventById(update.id)
    if (originalEvent.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('Only the event creator can edit this event')
    }
    originalEvent.name = update.name ? update.name : originalEvent.name
    originalEvent.description = update.description ? update.description : originalEvent.description
    originalEvent.location = update.location ? update.location : originalEvent.location
    originalEvent.capacity = update.capacity ? update.capacity : originalEvent.capacity
    originalEvent.startDate = update.startDate ? update.startDate : originalEvent.startDate
    originalEvent.type = update.type ? update.type : originalEvent.type
    await originalEvent.save({ runValidators: true })
    await originalEvent.populate('creator', 'name')
    return originalEvent
  }

  async softCancel(id) {
    // const event = await dbContext.Events.findById(id)
    const event = await eventsService.getEventById(id)
    if (event.isCanceled === !event.isCanceled) {
      throw new BadRequest('Sorry! This event is already canceled!')
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    await event.populate('creator', 'name')
    return event
  }
}
export const eventsService = new EventsService()
