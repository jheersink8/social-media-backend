const { Schema, Types } = require('mongoose');

// Schema to create a Reaction
const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        toJSON: { getters: true },
        id: false
    }
);

reactionSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});

module.exports = reactionSchema; 