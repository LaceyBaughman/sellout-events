import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Events = mongoose.model('Event', EventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);

  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
