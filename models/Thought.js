const { Schema, model } = require('mongoose');
// Import the Reaction schema to include in Thought model
const reactionSchema = require('./Reaction');

// Schema to create a Thought
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, min_length: 1, max_length: 250 },
        // Use getter method here to format timestamp on query 
        createdAt: { type: Date, default: Date.now },
        username: { type: String, 
            required: true
         },
        // Sub-document array value for a thought's reactions 
        reactions: [reactionSchema]
    },
    {
        toJSON: { virtuals: true },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought; 