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
  // get one user
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => {
        !user
          ? res.status(404).json({ message: "user not found" })
          : res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // add Friend to a user
  addFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .select("-__v")
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ message: "friend not found" });
        } else {
          User.findOneAndUpdate({ _id: req.params.userId }),
            { $push: { friends: friend } },
            { new: true }.then((user) => {
              user
                ? res.json(user)
                : res.status(404).json({ message: "user not found" });
            });
        }
      });
  },
  // delete Friend from user
  deleteFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .select("-__v")
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ message: "friend not found" });
        } else {
          User.updateOne(
            { _id: req.params.userId },
            { $pullAll: { friends: [{ _id: req.params.friendId }] } },
            { new: true }
          ).then((user) => {
            user
              ? res.json(user)
              : res.status(404).json({ message: "user not found" });
          });
        }
      });
  },
};
