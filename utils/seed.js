const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, getRandomValue, thoughts } = require('./data');



connection.on('error', (err) => {
    process.exit(1);
});

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany();
    await Thought.deleteMany();
    await User.insertMany(userData);


    const thoughtUsers = [];
    for (i = 0; i < thoughts.length; i++) {
        const randomUsername = getRandomValue(userData.map(obj => obj.username));
        const user = await User.findOne({ username: randomUsername })
        console.log(user._id)
        thoughtUsers.push({
            thoughtText: thoughts[i].thoughtText,
            username: user._id
        });
    }
    console.log(thoughtUsers[1].username)
    await Thought.insertMany(thoughtUsers);
});

