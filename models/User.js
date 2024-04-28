const { Schema, model, Types } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
        // Sub document for thoughts
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        // Sub document for friends
        friends: [{ type: Types.ObjectId, ref: 'User' }]
    },
    {
        toJSON: { virtuals: true },
        id: false
    }
);

// Virtual to count how many friends
userSchema.virtual('countFriends').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;