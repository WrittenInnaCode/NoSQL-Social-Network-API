const { Thought, User } = require('../models');

module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((userThoughts) => res.json(userThoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((userThoughts) =>
                !userThoughts
                    ? res.status(404).json({ message: '🤔 No thoughts with that ID' })
                    : res.json(userThoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((userThoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: userThoughts._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: '🤔 Thought created, but found no user with that ID' })
                    : res.json(userThoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((userThoughts) =>
                !userThoughts
                    ? res.status(404).json({ message: '🤔 No thoughts with that ID' })
                    : res.json(userThoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((userThoughts) =>
                !userThoughts
                    ? res.status(404).json({ message: '🤔 No thoughts with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted but no user with this id!' })
                    : res.json({ message: '💬 Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((userThoughts) =>
                !userThoughts
                    ? res.status(404).json({ message: '🤔 No thoughts with that ID' })
                    : res.json(userThoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Remove reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((userThoughts) =>
                !userThoughts
                    ? res.status(404).json({ message: '🤔 No thoughts with that ID' })
                    : res.json(userThoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};