const { User } = require('../models');

module.exports = {
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
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate([
                { path: 'thoughts', select: '-__v' },
                { path: 'friends', select: '-__v -_id -email -thoughts' }
            ]);
            if (!user) {
                return res.status(404).json({message: 'no user with that id'})
            }

            res.json({ user })
         } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    }
}