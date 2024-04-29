const { User, Thought } = require('../models');

module.exports = {
    // Get all users from collection
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate([
                    { path: 'thoughts', select: '-__v' },
                    { path: 'friends', select: '-__v -_id -email -thoughts' }
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
                    { path: 'thoughts', select: '-__v' },
                    { path: 'friends', select: '-__v -_id -email -thoughts' }
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
            res.json(user);
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
            console.error("Error occurred:", err);
            res.status(500).json(err);
        }
    }
}