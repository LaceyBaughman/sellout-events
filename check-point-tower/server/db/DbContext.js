import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment'
import { EventSchema } from '../models/Event'
import { TicketSchema } from '../models/Ticket'
class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Events = mongoose.model('Event', EventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
