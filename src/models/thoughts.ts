import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './reactions.js';

interface IThought extends Document {
  thoughtText: string,
  username: string,
  createdAt: Schema.Types.Date,
  reactions: [typeof reactionSchema]
 }

const thoughtSchema = new Schema<IThought>(
 {
   thoughtText: {
     type: String,
     required: true,
     minlength: 1,
     maxlength: 240
   },
   createdAt: {
    type: Date,
    default: Date.now
   },
   username: {
     type: String,
     required: true
   },
   reactions: [reactionSchema]
 },
 {
   toJSON: {
     getters: true
   },
   timestamps: true,
   id: false
 }
);

thoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length;
});

const Thoughts = model('Thought', thoughtSchema);

export default Thoughts;