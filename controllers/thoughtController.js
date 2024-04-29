const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'no thought with that id' })
            }

            res.json({ thought })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    // Add a thought to a user
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);

            const thoughtId = newThought._id;

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtId } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'no user with that id' })
            }

            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
        // Update a thought
        async updateThought(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: req.body },
                    { runValidators: true, new: true }
                );
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that id' })
                }
                res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
        }
};