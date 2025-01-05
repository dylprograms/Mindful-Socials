import { Schema, model } from 'mongoose';
import reactionSchema from './reactions.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
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
}, {
    toJSON: {
        getters: true
    },
    timestamps: true,
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thoughts = model('Thought', thoughtSchema);
export default Thoughts;
