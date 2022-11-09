const { User, Thought } = require('../models');

module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🙈 No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            {
                new: true,
                runValidators: true
            },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🙈 No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🙈 No user with this id!' })
                    // Bonus: Remove a user's associated thoughts when deleted.
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: '🚷 User and associated thoughts deleted!' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } }, // $addToSet:
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🙈 No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: req.params.friendId } }, 
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🙈 No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

