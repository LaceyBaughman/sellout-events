import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    body: { type: String, required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
