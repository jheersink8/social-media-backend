const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData, random5, generateReaction } = require('./data');

console.time('seeding');

connection.on('error', (err) => {
    process.exit(1);
});

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany();
    await Thought.deleteMany();
    await User.insertMany(userData);
    await Thought.insertMany(thoughtData);

    // Create new array with username and thought IDs to update database
    const translationArray = [];
    for (const thoughtDat of thoughtData) {
        const user = await User.findOne({ username: thoughtDat.username });
        const thought = await Thought.findOne({ thoughtText: thoughtDat.thoughtText })
        if (user && thought) {
            translationArray.push({
                userId: user._id,
                _id: thought._id
            })
        }
    }
    // Update User collection with values from translation table
    for (const translation of translationArray) {
        await User.findByIdAndUpdate(
            translation.userId,
            { $push: { thoughts: translation._id } }
        );
    };

    // Get random friends for each user. Total count should be between 0 and 5
    seedUserIds = await User.find({}, '_id')
    await Promise.all(seedUserIds.map(async (user) => {
        const numberofFriends = random5();
        const friendIds = [];

        while (friendIds.length < numberofFriends) {
            const randomUser = seedUserIds[Math.floor(Math.random() * seedUserIds.length)];
            if (randomUser._id.toString() !== user._id.toString() && !friendIds.includes(randomUser._id)) {
                friendIds.push(randomUser._id);
            }
        }

        // Update user with friends
        await User.findByIdAndUpdate(user._id, { $set: { friends: friendIds } });
    }));

    // Assign random reactions to each thought. Total count should be between 0 and 5
    const thoughtIds = await Thought.find({}, '_id');

    for (const thoughtId of thoughtIds) {
        // Generate reactions for the current thought
        const reactions = generateReaction();
        // Update the current thought with the generated reactions
        await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: { $each: reactions } } });
    }
    console.timeEnd('seeding');
    process.exit(0);

});

