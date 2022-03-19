
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllEvents)
      .get('/:id', this.getEventsById)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.softCancel)
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

  async getEventsById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const eventsById = await eventsService.getEventsById(req.params.id)
      res.send(eventsById)
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
}
