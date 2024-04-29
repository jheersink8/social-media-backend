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
    }
}