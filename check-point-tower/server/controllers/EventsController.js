import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import { eventsService } from '../services/EventsService'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.softCancel)
      .get('/:id/tickets', this.getEventTickets)
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createEvent = await eventsService.createEvent(req.body)
      res.send(createEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const allEvents = await eventsService.getAllEvents(req.query)
      res.send(allEvents)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventById = await eventsService.getEventById(req.params.id)
      res.send(eventById)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const newEvent = await eventsService.editEvent(req.body)
      return res.send(newEvent)
    } catch (error) {
      logger.log(res.data)
      next(error)
    }
    throw new Error('Unable to Edit Event')
  }

  async softCancel(req, res, next) {
    try {
      const cancel = await eventsService.softCancel(req.params.id)
      return res.send(cancel)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const bids = await ticketsService.getEventTickets({ eventId: req.params.id })
      return res.send(bids)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments({ eventId: req.params.id })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
