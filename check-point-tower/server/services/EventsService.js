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

  async getEventsById(id) {
    const eventById = await dbContext.Events.findById(id)
    if (!eventById) {
      throw new BadRequest('Invalid Id')
    }
    return eventById
  }

  async editEvent(body) {
    const originalEvent = await dbContext.Events.findById(body.id)
    if (originalEvent.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('Unable To edit Task.')
    }
    originalEvent.name = body.name || originalEvent.name
    originalEvent.description = body.description || originalEvent.description
    originalEvent.location = body.location || originalEvent.location
    originalEvent.capacity = body.capacity || originalEvent.capacity
    originalEvent.startDate = body.startDate || originalEvent.startDate
    originalEvent.type = body.type || originalEvent.type

    await originalEvent.save()
    await originalEvent.populate('creator', 'name')
    return originalEvent
  }

  async softCancel(id) {
    const originalEvent = await dbContext.Events.findById(id)
    originalEvent.isCanceled = !originalEvent.isCanceled
    await originalEvent.save()
    return originalEvent.isCanceled ? 'Canceled' : 'UnCanceled'
  }
}
export const eventsService = new EventsService()
