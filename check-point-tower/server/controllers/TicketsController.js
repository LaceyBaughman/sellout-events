import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService'
export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
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
}
