import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService'
import { eventsService } from '../services/EventsService'

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.removeTicket)
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const createTicket = await ticketsService.createTicket(req.body)
      return res.send(createTicket)
    } catch (error) {
      next(error)
    }
  }

  async removeTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const removedTicket = await ticketsService.removeTicket(req.body)
      const eventById = await eventsService.getEventById(req.params.id)
      return res.send(removedTicket, eventById)
    } catch (error) {
      next(error)
    }
  }
}
