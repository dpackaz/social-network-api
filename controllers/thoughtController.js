const { User, Thought, Reaction } = require("../models");

module.exports = {
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          {
            $push: {
              thoughts: thought._id,
            },
          }
        );
      })
      .then(() => res.json({ message: "thought posted" }))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // update an existing thought
  updateThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }.then((thought) => {
        thought
          ? res.json(thought)
          : res.status(404).json({ message: "thought not found" });
      })
    );
  },
  // delete an existing thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId }.then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "thought not found" });
          return;
        } else {
          User.updateOne(
            { username: thought.username },
            { $pullAll: { thoughts: [{ _id: req.params.thoughtId }] } },
            { runValidators: true, new: true }
          ).then((user) => {
            user
              ? res.json({ message: "thought deleted" })
              : res.status(404).json({ message: "user not found" });
          });
        }
      })
    );
  },
  // get one thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "thought not found" })
          : res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // add reaction to a thought
  createReaction(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "thought not found" });
      } else {
        thought.reactions.push({
          reactionBody: req.body.reactionBody,
          username: req.params.thoughtId,
        }),
          thought.save();
        res.json(thought);
      }
    });
  },
  // delete reaction from a thought
  deleteReaction(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).then((thought) => {
      if (!thought) {
        rest.status(404).json({ message: "thought not found" });
        return;
      } else {
        thought.reactions.id(req.params.reactionId).remove();
        thought.save();
        res.json(thought);
      }
    });
  },
};
