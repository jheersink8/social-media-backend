const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({message: 'no thought with that id'})
            }

            res.json({ thought })
         } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    }
}