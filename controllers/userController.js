const { User, Thought } = require('../models');

module.exports = {
    // Get all users from collection
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate([
                    { path: 'thoughts', select: '-__v -reactions -username', options: { lean: true } },

                    { path: 'friends', select: '-__v -_id -email -thoughts -friends', options: { lean: true } }
                ])
            res.json(users);
        } catch (err) {
            console.error({ message: err })
            res.status(500).json(err);
        }
    },
    // Get a single user based on ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate([
                    { path: 'thoughts', select: '-__v -reactions -username', options: { lean: true } },

                    { path: 'friends', select: '-__v -_id -email -thoughts -friends', options: { lean: true } }
                ]);
            if (!user) {
                return res.status(404).json({ message: 'no user with that id' })
            }

            res.json({ user })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user with that id' })
            }
            res.json({ message: 'User successfully updated.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            if (!user) {
                res.status(404).json({ message: 'no user with that ID exists' })
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } })
            res.json({ message: 'user successfully deleted.' })
        } catch (err) {
            res.json({ message: 'User successfully deleted.' });
        }
    },
    //Add a friend to a user
    async addFriend(req, res) {
        try {

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: false }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' })
            }
            res.json({ message: 'Friend successfully added.' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Remove a friend from a user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: false }
            )
            if (!user) {
                return res.status(404).json({ message: 'No friend with that ID' })
            }
            res.json({ message: 'Friend successfully removed.' })
        } catch (err) {
            res.status(500).json(err);
        };
    }
}