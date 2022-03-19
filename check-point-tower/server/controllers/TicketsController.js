import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService'

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
      const userId = req.userInfo.id
      const ticketId = req.params.id
      await ticketsService.removeTicket(ticketId, userId)
      return res.send('Ticket removed.')
    } catch (error) {
      next(error)
    }
  }
}
