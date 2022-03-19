import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

TicketSchema.virtual('attendee', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
