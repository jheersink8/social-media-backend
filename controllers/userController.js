const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({ path: 'thoughts', select: '-__v' })
            res.json(users);
        } catch (err) {
            console.error({ message: err })
            res.status(500).json(err);
        }
    }
}