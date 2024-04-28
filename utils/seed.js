const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

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

    console.log(thoughtData);

    // Create new array with username and thought IDs to update database
    const translationArray = [];
    for (const thoughtDat of thoughtData) {
        const user = await User.findOne({ username: thoughtDat.username });
        const thought = await Thought.findOne({ thoughtText: thoughtDat.thoughtText })
        if (user && thought) {
            translationArray.push({
                userId: user._id,
                thoughtId: thought._id
            })
        }
    }
    // Update User collection with values from translation table 
    for (const translation of translationArray) {
        await User.findByIdAndUpdate(
            translation.userId,
            { $push: { thoughts: translation.thoughtId } }
        );
    };

    console.timeEnd('seeding');
    process.exit(0);

});

